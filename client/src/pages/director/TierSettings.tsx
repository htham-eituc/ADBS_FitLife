import { useState } from "react";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import { FormInput, SectionCard } from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { PencilIcon } from "@/icons/pencil";
import { TIERS, tierColor } from "@/data/tiers";
import { money } from "@/data/member";
import { tierDistribution } from "@/data/reports";

export default function TierSettings() {
  const [editing, setEditing] = useState(false);
  const year = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <PageHeading
        title="Hạng hội viên"
        description="Ngưỡng chi tiêu và ưu đãi của từng hạng, áp dụng cho toàn hệ thống."
        action={
          <Button variant="outline" onClick={() => setEditing(true)}>
            <PencilIcon className="size-4" />
            Thiết lập ngưỡng
          </Button>
        }
      />
      <SectionCard
        title={`Ngưỡng hạng năm ${year}`}
        description="Xét theo chi tiêu năm dương lịch, từ 1/1 đến hết 31/12."
      >
        <InfoTable headers={["Hạng", "Chi tiêu năm", "Ưu đãi", "Số hội viên"]}>
          {TIERS.map((tier, index) => (
            <TableRow key={tier.name}>
              <InfoCell>
                <Badge color={tierColor(tier.name)}>{tier.name}</Badge>
              </InfoCell>
              <InfoCell>
                {tier.threshold
                  ? `Từ ${money(tier.threshold)}`
                  : `Dưới ${money(TIERS[1].threshold)}`}
              </InfoCell>
              <InfoCell>{tier.discount}%</InfoCell>
              <InfoCell>
                {tierDistribution[index].value.toLocaleString("vi-VN")}
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
        <CardDescription>
          Mỗi 100.000 đ thực trả được 1 điểm. Đầu năm hội viên về hạng Silver
          với điểm và chi tiêu bằng 0. Số liệu ngưỡng và ưu đãi trên là dữ liệu
          mẫu của bảng hạng.
        </CardDescription>
      </SectionCard>

      <SketchDialog
        open={editing}
        onOpenChange={setEditing}
        title="Thiết lập ngưỡng hạng"
        actionLabel="Lưu ngưỡng"
      >
        {TIERS.slice(1).map((tier) => (
          <div
            key={tier.name}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <FormInput
              id={`tier-${tier.name}-threshold`}
              label={`Ngưỡng ${tier.name} (đồng)`}
              type="number"
              min={1}
              step={1000000}
              defaultValue={tier.threshold}
            />
            <FormInput
              id={`tier-${tier.name}-discount`}
              label={`Ưu đãi ${tier.name} (%)`}
              type="number"
              min={0}
              max={100}
              defaultValue={tier.discount}
            />
          </div>
        ))}
        <CardDescription>
          Ngưỡng hạng cao hơn phải lớn hơn ngưỡng hạng thấp hơn.
        </CardDescription>
      </SketchDialog>
    </div>
  );
}
