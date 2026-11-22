import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InfoField from "@/components/shared/InfoField";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CalendarEvent } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
};

export default function SessionDetails({ open, onOpenChange, event }: Props) {
  const start = typeof event?.start === "string" ? new Date(event.start) : null;
  const end = typeof event?.end === "string" ? new Date(event.end) : null;
  const time = (date: Date) =>
    date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const status = event?.extendedProps.status;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event?.title || "Chi tiết buổi tập"}</DialogTitle>
        </DialogHeader>
        {event && (
          <>
            <Card size="sm" className="border-brand-200 bg-brand-50">
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
                <CardDescription>Thời gian buổi tập</CardDescription>
                <Badge
                  color={
                    status === "Đã hoàn thành"
                      ? "success"
                      : status === "Chờ bạn xác nhận"
                        ? "warning"
                        : "primary"
                  }
                >
                  {status}
                </Badge>
              </CardHeader>
              <CardTitle className="text-2xl font-semibold text-brand-600">
                {start && time(start)} – {end && time(end)}
              </CardTitle>
              <CardDescription className="text-gray-700">
                {start?.toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </CardDescription>
            </Card>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoField
                label="Huấn luyện viên"
                value={event.extendedProps.trainer || "Chưa phân công"}
              />
              <InfoField
                label="Chi nhánh"
                value={event.extendedProps.branch || "—"}
              />
            </div>
            <Separator />
          </>
        )}
        <DialogFooter>
          <Button disabled>
            {status === "Đã hoàn thành"
              ? "Đánh giá HLV"
              : status === "Chờ bạn xác nhận"
                ? "Xác nhận buổi tập"
                : "Hủy lịch"}
          </Button>
          <DialogClose render={<Button variant="outline" />}>Đóng</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
