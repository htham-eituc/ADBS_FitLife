import { useState } from "react";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import {
  SectionCard,
  SelectField,
  StatCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { money } from "@/data/member";
import { payslipTotal, trainerPayslips } from "@/data/staff";

export default function TrainerPayslip() {
  const [period, setPeriod] = useState(trainerPayslips[0].period);
  const slip =
    trainerPayslips.find((item) => item.period === period) ??
    trainerPayslips[0];
  const commission = slip.commissions.reduce(
    (sum, row) => sum + row.sessions * row.rate,
    0,
  );
  const sessions = slip.commissions.reduce((sum, row) => sum + row.sessions, 0);

  return (
    <div className="space-y-6">
      <PageHeading
        title="Lương & hoa hồng"
        description="Phiếu lương theo kỳ do quản lý chi nhánh chốt."
        action={
          <SelectField
            className="w-48"
            label="Kỳ lương"
            value={period}
            options={trainerPayslips.map((item) => item.period)}
            onChange={setPeriod}
          />
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Lương cơ bản" value={money(slip.baseSalary)} />
        <StatCard
          label="Hoa hồng PT"
          value={money(commission)}
          hint={`${sessions} buổi hoàn thành`}
        />
        <StatCard
          label="Tổng lương"
          value={money(payslipTotal(slip))}
          badge={<StatusBadge size="sm" status={slip.status} />}
        />
      </div>
      <SectionCard
        title="Hoa hồng theo chi nhánh"
        description="Mỗi buổi đã hoàn thành được tính một lần, theo chi nhánh bạn công tác vào ngày dạy và đơn giá của chi nhánh đó."
      >
        <InfoTable
          headers={[
            "Chi nhánh",
            "Giai đoạn",
            "Số buổi",
            "Đơn giá/buổi",
            "Thành tiền",
          ]}
        >
          {slip.commissions.map((row) => (
            <TableRow key={row.branch + row.range}>
              <InfoCell>{row.branch}</InfoCell>
              <InfoCell>{row.range}</InfoCell>
              <InfoCell>{row.sessions}</InfoCell>
              <InfoCell>{money(row.rate)}</InfoCell>
              <InfoCell>
                <span className="font-semibold">
                  {money(row.sessions * row.rate)}
                </span>
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
        <CardDescription>
          {slip.status === "Đã chốt"
            ? "Bảng lương đã chốt không sửa; sai sót được điều chỉnh vào kỳ sau."
            : "Kỳ này chưa chốt, số liệu có thể thay đổi khi quản lý đối soát."}
        </CardDescription>
      </SectionCard>
    </div>
  );
}
