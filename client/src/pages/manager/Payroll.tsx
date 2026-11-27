import PayrollAdjustments from "@/components/shared/PayrollAdjustments";
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
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { homeBranch } from "@/data/branch";
import { money } from "@/data/member";
import {
  CURRENT_PERIOD,
  PAYROLL_PERIODS,
  payrollIssues,
  payrollRows,
  type PayrollRow,
} from "@/data/staff";

const total = (row: PayrollRow) => row.base + row.commission;

export default function Payroll() {
  const [period, setPeriod] = useState(CURRENT_PERIOD);
  const open = period === CURRENT_PERIOD;
  const status = open
    ? payrollIssues.length
      ? "Có sai lệch"
      : "Chưa chốt"
    : "Đã chốt";
  const sum = (pick: (row: PayrollRow) => number) =>
    payrollRows.reduce((acc, row) => acc + pick(row), 0);

  return (
    <div className="space-y-6">
      <PageHeading
        title="Bảng lương"
        description={`Lương cơ bản và hoa hồng PT của nhân viên ${homeBranch.name}.`}
        action={
          <SelectField
            className="w-48"
            label="Kỳ lương"
            value={period}
            options={PAYROLL_PERIODS}
            onChange={setPeriod}
          />
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Lương cơ bản" value={money(sum((row) => row.base))} />
        <StatCard
          label="Hoa hồng PT"
          value={money(sum((row) => row.commission))}
          hint={`${sum((row) => row.sessions)} buổi hoàn thành`}
        />
        <StatCard
          label="Tổng"
          value={money(sum(total))}
          badge={<StatusBadge size="sm" status={status} />}
        />
      </div>

      {/* {open && payrollIssues.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardTitle className="mb-0 font-semibold">
            Sai lệch cần xử lý trước khi chốt ({payrollIssues.length})
          </CardTitle>
          {payrollIssues.map((issue) => (
            <CardDescription key={issue.id} className="text-gray-700">
              <Badge size="sm" color="warning" className="me-2">
                {issue.session}
              </Badge>
              {issue.trainer}, {formatDate(issue.date)}: {issue.detail}
            </CardDescription>
          ))}
        </Card>
      )} */}

      <SectionCard
        title={`Bảng lương ${period}`}
        description="Hoa hồng tính theo chi nhánh HLV công tác vào ngày dạy."
        action={
          <>
            <Button variant="outline" size="sm" disabled>
              Tính lương
            </Button>
            <Button size="sm" disabled>
              Chốt và gửi phiếu lương
            </Button>
          </>
        }
      >
        <InfoTable
          headers={[
            "Nhân viên",
            "Chức vụ",
            "Lương cơ bản",
            "Buổi PT",
            "Hoa hồng",
            "Tổng",
          ]}
        >
          {payrollRows.map((row) => (
            <TableRow key={row.id}>
              <InfoCell>
                {row.name}
                <CardDescription>{row.id}</CardDescription>
              </InfoCell>
              <InfoCell>{row.position}</InfoCell>
              <InfoCell>{money(row.base)}</InfoCell>
              <InfoCell>{row.position === "HLV" ? row.sessions : "—"}</InfoCell>
              <InfoCell>
                {row.position === "HLV" ? money(row.commission) : "—"}
              </InfoCell>
              <InfoCell>
                <span className="font-semibold">{money(total(row))}</span>
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
        <CardDescription>
          {open
            ? "Mỗi nhân viên có tối đa một bảng lương mỗi kỳ; bảng lương đã chốt không được sửa."
            : "Kỳ đã chốt."}
        </CardDescription>
      </SectionCard>
      <PayrollAdjustments />
    </div>
  );
}
