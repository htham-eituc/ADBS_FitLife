import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { formatDate, isoDate } from "@/data/member";
import { teachingSessions, type TeachingSession } from "@/data/staff";

export default function Teaching() {
  const [confirming, setConfirming] = useState<TeachingSession | null>(null);
  const today = teachingSessions.filter((item) => item.date === isoDate(0));
  const others = teachingSessions.filter((item) => item.date !== isoDate(0));

  return (
    <div className="space-y-6">
      <PageHeading
        title="Lịch dạy"
        description="Các buổi PT 1-1 bạn phụ trách."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Buổi hôm nay" value={today.length} />
        <StatCard
          label="Sắp tới"
          value={others.filter((item) => item.date > isoDate(0)).length}
        />
        <StatCard
          label="Đã hoàn thành"
          value={
            teachingSessions.filter((item) => item.status === "Đã hoàn thành")
              .length
          }
        />
      </div>

      <SectionCard
        title="Hôm nay"
        description="Buổi chỉ hoàn thành khi cả HLV và hội viên xác nhận trên ứng dụng; mỗi buổi hoàn thành trừ một buổi của gói."
      >
        <InfoTable
          headers={["Giờ", "Hội viên", "Chi nhánh", "Gói", "Trạng thái", ""]}
        >
          {today.map((item) => (
            <TableRow key={item.id}>
              <InfoCell>{item.time}</InfoCell>
              <InfoCell>{item.member}</InfoCell>
              <InfoCell>{item.branch}</InfoCell>
              <InfoCell>{item.plan}</InfoCell>
              <InfoCell>
                <StatusBadge status={item.status} />
                {item.note && <CardDescription>{item.note}</CardDescription>}
              </InfoCell>
              <InfoCell>
                {item.status === "Đã đặt" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setConfirming(item)}
                  >
                    Xác nhận hoàn thành
                  </Button>
                )}
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <SectionCard title="Sắp tới và gần đây">
        <InfoTable headers={["Ngày", "Giờ", "Hội viên", "Gói", "Trạng thái"]}>
          {others.map((item) => (
            <TableRow key={item.id}>
              <InfoCell>{formatDate(item.date)}</InfoCell>
              <InfoCell>{item.time}</InfoCell>
              <InfoCell>{item.member}</InfoCell>
              <InfoCell>{item.plan}</InfoCell>
              <InfoCell>
                <StatusBadge status={item.status} />
                {item.note && <CardDescription>{item.note}</CardDescription>}
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <SketchDialog
        open={!!confirming}
        onOpenChange={(open) => {
          if (!open) setConfirming(null);
        }}
        title="Xác nhận buổi tập"
        actionLabel="Xác nhận hoàn thành"
      >
        {confirming && (
          <CardDescription>
            {confirming.member} · {confirming.time} hôm nay · {confirming.plan}.
            Sau khi hội viên cũng xác nhận, lịch chuyển sang Đã hoàn thành.
          </CardDescription>
        )}
      </SketchDialog>
    </div>
  );
}
