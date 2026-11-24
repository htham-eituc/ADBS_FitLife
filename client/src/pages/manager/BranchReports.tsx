import RevenueChart from "@/components/shared/RevenueChart";
import { useState } from "react";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import {
  BarList,
  SectionCard,
  SelectField,
  StatCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeBranch, products, stockStatus } from "@/data/branch";
import {
  checkins,
  expiringPlans,
  inactiveMembers,
  members,
  ptBookings,
} from "@/data/front-desk";
import { formatDate, isoDate, member, visits } from "@/data/member";
import {
  revenuePeriodSamples,
  checkinSlots,
  compactMoney,
  percent,
  topPackages,
  topProducts,
  trainerPerformance,
} from "@/data/reports";

const PERIODS = ["7 ngày gần nhất", "Tháng này", "Quý này", "Năm nay"];
const MEMBER_OPTIONS = members.map((row) => `${row.id} – ${row.name}`);

export default function BranchReports() {
  const [period, setPeriod] = useState(PERIODS[0]);
  const [memberOption, setMemberOption] = useState(MEMBER_OPTIONS[0]);
  const picked = members[MEMBER_OPTIONS.indexOf(memberOption)] ?? members[0];
  const memberVisits = [
    ...checkins
      .filter((row) => row.memberId === picked.id)
      .map((row) => ({
        key: row.id,
        date: isoDate(0),
        branch: homeBranch.name,
        in: row.in,
        out: row.out,
      })),
    ...(picked.id === member.id
      ? visits.map((row) => ({
          key: row.date,
          date: row.date,
          branch: row.branch,
          in: row.start,
          out: row.end,
        }))
      : []),
  ];
  const memberSessions = ptBookings.filter((row) => row.member === picked.name);
  const revenueRows = revenuePeriodSamples[period];
  const revenue = revenueRows.reduce((sum, row) => sum + row.value, 0);
  const checkinTotal = checkinSlots.reduce((sum, row) => sum + row.checkins, 0);
  const peak = checkinSlots.reduce((best, row) =>
    row.checkins > best.checkins ? row : best,
  );

  return (
    <div className="space-y-6">
      <PageHeading
        title="Báo cáo chi nhánh"
        description={`Số liệu của ${homeBranch.name}, tính đến thời điểm xem.`}
        action={
          <>
            <SelectField
              className="w-48"
              label="Kỳ báo cáo"
              value={period}
              options={PERIODS}
              onChange={setPeriod}
            />
            <Button variant="outline" disabled className="self-end">
              Xuất báo cáo
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          tone="success"
          highlighted
          label="Doanh thu"
          value={compactMoney(revenue)}
          hint="Chỉ hóa đơn đã thanh toán"
        />
        <StatCard
          tone="info"
          highlighted
          label="Lượt check-in"
          value={checkinTotal.toLocaleString("vi-VN")}
        />
        <StatCard
          tone="primary"
          label="Khung giờ đông nhất"
          value={peak.slot}
          hint={`${peak.checkins} lượt vào`}
        />
        <StatCard
          tone="warning"
          label="Cần chăm sóc"
          value={expiringPlans.length + inactiveMembers.length}
          hint="Sắp hết hạn hoặc lâu chưa quay lại"
        />
      </div>

      <Tabs defaultValue="revenue">
        <TabsList className="max-w-full overflow-x-auto">
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="checkins">Ra vào</TabsTrigger>
          <TabsTrigger value="sales">Bán chạy</TabsTrigger>
          <TabsTrigger value="stock">Tồn kho</TabsTrigger>
          <TabsTrigger value="trainers">HLV</TabsTrigger>
          <TabsTrigger value="members">Hội viên</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <RevenueChart
            title={`Doanh thu - ${period}`}
            description="Dữ liệu mẫu minh họa theo kỳ - Chỉ gồm hóa đơn đã thanh toán."
            categories={revenueRows.map((row) => row.label)}
            series={[
              { name: "Doanh thu", data: revenueRows.map((row) => row.value) },
            ]}
          />
        </TabsContent>

        <TabsContent value="checkins">
          <SectionCard
            title="Lượt check-in và tỷ lệ lấp đầy theo khung giờ"
            description={`Lượt check-in tính vào khung chứa giờ vào. Tỷ lệ lấp đầy = số hội viên đang trong chi nhánh ở đầu khung ÷ sức chứa ${homeBranch.capacity}.`}
          >
            <BarList
              items={checkinSlots.map((row) => ({
                label: row.slot,
                value: row.checkins,
                note: `lấp đầy ${percent(row.occupancy)}`,
              }))}
              format={(value) => `${value} lượt`}
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="sales">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionCard
              title="Gói dịch vụ bán chạy"
              description="Theo số hóa đơn đã thanh toán."
            >
              <BarList
                items={topPackages.map((row) => ({
                  label: row.label,
                  value: row.value,
                  note: compactMoney(row.revenue),
                }))}
                format={(value) => `${value} gói`}
              />
            </SectionCard>
            <SectionCard title="Sản phẩm bán chạy">
              <BarList items={topProducts} format={(value) => `${value} sp`} />
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="stock">
          <SectionCard title="Tồn kho hiện tại">
            <InfoTable headers={["Sản phẩm", "Loại", "Tồn kho", "Tình trạng"]}>
              {products
                .filter((item) => item.status === "Đang bán")
                .map((item) => (
                  <TableRow key={item.id}>
                    <InfoCell>{item.name}</InfoCell>
                    <InfoCell>{item.type}</InfoCell>
                    <InfoCell>{item.stock}</InfoCell>
                    <InfoCell>
                      <StatusBadge status={stockStatus(item.stock)} />
                    </InfoCell>
                  </TableRow>
                ))}
            </InfoTable>
          </SectionCard>
        </TabsContent>

        <TabsContent value="trainers">
          <SectionCard
            title="Hiệu suất HLV"
            description="Chỉ tính buổi PT đã hoàn thành và đánh giá hợp lệ."
          >
            <InfoTable
              headers={[
                "HLV",
                "Buổi hoàn thành",
                "Buổi bị hủy",
                "Điểm TB",
                "Số đánh giá",
              ]}
            >
              {trainerPerformance.map((row) => (
                <TableRow key={row.trainer}>
                  <InfoCell>{row.trainer}</InfoCell>
                  <InfoCell>{row.sessions}</InfoCell>
                  <InfoCell>{row.cancelled}</InfoCell>
                  <InfoCell>
                    {row.rating.toLocaleString("vi-VN", {
                      minimumFractionDigits: 1,
                    })}{" "}
                    ★
                  </InfoCell>
                  <InfoCell>{row.reviews}</InfoCell>
                </TableRow>
              ))}
            </InfoTable>
          </SectionCard>
        </TabsContent>

        <TabsContent value="members">
          <SectionCard
            title="Lịch sử tập và lịch PT của hội viên"
            description="Chỉ tra cứu hội viên trong phạm vi được phân quyền."
            action={
              <SelectField
                className="w-64"
                label="Hội viên"
                value={memberOption}
                options={MEMBER_OPTIONS}
                onChange={setMemberOption}
              />
            }
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Lượt ra vào
                </h3>
                {memberVisits.length ? (
                  <InfoTable
                    headers={["Ngày", "Chi nhánh", "Giờ vào", "Giờ ra"]}
                  >
                    {memberVisits.map((row) => (
                      <TableRow key={row.key}>
                        <InfoCell>{formatDate(row.date)}</InfoCell>
                        <InfoCell>{row.branch}</InfoCell>
                        <InfoCell>{row.in}</InfoCell>
                        <InfoCell>{row.out ?? "Đang trong CN"}</InfoCell>
                      </TableRow>
                    ))}
                  </InfoTable>
                ) : (
                  <CardDescription>Chưa có lượt ra vào.</CardDescription>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-700">Lịch PT</h3>
                {memberSessions.length ? (
                  <InfoTable headers={["Ngày", "Giờ", "HLV", "Trạng thái"]}>
                    {memberSessions.map((row) => (
                      <TableRow key={row.id}>
                        <InfoCell>{formatDate(row.date)}</InfoCell>
                        <InfoCell>{row.time}</InfoCell>
                        <InfoCell>{row.trainer}</InfoCell>
                        <InfoCell>
                          <StatusBadge status={row.status} />
                        </InfoCell>
                      </TableRow>
                    ))}
                  </InfoTable>
                ) : (
                  <CardDescription>Chưa có lịch PT.</CardDescription>
                )}
              </div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
      <CardDescription>
        Quản lý chi nhánh chỉ xem số liệu của chi nhánh mình. Số liệu trên là dữ
        liệu mẫu.
      </CardDescription>
    </div>
  );
}
