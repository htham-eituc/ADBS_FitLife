import PtAvailability from "@/components/shared/PtAvailability";
import { firstPtSlot } from "@/data/pt-availability";
import { useState } from "react";
import { PageHeading } from "@/components/shared/MemberPage";
import Calendar from "./schedule/calendar";
import BookingDialog from "./schedule/BookingDialog";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/palette.css";
import "@fullcalendar/react/themes/classic/theme.css";

export default function Schedule() {
  const [selection, setSelection] = useState(firstPtSlot);
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeading
        title="Lịch tập"
        description="Theo dõi lịch hẹn và các buổi tập của bạn."
      />
      {/* <PtAvailability
        onSelect={(slot) => {
          setSelection(slot);
          setBookingOpen(true);
        }}
      /> */}
      <Calendar
        onBook={() => {
          setSelection(firstPtSlot());
          setBookingOpen(true);
        }}
      />
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        selection={selection}
        onSelectionChange={setSelection}
      />
    </div>
  );
}
