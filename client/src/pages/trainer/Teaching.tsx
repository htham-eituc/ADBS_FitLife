import { StatCard } from "@/components/shared/StaffPage";
import { useState } from "react";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import { SectionCard, StatusBadge } from "@/components/shared/StaffPage";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { formatDate, isoDate } from "@/data/member";
import { teachingSessions, type TeachingSession } from "@/data/staff";

export default function Teaching() {
  const [sessions, setSessions] = useState(teachingSessions);
  const [cancelling, setCancelling] = useState<TeachingSession | null>(null);
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState<TeachingSession | null>(null);
  const today = sessions.filter((item) => item.date === isoDate(0));
  const others = sessions.filter((item) => item.date !== isoDate(0));

  return (
    <div className="space-y-6">
      <PageHeading
        title="Lịch dạy"
        description="Các buổi PT 1-1 bạn phụ trách."
      />
      {message && <CardDescription role="status">{message}</CardDescription>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Buổi hôm nay" value={today.length} />
        <StatCard
          label="Sắp tới"
          value={others.filter((item) => item.date > isoDate(0)).length}
        />
        <StatCard
          label="Đã hoàn thành"
          value={
            sessions.filter((item) => item.status === "Đã hoàn thành").length
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
                {item.status !== "Hủy" && item.note && (
                  <CardDescription>{item.note}</CardDescription>
                )}
              </InfoCell>
              <InfoCell>
                {item.status === "Đã đặt" && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setConfirming(item)}
                    >
                      Xác nhận hoàn thành
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCancelling(item)}
                    >
                      Hủy lịch
                    </Button>
                  </div>
                )}
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <SectionCard title="Sắp tới và gần đây">
        <InfoTable
          headers={["Ngày", "Giờ", "Hội viên", "Gói", "Trạng thái", ""]}
        >
          {others.map((item) => (
            <TableRow key={item.id}>
              <InfoCell>{formatDate(item.date)}</InfoCell>
              <InfoCell>{item.time}</InfoCell>
              <InfoCell>{item.member}</InfoCell>
              <InfoCell>{item.plan}</InfoCell>
              <InfoCell>
                <StatusBadge status={item.status} />
                {item.status !== "Hủy" && item.note && (
                  <CardDescription>{item.note}</CardDescription>
                )}
              </InfoCell>
              <InfoCell>
                {item.status === "Đã đặt" && item.date >= isoDate() && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCancelling(item)}
                  >
                    Hủy lịch
                  </Button>
                )}
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <SketchDialog
        open={!!cancelling}
        onOpenChange={(open) => {
          if (!open) setCancelling(null);
        }}
        title="Hủy lịch PT"
        actionLabel="Xác nhận hủy lịch"
        onAction={() => {
          if (!cancelling) return;
          setSessions((rows) =>
            rows.map((row) =>
              row.id === cancelling.id
                ? {
                    ...row,
                    status: "Hủy",
                    note: "HLV hủy lịch - Không trừ buổi",
                  }
                : row,
            ),
          );
          setMessage(
            `Đã hủy lịch ${cancelling.id}. Không trừ buổi của hội viên.`,
          );
          setCancelling(null);
        }}
      >
        <CardDescription>
          {cancelling?.member} - {cancelling?.time} -{" "}
          {cancelling && formatDate(cancelling.date)}. Hủy lịch không trừ buổi.
        </CardDescription>
      </SketchDialog>
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
            {confirming.member} - {confirming.time} hôm nay - {confirming.plan}.
            Sau khi hội viên cũng xác nhận, lịch chuyển sang Đã hoàn thành.
          </CardDescription>
        )}
      </SketchDialog>
    </div>
  );
}
