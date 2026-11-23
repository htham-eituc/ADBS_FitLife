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
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { money } from "@/data/member";
import {
  branchRevenue,
  compactMoney,
  percent,
  staffSummary,
  tierDistribution,
  topPackagesSixMonths,
} from "@/data/reports";
import { PAYROLL_PERIODS } from "@/data/staff";

export default function SystemReports() {
  const [period, setPeriod] = useState(PAYROLL_PERIODS[0]);
  const totalMembers = tierDistribution.reduce(
    (sum, row) => sum + row.value,
    0,
  );
  const revenue = branchRevenue.reduce((sum, row) => sum + row.current, 0);
  const checkins = branchRevenue.reduce((sum, row) => sum + row.checkins, 0);

  return (
    <div className="space-y-6">
      <PageHeading
        title="Báo cáo toàn hệ thống"
        description={`Số liệu ${branchRevenue.length} chi nhánh, tính đến thời điểm xem.`}
        action={
          <>
            <SelectField
              className="w-48"
              label="Kỳ báo cáo"
              value={period}
              options={PAYROLL_PERIODS}
              onChange={setPeriod}
            />
            <Button variant="outline" disabled className="self-end">
              Xuất báo cáo
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Doanh thu"
          value={compactMoney(revenue)}
          hint="Chỉ hóa đơn đã thanh toán"
        />
        <StatCard
          label="Hội viên"
          value={totalMembers.toLocaleString("vi-VN")}
        />
        <StatCard
          label="Lượt check-in"
          value={checkins.toLocaleString("vi-VN")}
        />
      </div>
      <Tabs defaultValue="branches">
        <TabsList>
          <TabsTrigger value="branches">So sánh chi nhánh</TabsTrigger>
          <TabsTrigger value="packages">Gói doanh thu cao</TabsTrigger>
          <TabsTrigger value="tiers">Phân bổ hạng</TabsTrigger>
          <TabsTrigger value="staff">Nhân sự & lương</TabsTrigger>
        </TabsList>

        <TabsContent value="branches">
          <SectionCard
            title={`Doanh thu và hoạt động – ${period}`}
            description="Doanh thu chỉ tính hóa đơn đã thanh toán."
          >
            <InfoTable
              headers={[
                "Chi nhánh",
                "Doanh thu",
                "Kỳ trước",
                "Thay đổi",
                "Hội viên",
                "Lượt check-in",
              ]}
            >
              {branchRevenue.map((row) => {
                const change =
                  ((row.current - row.previous) / row.previous) * 100;
                return (
                  <TableRow key={row.id}>
                    <InfoCell>{row.branch}</InfoCell>
                    <InfoCell>{compactMoney(row.current)}</InfoCell>
                    <InfoCell>{compactMoney(row.previous)}</InfoCell>
                    <InfoCell>
                      <Badge
                        size="sm"
                        color={change >= 0 ? "success" : "error"}
                      >
                        {change >= 0 ? "+" : ""}
                        {change.toFixed(1)}%
                      </Badge>
                    </InfoCell>
                    <InfoCell>{row.members.toLocaleString("vi-VN")}</InfoCell>
                    <InfoCell>{row.checkins.toLocaleString("vi-VN")}</InfoCell>
                  </TableRow>
                );
              })}
            </InfoTable>
          </SectionCard>
        </TabsContent>

        <TabsContent value="packages">
          <SectionCard
            title="Gói có doanh thu cao nhất 6 tháng gần nhất"
            description="Khoảng 6 tháng tính lùi từ ngày chốt báo cáo."
          >
            <BarList items={topPackagesSixMonths} format={compactMoney} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="tiers">
          <SectionCard
            title="Phân bổ hạng hội viên"
            description="Theo hạng tại ngày báo cáo."
          >
            <BarList
              items={tierDistribution.map((row) => ({
                ...row,
                note: percent((row.value / totalMembers) * 100),
              }))}
              format={(value) => `${value.toLocaleString("vi-VN")} hội viên`}
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="staff">
          <SectionCard
            title="Nhân sự, lương và hoa hồng"
            description="Lương và hoa hồng chỉ hiển thị cho vai trò được cấp quyền."
          >
            <InfoTable
              headers={[
                "Chi nhánh",
                "Nhân viên",
                "HLV",
                "Quỹ lương",
                "Hoa hồng PT",
                "Điều chuyển",
              ]}
            >
              {staffSummary.map((row) => (
                <TableRow key={row.branch}>
                  <InfoCell>{row.branch}</InfoCell>
                  <InfoCell>{row.staff}</InfoCell>
                  <InfoCell>{row.trainers}</InfoCell>
                  <InfoCell>{money(row.payroll)}</InfoCell>
                  <InfoCell>{money(row.commission)}</InfoCell>
                  <InfoCell>{row.transfers}</InfoCell>
                </TableRow>
              ))}
            </InfoTable>
          </SectionCard>
        </TabsContent>
      </Tabs>
      <CardDescription>
        Ban giám đốc xem được số liệu của mọi chi nhánh. Số liệu trên là dữ liệu
        mẫu.
      </CardDescription>
    </div>
  );
}
