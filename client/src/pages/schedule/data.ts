import type { CalendarEvent } from "./types";
import { isoDate } from "@/data/member";

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "pt-complete",
    title: "PT – Sức mạnh",
    start: isoDate(-2) + "T18:00:00",
    end: isoDate(-2) + "T19:00:00",
    allDay: false,
    extendedProps: {
      calendar: "Success",
      branch: "Chi nhánh Quận 1",
      trainer: "HLV Minh (mẫu)",
      status: "Đã hoàn thành",
    },
  },
  {
    id: "pt-confirm",
    title: "PT – Kỹ thuật",
    start: isoDate() + "T08:00:00",
    end: isoDate() + "T09:00:00",
    allDay: false,
    extendedProps: {
      calendar: "Warning",
      branch: "Chi nhánh Quận 1",
      trainer: "HLV Minh (mẫu)",
      status: "Chờ bạn xác nhận",
    },
  },
  {
    id: "pt-today",
    title: "PT – Toàn thân",
    start: isoDate() + "T18:00:00",
    end: isoDate() + "T19:00:00",
    allDay: false,
    extendedProps: {
      calendar: "Primary",
      branch: "Chi nhánh Quận 1",
      trainer: "HLV Minh (mẫu)",
      status: "Đã đặt",
    },
  },
  {
    id: "pt-next",
    title: "PT – Thể lực",
    start: isoDate(2) + "T18:00:00",
    end: isoDate(2) + "T19:00:00",
    allDay: false,
    extendedProps: {
      calendar: "Primary",
      branch: "Chi nhánh Quận 1",
      trainer: "HLV Minh (mẫu)",
      status: "Đã đặt",
    },
  },
];
