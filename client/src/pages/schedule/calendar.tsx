"use client";

import type {
  DayCellInfo,
  DayHeaderInfo,
  DayLaneInfo,
  EventClickInfo,
  EventDisplayInfo,
  MoreLinkInfo,
  ToolbarSectionInfo,
} from "@fullcalendar/react";
import FullCalendar, { type CalendarRef } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import multiMonthPlugin from "@fullcalendar/react/multimonth";
import themePlugin from "@fullcalendar/react/themes/classic";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { useEffect, useRef, useState } from "react";
import CalendarEventItem from "./event-item";
import SessionDetails from "./SessionDetails";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "./icons";
import type { CalendarEvent } from "./types";
import CalendarViewSelect from "./view-selector";

import { INITIAL_EVENTS } from "./data";

export default function Calendar({ onBook }: { onBook: () => void }) {
  const locale = "vi-VN";
  const dataDayClass = (today: boolean) =>
    today
      ? "text-title-sm font-semibold text-brand-500"
      : "text-title-sm font-semibold text-gray-800";
  const events = INITIAL_EVENTS;
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [portalNode, setPortalNode] = useState<Element | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const calendarRef = useRef<CalendarRef>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleViewChange = (viewKey: string) => {
    setCurrentView(viewKey);
    calendarRef.current?.getApi()?.changeView(viewKey);
  };
  const handleEventClick = (info: EventClickInfo) => {
    const event = events.find((item) => item.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", checkMobile);

    const frameId = requestAnimationFrame(() => {
      const el = calendarContainerRef.current?.querySelector(
        ".ta-toolbar-section:last-child",
      );
      if (el) {
        setPortalNode(el);
      }
    });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
      data-color-scheme="light"
    >
      <div
        className={`custom-calendar relative ${currentView === "multiMonthYear" ? "fc-multimonth" : ""}`}
        data-color-scheme="light"
        ref={calendarContainerRef}
      >
        <FullCalendar
          ref={calendarRef}
          className="gap-0!"
          plugins={[
            themePlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            multiMonthPlugin,
          ]}
          locale="vi"
          titleFormat={({ date }) => `Tháng ${date.month + 1}, ${date.year}`}
          firstDay={1}
          allDayText="GMT+7"
          allDayHeaderInnerClass="w-20! min-w-20! px-3! text-center! text-xs! font-medium! whitespace-nowrap!"
          slotHeaderAlign="center"
          eventDisplay="block"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          initialView="dayGridMonth"
          direction="ltr"
          // Toolbar Header configuration
          headerToolbar={{
            start: "prev today next title",
            center: "",
            end: "addEventButton",
          }}
          headerToolbarClass="sticky top-0! z-20! bg-white dark:bg-gray-900 flex-wrap! flex-row! items-center justify-between gap-3 sm:gap-4 [padding-inline:16px]! sm:[padding-inline:24px]! pt-4 sm:pt-6 pb-3 sm:pb-4"
          toolbarTitleClass="first-letter:uppercase text-base! sm:text-lg! font-semibold! text-gray-800 dark:text-white/90"
          toolbarSectionClass={(info: ToolbarSectionInfo) => {
            if (info.name === "start") {
              return "ta-toolbar-section ta-toolbar-start order-1 flex flex-wrap! items-center justify-start gap-2 sm:flex-nowrap!";
            }
            if (info.name === "center") {
              return "ta-toolbar-section ta-toolbar-center hidden!";
            }
            if (info.name === "end") {
              return "ta-toolbar-section ta-toolbar-end order-2 flex items-center justify-end gap-3 sm:order-3 sm:justify-end";
            }
            return "ta-toolbar-section";
          }}
          buttonGroupClass="gap-2"
          buttons={{
            prev: {
              iconContent: () => (
                <ChevronLeftIcon className="size-5 bg-transparent text-gray-700 sm:size-6 rtl:rotate-180 dark:text-gray-400" />
              ),
              className:
                "flex size-9! sm:size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!",
            },
            next: {
              iconContent: () => (
                <ChevronRightIcon className="size-5 bg-transparent text-gray-700 sm:size-6 rtl:rotate-180 dark:text-gray-400" />
              ),
              className:
                "flex size-9! sm:size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!",
            },
            today: {
              text:
                currentView === "multiMonthYear"
                  ? "Năm nay"
                  : currentView === "dayGridMonth"
                    ? "Tháng này"
                    : currentView === "timeGridWeek"
                      ? "Tuần này"
                      : "Hôm nay",
              className:
                "rounded-lg! border! border-gray-200! bg-white! px-3! py-2! text-sm! font-medium! text-gray-700! shadow-none!",
            },
            addEventButton: {
              text: "Đặt lịch PT +",
              click: onBook,
              className:
                "rounded-lg! border-0! bg-brand-500! px-3! sm:px-4! py-2! sm:py-2.5! text-xs! sm:text-sm! font-medium! text-white hover:bg-brand-600! focus:shadow-none! w-auto!",
            },
          }}
          // View configurations
          views={{
            multiMonthYear: {
              titleFormat: ({ date }) => String(date.year),
              multiMonthMaxColumns: 3,
              singleMonthClass: "fc-multimonth",
              tableClass:
                "overflow-visible! border-0! sm:border! sm:border-gray-200! dark:sm:border-gray-800! rounded-none! sm:rounded-lg! mt-0! bg-transparent!",
              singleMonthHeaderClass:
                "mb-0! bg-white dark:bg-gray-900 sm:bg-transparent! ",
              tableHeaderClass:
                "mb-0! rounded-none! sm:rounded-t-lg! bg-gray-50 dark:bg-gray-900!",
              tableBodyClass: "mt-0!",
              singleMonthMinWidth: 280,
              showNonCurrentDates: true,
              singleMonthHeaderInnerClass:
                "text-sm font-medium! text-gray-800 dark:text-white/90",
              dayHeaderRowClass: "fc-multimonth-day-header-row",
              dayHeaderClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!"
                  : "border-0! bg-gray-50 py-2! dark:bg-gray-900 dark:sm:bg-transparent! first:rounded-none! first:sm:rounded-ss-lg! last:rounded-none! last:sm:rounded-se-lg!",
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "text-sm! font-semibold! text-gray-800! dark:text-white/90!"
                  : "py-1 text-[11px] sm:text-xs font-medium text-gray-400 uppercase",
              dayCellClass: (data: DayCellInfo) => {
                if (data.inPopover) return "bg-transparent! p-3!";
                let cls = "relative! p-0.5 sm:p-1!";
                if (data.isToday)
                  cls +=
                    " isolate rounded-sm! bg-gray-100! dark:bg-gray-800/40! font-semibold text-brand-500 dark:text-brand-400";
                if (data.isOther) cls += " bg-transparent!";
                return cls;
              },
              dayCellInnerClass: (data: DayCellInfo) =>
                data.inPopover
                  ? "flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto"
                  : "h-0 max-h-0 overflow-hidden invisible",
              dayCellTopInnerClass:
                "text-xs! sm:text-sm! text-gray-700 dark:text-gray-300",
              dayMaxEvents: 0,
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              rowMoreLinkClass:
                "absolute! -top-0.5! sm:-top-1! start-0.5! z-10! border-0! bg-transparent! p-0!",
              rowMoreLinkInnerClass: "overflow-visible!",
              moreLinkContent() {
                return (
                  <span>
                    <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                  </span>
                );
              },
            },
            dayGridMonth: {
              dayMaxEvents: isMobile ? 0 : 2,
              dayHeaderAlign: (data: { inPopover: boolean }) =>
                data.inPopover ? "start" : "center",
              dayHeaderClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!"
                  : "border-x-0! border-t border-gray-200! bg-gray-50 dark:border-gray-800! dark:bg-gray-900",
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                data.inPopover
                  ? "text-sm! font-semibold! text-gray-800! dark:text-white/90!"
                  : "px-1! py-2! sm:px-3! sm:py-3! md:px-5! md:py-4! text-xs! sm:text-sm! font-medium! text-gray-400 uppercase",
              dayCellClass: (data: DayCellInfo) => {
                if (data.inPopover) return "bg-transparent! p-3!";
                return `bg-transparent! p-1! sm:p-2! ${
                  data.isToday ? "bg-gray-100! dark:bg-gray-800/40!" : ""
                }`;
              },
              dayCellTopInnerClass:
                "text-xs! sm:text-sm! text-gray-700 dark:text-gray-300",
              dayCellInnerClass: (data: DayCellInfo) => {
                if (data.inPopover)
                  return "flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto";
                if (isMobile) return "h-0 max-h-0 overflow-hidden invisible";
                return data.isToday ? "rounded-sm!" : "";
              },
              rowMoreLinkClass: isMobile
                ? "absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!"
                : "",
              rowMoreLinkInnerClass: isMobile ? "overflow-visible!" : "",
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              moreLinkContent(args: MoreLinkInfo) {
                if (isMobile) {
                  return (
                    <span>
                      <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                    </span>
                  );
                }
                return (
                  <span className="fc-more-link-badge inline-flex items-center rounded-sm bg-brand-50 px-1 py-0.5 text-[10px] font-medium text-brand-600 transition-colors hover:bg-brand-100 sm:px-1.5 sm:text-xs dark:bg-brand-500/15 dark:text-brand-400 dark:hover:bg-brand-500/25">
                    +{args.num} more
                  </span>
                );
              },
            },
            timeGridWeek: {
              titleFormat: { day: "numeric", month: "long", year: "numeric" },
              slotDuration: "01:00:00",
              slotMinHeight: 56,
              allDaySlot: true,
              dayMaxEvents: isMobile ? 0 : undefined,
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              rowMoreLinkClass: isMobile
                ? "absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!"
                : "",
              rowMoreLinkInnerClass: isMobile ? "overflow-visible!" : "",
              moreLinkContent: isMobile
                ? () => (
                    <span>
                      <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                    </span>
                  )
                : undefined,
              dayHeaderContent: (arg: DayHeaderInfo) => {
                const weekday = new Intl.DateTimeFormat(locale, {
                  weekday: "short",
                })
                  .format(arg.date)
                  .toUpperCase();
                const day = new Intl.DateTimeFormat(locale, {
                  day: "numeric",
                }).format(arg.date);
                return (
                  <div className="flex flex-col items-center gap-2">
                    <span>{weekday}</span>
                    <span className={dataDayClass(arg.isToday)}>{day}</span>
                  </div>
                );
              },
              dayHeaderClass: (data: DayHeaderInfo) =>
                `border-0! bg-gray-50! dark:bg-gray-900! ${
                  data.isToday ? "bg-gray-100/70! dark:bg-gray-800/60!" : ""
                }`,
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                `px-1.5! sm:px-3! py-2.5! sm:py-3.5! text-center! text-[11px]! sm:text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
                  data.isToday
                    ? "font-semibold! text-brand-500! dark:text-brand-400!"
                    : ""
                }`,
              slotHeaderDividerClass:
                "border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!",
              slotHeaderClass:
                "flex! items-center! justify-center! text-gray-400! dark:text-gray-500!",
              slotLaneClass: "border-gray-100! dark:border-gray-800/60!",
              dayLaneClass: (data: DayLaneInfo) =>
                `border-gray-200! dark:border-gray-800! ${
                  data.isToday
                    ? "bg-brand-50/15! dark:bg-brand-500/[0.03]!"
                    : ""
                }`,
              allDayDividerClass:
                "border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!",
              allDayHeaderClass:
                "flex! items-center! justify-center! border-0! bg-gray-50! text-[11px]! sm:text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!",
            },
            timeGridDay: {
              titleFormat: ({ date }) =>
                `${date.day} tháng ${date.month + 1}, ${date.year}`,
              slotDuration: "00:30:00",
              slotMinHeight: 48,
              allDaySlot: true,
              dayMaxEvents: isMobile ? 0 : undefined,
              moreLinkClass:
                "border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none",
              rowMoreLinkClass: isMobile
                ? "absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!"
                : "",
              rowMoreLinkInnerClass: isMobile ? "overflow-visible!" : "",
              moreLinkContent: isMobile
                ? () => (
                    <span>
                      <BookmarkIcon className="size-4.5 text-brand-500 sm:size-5.5" />
                    </span>
                  )
                : undefined,
              dayHeaderContent: (arg: DayHeaderInfo) => {
                const weekday = new Intl.DateTimeFormat(locale, {
                  weekday: "short",
                })
                  .format(arg.date)
                  .toUpperCase();
                const day = new Intl.DateTimeFormat(locale, {
                  day: "numeric",
                }).format(arg.date);
                return `${weekday} - ${day}`;
              },
              dayHeaderClass: (data: DayHeaderInfo) =>
                `border-0! bg-gray-50! dark:bg-gray-900! ${
                  data.isToday ? "bg-gray-100/70! dark:bg-gray-800/60!" : ""
                }`,
              dayHeaderInnerClass: (data: DayHeaderInfo) =>
                `px-2! sm:px-4! py-2.5! sm:py-3.5! text-center! text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
                  data.isToday
                    ? "font-semibold! text-brand-500! dark:text-brand-400!"
                    : ""
                }`,
              slotHeaderDividerClass:
                "border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!",
              slotHeaderClass:
                "flex! items-center! justify-center! text-gray-400! dark:text-gray-500!",
              slotLaneClass: "border-gray-300! dark:border-gray-600!",
              dayLaneClass: (data: DayLaneInfo) =>
                `border-gray-200! dark:border-gray-800! ${
                  data.isToday
                    ? "bg-brand-50/15! dark:bg-brand-500/[0.03]!"
                    : ""
                }`,
              allDayDividerClass:
                "border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!",
              allDayHeaderClass:
                "flex! items-center! justify-center! border-0! bg-gray-50! text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!",
            },
          }}
          // Body configuration
          height="auto"
          borderless={true}
          viewClass="border-t! border-b-0! border-x-0! border-gray-200! bg-transparent! dark:border-gray-800! dark:bg-transparent!"
          tableHeaderClass="border-0! bg-gray-50! dark:bg-gray-900!"
          dayHeaderDividerClass="border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!"
          slotMinHeight={56}
          slotHeaderFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotHeaderInnerClass="w-20! min-w-20! px-3! text-center! text-xs! font-medium! whitespace-nowrap!"
          slotHeaderDividerClass="border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!"
          allDayDividerClass="border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!"
          eventClass="focus:shadow-none"
          nowIndicator={false}
          columnEventClass="bg-transparent! border-0! p-1! shadow-none! hover:shadow-none! focus:outline-none"
          columnEventInnerClass="p-0! border-0! bg-transparent! h-full"
          tableHeaderSticky={true}
          tableClass="overflow-hidden bg-transparent!"
          rowEventClass="bg-transparent! border-0! px-1! py-0.5! shadow-none! hover:shadow-none! focus:outline-none"
          rowEventInnerClass="p-0! border-0! bg-transparent!"
          popoverFormat={{ month: "short", day: "numeric", year: "numeric" }}
          popoverClass="z-99999! w-72 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
          popoverCloseClass="absolute end-3 top-2.5 flex size-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          popoverCloseContent={() => <CloseIcon className="size-4" />}
          datesSet={(arg) => {
            setCurrentView(arg.view.type);
            requestAnimationFrame(() => {
              const chunk = calendarContainerRef.current?.querySelector(
                ".ta-toolbar-section:last-child",
              );
              if (chunk) {
                setPortalNode(chunk);
              }
            });
          }}
          selectable={false}
          events={events}
          eventClick={handleEventClick}
          eventContent={(eventInfo: EventDisplayInfo) => (
            <CalendarEventItem eventInfo={eventInfo} />
          )}
        />

        <CalendarViewSelect
          currentView={currentView}
          onViewChange={handleViewChange}
          portalNode={portalNode}
        />
      </div>

      <SessionDetails
        open={isOpen}
        onOpenChange={setIsOpen}
        event={selectedEvent}
      />
    </div>
  );
}
