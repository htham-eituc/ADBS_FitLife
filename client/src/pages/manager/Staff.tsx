import InfoList from "@/components/shared/InfoList";
import TransferAppointments from "@/components/shared/TransferAppointments";
import { useState } from "react";
import FormSelect from "@/components/shared/FormSelect";
import InfoField from "@/components/shared/InfoField";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import {
  FormInput,
  SectionCard,
  StatCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BRANCH_NAMES, homeBranch } from "@/data/branch";
import { formatDate, isoDate, money } from "@/data/member";
import {
  POSITIONS,
  salaryHistory,
  staffMembers,
  transfers,
  workHistory,
  type StaffMember,
} from "@/data/staff";

export default function Staff() {
  const [selected, setSelected] = useState<StaffMember | null>(null);
  const [transferOpen, setTransferOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const staffOptions = staffMembers.map(
    (item) => `${item.id} – ${item.name} (${item.position})`,
  );
  const trainers = staffMembers.filter((item) => item.position === "HLV");
  const history = selected
    ? (workHistory[selected.id] ?? [
        {
          branch: selected.branch,
          position: selected.position,
          from: selected.since,
          to: null,
        },
      ])
    : [];
  const salaries = selected
    ? (salaryHistory[selected.id] ?? [
        { from: selected.since, salary: selected.salary },
      ])
    : [];

  return (
    <div className="space-y-6">
      <PageHeading
        title="Nhân sự"
        description={`Hồ sơ nhân viên, lịch sử công tác và điều chuyển tại ${homeBranch.name}.`}
        action={
          <>
            <Button variant="outline" onClick={() => setCreateOpen(true)}>
              Thêm nhân viên
            </Button>
            <Button variant="outline" onClick={() => setLeaveOpen(true)}>
              Nghỉ việc
            </Button>
            <Button onClick={() => setTransferOpen(true)}>Điều chuyển</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Nhân viên đang làm" value={staffMembers.length} />
        <StatCard label="Huấn luyện viên" value={trainers.length} />
        <StatCard label="Điều chuyển gần đây" value={transfers.length} />
        <StatCard
          label="Quỹ lương cơ bản"
          value={money(
            staffMembers.reduce((sum, item) => sum + item.salary, 0),
          )}
        />
      </div>

      <Tabs defaultValue="staff">
        <TabsList>
          <TabsTrigger value="staff">Nhân viên</TabsTrigger>
          <TabsTrigger value="transfers">Điều chuyển</TabsTrigger>
        </TabsList>
        <TabsContent value="staff">
          <SectionCard
            title="Danh sách nhân viên"
            description="Mỗi chi nhánh có đúng một quản lý tại một thời điểm."
          >
            <InfoTable
              headers={[
                "Mã",
                "Họ tên",
                "Chức vụ",
                "Số điện thoại",
                "Lương cơ bản",
                "Trạng thái",
                "",
              ]}
            >
              {staffMembers.map((item) => (
                <TableRow key={item.id}>
                  <InfoCell>{item.id}</InfoCell>
                  <InfoCell>{item.name}</InfoCell>
                  <InfoCell>
                    <Badge
                      size="sm"
                      color={item.position === "HLV" ? "primary" : "gray"}
                    >
                      {item.position}
                    </Badge>
                  </InfoCell>
                  <InfoCell>{item.phone}</InfoCell>
                  <InfoCell>{money(item.salary)}</InfoCell>
                  <InfoCell>
                    <StatusBadge status={item.status} />
                  </InfoCell>
                  <InfoCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelected(item)}
                    >
                      Xem
                    </Button>
                  </InfoCell>
                </TableRow>
              ))}
            </InfoTable>
          </SectionCard>
        </TabsContent>
        <TabsContent value="transfers">
          <SectionCard
            title="Lịch sử điều chuyển"
            description="Mỗi lần điều chuyển đóng giai đoạn công tác cũ và mở giai đoạn mới tại chi nhánh đích."
          >
            <InfoTable
              headers={[
                "Nhân viên",
                "Từ chi nhánh",
                "Đến chi nhánh",
                "Chức vụ",
                "Ngày hiệu lực",
              ]}
            >
              {transfers.map((item) => (
                <TableRow key={item.id}>
                  <InfoCell>{item.staff}</InfoCell>
                  <InfoCell>{item.from}</InfoCell>
                  <InfoCell>{item.to}</InfoCell>
                  <InfoCell>{item.position}</InfoCell>
                  <InfoCell>{formatDate(item.effective)}</InfoCell>
                </TableRow>
              ))}
            </InfoTable>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <SketchDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title={selected ? `${selected.name} - ${selected.id}` : "Nhân viên"}
        actionLabel="Lưu thay đổi"
      >
        {selected && (
          <>
            <InfoList>
              <InfoField label="Chức vụ" value={selected.position} />
              <InfoField label="Chi nhánh hiện tại" value={selected.branch} />
              <InfoField label="Lương cơ bản" value={money(selected.salary)} />
            </InfoList>
            <Tabs defaultValue="work">
              <TabsList>
                <TabsTrigger value="work">Giai đoạn công tác</TabsTrigger>
                <TabsTrigger value="salary">Lịch sử lương</TabsTrigger>
              </TabsList>
              <TabsContent value="work">
                <InfoTable
                  headers={["Chi nhánh", "Chức vụ", "Từ ngày", "Đến ngày"]}
                >
                  {history.map((row) => (
                    <TableRow key={row.from}>
                      <InfoCell>{row.branch}</InfoCell>
                      <InfoCell>{row.position}</InfoCell>
                      <InfoCell>{formatDate(row.from)}</InfoCell>
                      <InfoCell>
                        {row.to ? formatDate(row.to) : "Hiện tại"}
                      </InfoCell>
                    </TableRow>
                  ))}
                </InfoTable>
              </TabsContent>
              <TabsContent value="salary">
                <InfoTable headers={["Hiệu lực từ", "Lương cơ bản"]}>
                  {salaries.map((row) => (
                    <TableRow key={row.from}>
                      <InfoCell>{formatDate(row.from)}</InfoCell>
                      <InfoCell>{money(row.salary)}</InfoCell>
                    </TableRow>
                  ))}
                </InfoTable>
              </TabsContent>
            </Tabs>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                id="staff-phone"
                label="Số điện thoại"
                defaultValue={selected.phone}
              />
              <FormInput
                id="staff-salary"
                label="Mức lương mới"
                type="number"
                min={1}
                step={100000}
                description="Mức lương mới có ngày hiệu lực riêng."
              />
            </div>
          </>
        )}
      </SketchDialog>

      <TransferAppointments />
      <SketchDialog
        open={transferOpen}
        onOpenChange={setTransferOpen}
        title="Điều chuyển công tác"
        actionLabel="Áp dụng điều chuyển"
      >
        <FormSelect label="Nhân viên" options={staffOptions} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect
            label="Chi nhánh đích"
            options={BRANCH_NAMES.filter((name) => name !== homeBranch.name)}
          />
          <FormSelect label="Chức vụ" options={POSITIONS} />
          <FormInput
            id="transfer-date"
            label="Ngày hiệu lực"
            type="date"
            min={isoDate(1)}
          />
        </div>
        <CardDescription>
          Ngày hiệu lực không được thuộc kỳ lương đã chốt. Với HLV, cần xử lý
          các lịch bị ảnh hưởng.
        </CardDescription>
      </SketchDialog>

      <SketchDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Thêm nhân viên"
        actionLabel="Tạo hồ sơ"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput id="new-staff-name" label="Họ tên" />
          <FormInput id="new-staff-phone" label="Số điện thoại" type="tel" />
          <FormSelect label="Chức vụ" options={POSITIONS} />
          <FormInput
            id="new-staff-salary"
            label="Lương cơ bản"
            type="number"
            min={1}
            step={100000}
          />
          <FormInput id="new-staff-start" label="Ngày bắt đầu" type="date" />
        </div>
      </SketchDialog>

      <SketchDialog
        open={leaveOpen}
        onOpenChange={setLeaveOpen}
        title="Ghi nhận nghỉ việc"
        actionLabel="Ghi nhận"
      >
        <FormSelect label="Nhân viên" options={staffOptions} />
        <FormInput id="leave-date" label="Ngày nghỉ việc" type="date" />
      </SketchDialog>
    </div>
  );
}
