import { useState } from "react";
import { PageHeading } from "@/components/shared/MemberPage";
import Calendar from "./schedule/calendar";
import BookingDialog from "./schedule/BookingDialog";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/palette.css";
import "@fullcalendar/react/themes/classic/theme.css";

export default function Schedule() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeading
        title="Lịch tập"
        description="Theo dõi lịch hẹn và các buổi tập của bạn."
      />
      <Calendar onBook={() => setBookingOpen(true)} />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
