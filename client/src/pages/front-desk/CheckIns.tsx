import { useState } from "react";
import FormSelect from "@/components/shared/FormSelect";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import {
  SectionCard,
  StatCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DoorIcon } from "@/icons/door";
import { homeBranch } from "@/data/branch";
import { checkins, members } from "@/data/front-desk";

export default function CheckIns() {
  const [manualOpen, setManualOpen] = useState(false);
  const inside = checkins.filter((row) => !row.out);

  return (
    <div className="space-y-6">
      <PageHeading
        title="Ra vào"
        description={`Lượt check-in/check-out hôm nay tại ${homeBranch.name}.`}
        action={
          <Button onClick={() => setManualOpen(true)}>
            <DoorIcon className="size-5" />
            Mở cửa thủ công
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Đang trong chi nhánh"
          value={inside.length}
          hint={`Sức chứa ${homeBranch.capacity}`}
        />
        <StatCard label="Lượt vào hôm nay" value={checkins.length} />
        <StatCard
          label="Xử lý thủ công"
          value={checkins.filter((row) => row.manualBy).length}
        />
      </div>

      <SectionCard
        title="Lượt ra vào hôm nay"
        description="Lượt chưa có giờ ra là hội viên đang trong chi nhánh; mỗi hội viên chỉ có tối đa một lượt như vậy."
      >
        <InfoTable
          headers={[
            "Lượt",
            "Hội viên",
            "Cửa",
            "Giờ vào",
            "Giờ ra",
            "Trạng thái",
            "Thủ công",
          ]}
        >
          {checkins.map((row) => (
            <TableRow key={row.id}>
              <InfoCell>{row.id}</InfoCell>
              <InfoCell>
                {row.member}
                <CardDescription>{row.memberId}</CardDescription>
              </InfoCell>
              <InfoCell>{row.gate}</InfoCell>
              <InfoCell>{row.in}</InfoCell>
              <InfoCell>{row.out ?? "—"}</InfoCell>
              <InfoCell>
                <StatusBadge
                  status={row.out ? "Đã check-out" : "Đang trong CN"}
                />
              </InfoCell>
              <InfoCell>
                {row.manualBy ? (
                  <>
                    <Badge size="sm" color="warning">
                      {row.manualBy}
                    </Badge>
                    <CardDescription>{row.manualReason}</CardDescription>
                  </>
                ) : (
                  "—"
                )}
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <SketchDialog
        open={manualOpen}
        onOpenChange={setManualOpen}
        title="Mở cửa thủ công"
        description="Dùng khi cửa từ chối nhưng lễ tân xác minh hội viên hợp lệ."
        actionLabel="Ghi nhận và mở cửa"
      >
        <FormSelect
          label="Hội viên"
          options={members.map((item) => `${item.id} – ${item.name}`)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect label="Cửa" options={homeBranch.gates} />
          <FormSelect
            label="Thao tác"
            options={["Ghi lượt vào", "Ghi giờ ra"]}
          />
        </div>
        <Field>
          <FieldLabel htmlFor="manual-reason">Lý do</FieldLabel>
          <Textarea
            id="manual-reason"
            placeholder="Ví dụ: thẻ lỗi, đã xác minh bằng CCCD..."
          />
        </Field>
        <CardDescription>
          Lượt được ghi kèm người thực hiện và lý do.
        </CardDescription>
      </SketchDialog>
    </div>
  );
}
