import { cn } from "@/utils";
import type { EventDisplayInfo } from "@fullcalendar/react";

const eventColors: Record<
  string,
  { surface: string; title: string; detail: string }
> = {
  success: {
    surface: "border-green-100 border-s-green-500 bg-green-50",
    title: "text-green-700",
    detail: "text-green-600",
  },
  danger: {
    surface: "border-red-100 border-s-red-500 bg-red-50",
    title: "text-red-700",
    detail: "text-red-600",
  },
  primary: {
    surface: "border-brand-100 border-s-brand-500 bg-brand-50",
    title: "text-brand-700",
    detail: "text-brand-600",
  },
  warning: {
    surface: "border-orange-100 border-s-orange-500 bg-orange-50",
    title: "text-orange-700",
    detail: "text-orange-600",
  },
  info: {
    surface: "border-blue-100 border-s-blue-500 bg-blue-50",
    title: "text-blue-700",
    detail: "text-blue-600",
  },
};

export default function CalendarEventItem({
  eventInfo,
}: {
  eventInfo: EventDisplayInfo;
}) {
  const event = eventInfo.event;
  const colors =
    eventColors[
      String(event.extendedProps.calendar || "primary").toLowerCase()
    ] ?? eventColors.primary;
  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  const timeRange =
    event.start && event.end
      ? formatTime(event.start) + " – " + formatTime(event.end)
      : eventInfo.timeText;
  const trainer = event.extendedProps.trainer?.replace(" (mẫu)", "");
  const detail = timeRange;
  return (
    <div
      title={[event.title, timeRange, trainer].filter(Boolean).join(" – ")}
      className={cn(
        "event-fc-color flex h-full w-full flex-col justify-center overflow-hidden rounded-lg border border-s-2 px-2 py-1.5 shadow-sm",
        colors.surface,
      )}
    >
      <div className={cn("truncate text-xs font-semibold", colors.title)}>
        {event.title}
      </div>
      <div className={cn("truncate text-xs font-normal", colors.detail)}>
        {detail}
      </div>
    </div>
  );
}
