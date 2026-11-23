import { useState } from "react";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import {
  FormInput,
  SectionCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { TableRow } from "@/components/ui/table";
import { expiringPlans, inactiveMembers } from "@/data/front-desk";
import { formatDate, isoDate } from "@/data/member";

const daysFromToday = (value: string) =>
  Math.round(
    (new Date(value + "T12:00:00").getTime() -
      new Date(isoDate(0) + "T12:00:00").getTime()) /
      86400000,
  );

export default function MemberCare() {
  const [expiryDays, setExpiryDays] = useState(7);
  const [absentDays, setAbsentDays] = useState(30);
  const rows = [
    ...expiringPlans
      .filter((row) => daysFromToday(row.end) <= expiryDays)
      .map((row) => ({
        id: row.id,
        member: row.member,
        phone: row.phone,
        reason: "Sắp hết hạn",
        detail: `${row.plan} hết hạn ${formatDate(row.end)}`,
      })),
    ...inactiveMembers
      .filter((row) => -daysFromToday(row.lastVisit) >= absentDays)
      .map((row) => ({
        id: row.id,
        member: row.member,
        phone: row.phone,
        reason: "Lâu chưa quay lại",
        detail: `Check-in gần nhất ${formatDate(row.lastVisit)}`,
      })),
  ];

  return (
    <div className="space-y-6">
      <PageHeading
        title="Chăm sóc hội viên"
        description="Hội viên có gói sắp hết hạn hoặc lâu chưa quay lại."
      />
      <SectionCard
        title="Danh sách cần liên hệ"
        description="Chọn ngưỡng trước khi xem danh sách."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-2/3">
          <FormInput
            id="care-expiry"
            label="Gói hết hạn trong vòng (ngày)"
            type="number"
            min={1}
            value={expiryDays}
            onChange={(event) => setExpiryDays(Number(event.target.value))}
          />
          <FormInput
            id="care-absent"
            label="Không check-in từ (ngày)"
            type="number"
            min={1}
            value={absentDays}
            onChange={(event) => setAbsentDays(Number(event.target.value))}
          />
        </div>
        <InfoTable
          headers={["Mã", "Hội viên", "Số điện thoại", "Lý do", "Chi tiết"]}
        >
          {rows.map((row) => (
            <TableRow key={row.id + row.reason}>
              <InfoCell>{row.id}</InfoCell>
              <InfoCell>{row.member}</InfoCell>
              <InfoCell>{row.phone}</InfoCell>
              <InfoCell>
                <StatusBadge status={row.reason} />
              </InfoCell>
              <InfoCell>{row.detail}</InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>
    </div>
  );
}
