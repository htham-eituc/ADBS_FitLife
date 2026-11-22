import PlanTable from "./plans/plan-table";
import { useState } from "react";
import { PageHeading } from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import InfoField from "@/components/shared/InfoField";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans, formatDate } from "@/data/member";

export default function Plans() {
  const [selected, setSelected] = useState<(typeof plans)[number] | null>(null);
  return (
    <div className="space-y-6">
      <PageHeading
        title="Gói dịch vụ"
        description="Các gói đã mua, thời hạn và số buổi còn lại."
      />
      <PlanTable
        title="Gói dịch vụ của bạn"
        data={plans}
        onView={setSelected}
      />
      <CardDescription>
        Gói có hiệu lực sau thanh toán. Mua hoặc gia hạn được thực hiện tại
        quầy.
      </CardDescription>
      <SketchDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title={selected?.name || "Chi tiết gói"}
      >
        {selected && (
          <>
            <Card size="sm" className="bg-gray-50">
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
                <Badge color="primary">{selected.service}</Badge>
                <Badge color="success">{selected.status}</Badge>
              </CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {selected.remaining}
              </CardTitle>
              <CardDescription>Số buổi/lượt sử dụng còn lại</CardDescription>
            </Card>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoField label="Mã gói" value={selected.id} />
              <InfoField
                label="Thời hạn"
                value={
                  selected.end
                    ? formatDate(selected.start) +
                      " – " +
                      formatDate(selected.end)
                    : "Không giới hạn"
                }
              />
            </div>
            <Separator />
            {selected.end && (
              <CardDescription>
                Gia hạn gói còn hiệu lực sẽ bắt đầu sau ngày hết hạn hiện tại.
              </CardDescription>
            )}
          </>
        )}
        <Button variant="outline" disabled>
          Liên hệ quầy gia hạn
        </Button>
      </SketchDialog>
    </div>
  );
}
