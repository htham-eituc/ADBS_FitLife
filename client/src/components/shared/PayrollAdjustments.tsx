import { useState } from "react";
import { InfoCell, InfoTable } from "./MemberPage";
import { FormInput, SectionCard, SelectField, StatusBadge } from "./StaffPage";
import SketchDialog from "./SketchDialog";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { TableRow } from "@/components/ui/table";
import { PAYROLL_PERIODS, staffMembers } from "@/data/staff";
import { money } from "@/data/member";

const nextPeriod = (period: string) => {
  const match = period.match(/(\d+)\/(\d+)/);
  if (!match) return "";
  const date = new Date(Number(match[2]), Number(match[1]), 1);
  return `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;
};
type Adjustment = {
  id: string;
  staff: string;
  source: string;
  target: string;
  amount: number;
  reason: string;
};
export default function PayrollAdjustments() {
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState(staffMembers[1].name);
  const [source, setSource] = useState(PAYROLL_PERIODS[1]);
  const [kind, setKind] = useState("Bổ sung");
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [rows, setRows] = useState<Adjustment[]>([]);
  const [message, setMessage] = useState("");
  return (
    <SectionCard
      title="Điều chỉnh lương kỳ sau"
      description="Sai sót của kỳ đã chốt được ghi vào kỳ tiếp theo, giữ nguyên bảng lương gốc."
      action={
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAmount(0);
            setReason("");
            setOpen(true);
          }}
        >
          Thêm khoản điều chỉnh
        </Button>
      }
    >
      {message && <CardDescription role="status">{message}</CardDescription>}
      <InfoTable
        headers={[
          "Nhân viên",
          "Kỳ tham chiếu",
          "Kỳ nhận điều chỉnh",
          "Số tiền",
          "Lý do",
          "Trạng thái",
        ]}
      >
        {rows.map((row) => (
          <TableRow key={row.id}>
            <InfoCell>{row.staff}</InfoCell>
            <InfoCell>{row.source}</InfoCell>
            <InfoCell>{row.target}</InfoCell>
            <InfoCell>
              <StatusBadge status={row.amount > 0 ? "Bổ sung" : "Khấu trừ"} />{" "}
              {money(row.amount)}
            </InfoCell>
            <InfoCell>{row.reason}</InfoCell>
            <InfoCell>
              <StatusBadge status="Chờ áp dụng" />
            </InfoCell>
          </TableRow>
        ))}
        {!rows.length && (
          <TableRow>
            <InfoCell>Chưa có khoản điều chỉnh.</InfoCell>
            <InfoCell />
            <InfoCell />
            <InfoCell />
            <InfoCell />
            <InfoCell />
          </TableRow>
        )}
      </InfoTable>
      <SketchDialog
        open={open}
        onOpenChange={setOpen}
        title="Thêm khoản điều chỉnh lương"
        actionLabel="Ghi khoản điều chỉnh"
        actionDisabled={
          !Number.isFinite(amount) || amount <= 0 || !reason.trim()
        }
        onAction={() => {
          setRows((items) => [
            ...items,
            {
              id: `DC${items.length + 1}`,
              staff,
              source,
              target: nextPeriod(source),
              amount: kind === "Bổ sung" ? amount : -amount,
              reason: reason.trim(),
            },
          ]);
          setMessage(`Đã ghi khoản điều chỉnh vào ${nextPeriod(source)}.`);
          setOpen(false);
        }}
      >
        <SelectField
          label="Nhân viên"
          value={staff}
          options={staffMembers.map((row) => row.name)}
          onChange={setStaff}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            label="Kỳ đã chốt cần điều chỉnh"
            value={source}
            options={PAYROLL_PERIODS.slice(1)}
            onChange={setSource}
          />
          <SelectField
            label="Kỳ nhận điều chỉnh"
            value={nextPeriod(source)}
            options={[nextPeriod(source)]}
            onChange={() => {}}
          />
          <SelectField
            label="Loại điều chỉnh"
            value={kind}
            options={["Bổ sung", "Khấu trừ"]}
            onChange={setKind}
          />
          <FormInput
            id="adjustment-amount"
            label="Số tiền"
            type="number"
            min={1}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <Field>
          <FieldLabel htmlFor="adjustment-reason">Lý do điều chỉnh</FieldLabel>
          <Textarea
            id="adjustment-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ví dụ: bổ sung hoa hồng buổi PT bị ghi sai chi nhánh..."
          />
        </Field>
      </SketchDialog>
    </SectionCard>
  );
}
