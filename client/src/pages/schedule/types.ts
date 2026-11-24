import type { EventInput } from "@fullcalendar/react";

export interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    branch?: string;
    trainer?: string;
    status?: string;
  };
}

export interface CalendarViewOption {
  key: string;
  label: string;
}

export const CALENDAR_VIEW_OPTIONS: CalendarViewOption[] = [
  { key: "multiMonthYear", label: "Năm" },
  { key: "dayGridMonth", label: "Tháng" },
  { key: "timeGridWeek", label: "Tuần" },
  { key: "timeGridDay", label: "Ngày" },
];
