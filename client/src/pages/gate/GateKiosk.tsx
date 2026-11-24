import FormSelect from "@/components/shared/FormSelect";
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
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { homeBranch } from "@/data/branch";
import { checkins } from "@/data/front-desk";

const OUTCOMES = [
  { result: "Mở cửa", text: "Ghi lượt check-in và giờ vào" },
  { result: "Mở cửa", text: "Check-out: cập nhật giờ ra của lượt đang mở" },
  { result: "Bị từ chối", text: "Không tìm thấy thẻ/QR" },
  { result: "Bị từ chối", text: "Ngoài giờ mở cửa của chi nhánh" },
  { result: "Bị từ chối", text: "Không có gói còn hiệu lực hoặc còn lượt" },
  { result: "Bị từ chối", text: "Đang có lượt vào chưa check-out" },
];

export default function GateKiosk() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Cửa kiểm soát"
        description={`${homeBranch.name} - mở cửa ${homeBranch.open}–${homeBranch.close}.`}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title="Quét thẻ hoặc QR"
          description="Cửa gửi mã thẻ, mã cửa và thời điểm quét về hệ thống."
        >
          <FormSelect label="Cửa" options={homeBranch.gates} />
          <FormInput
            id="gate-code"
            label="Mã thẻ/QR"
            placeholder="QR-HV0001"
            autoComplete="off"
          />
          <div className="flex flex-wrap gap-2">
            <Button disabled>Quét vào</Button>
            <Button variant="outline" disabled>
              Quét ra
            </Button>
          </div>
        </SectionCard>
        <SectionCard title="Kết quả trả về">
          <InfoTable headers={["Kết quả", "Trường hợp"]}>
            {OUTCOMES.map((row) => (
              <TableRow key={row.text}>
                <InfoCell>
                  <StatusBadge status={row.result} />
                </InfoCell>
                <InfoCell>{row.text}</InfoCell>
              </TableRow>
            ))}
          </InfoTable>
          <CardDescription>
            Lượt bị từ chối không được tính là check-in.
          </CardDescription>
        </SectionCard>
      </div>

      <SectionCard title="Lượt gần đây">
        <InfoTable headers={["Cửa", "Hội viên", "Giờ vào", "Giờ ra"]}>
          {checkins.map((row) => (
            <TableRow key={row.id}>
              <InfoCell>{row.gate}</InfoCell>
              <InfoCell>{row.member}</InfoCell>
              <InfoCell>{row.in}</InfoCell>
              <InfoCell>{row.out ?? "—"}</InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>
    </div>
  );
}
