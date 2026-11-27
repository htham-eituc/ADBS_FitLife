import PtAvailability from "@/components/shared/PtAvailability";
import BookingDialog from "../schedule/BookingDialog";
import { firstPtSlot } from "@/data/pt-availability";
import TransferAppointments from "@/components/shared/TransferAppointments";
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
import { CalendarIcon } from "@/icons/calendar";
import { ptBookings, type PtBooking } from "@/data/front-desk";
import { formatDate, isoDate } from "@/data/member";

export default function PtBookings() {
  const [rows, setRows] = useState(ptBookings);
  const [selection, setSelection] = useState(firstPtSlot);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [cancelling, setCancelling] = useState<PtBooking | null>(null);
  const upcoming = rows.filter((item) => item.date >= isoDate(0));
  const past = rows.filter((item) => item.date < isoDate(0));
  const now = new Date().toTimeString().slice(0, 5);
  const cancellable = (item: PtBooking) =>
    item.status === "Đã đặt" && !(item.date === isoDate(0) && item.time <= now);

  return (
    <div className="space-y-6">
      <PageHeading
        title="Lịch tập"
        description="Đặt hoặc hủy lịch PT 1-1 hộ hội viên tại quầy."
        action={
          <Button
            onClick={() => {
              setSelection(firstPtSlot());
              setBookingOpen(true);
            }}
          >
            <CalendarIcon className="size-5" />
            Đặt lịch hộ hội viên
          </Button>
        }
      />

      <PtAvailability
        onSelect={(slot) => {
          setSelection(slot);
          setBookingOpen(true);
        }}
      />
      <TransferAppointments bookings={rows} onChange={setRows} />
      <SectionCard title="Lịch sắp tới">
        <InfoTable
          headers={[
            "Lịch",
            "Thời gian",
            "Hội viên",
            "HLV",
            "Gói",
            "Trạng thái",
            "",
          ]}
        >
          {upcoming.map((item) => (
            <TableRow key={item.id}>
              <InfoCell>{item.id}</InfoCell>
              <InfoCell>
                {item.time} - {formatDate(item.date)}
              </InfoCell>
              <InfoCell>{item.member}</InfoCell>
              <InfoCell>{item.trainer}</InfoCell>
              <InfoCell>{item.plan}</InfoCell>
              <InfoCell>
                <StatusBadge status={item.status} />
              </InfoCell>
              <InfoCell>
                <div className="flex justify-end">
                  {cancellable(item) && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="justify-end px-0 text-right"
                      onClick={() => setCancelling(item)}
                    >
                      Hủy lịch
                    </Button>
                  )}
                </div>
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <SectionCard title="Lịch đã qua">
        <InfoTable
          headers={[
            "Lịch",
            "Thời gian",
            "Hội viên",
            "HLV",
            "Gói",
            "Trạng thái",
          ]}
        >
          {past.map((item) => (
            <TableRow key={item.id}>
              <InfoCell>{item.id}</InfoCell>
              <InfoCell>
                {item.time} - {formatDate(item.date)}
              </InfoCell>
              <InfoCell>{item.member}</InfoCell>
              <InfoCell>{item.trainer}</InfoCell>
              <InfoCell>{item.plan}</InfoCell>
              <InfoCell>
                <StatusBadge status={item.status} />
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        selection={selection}
        onSelectionChange={setSelection}
        forMember
      />
      <SketchDialog
        open={!!cancelling}
        onOpenChange={(open) => {
          if (!open) setCancelling(null);
        }}
        title="Hủy lịch PT"
        actionLabel="Xác nhận hủy"
      >
        {cancelling && (
          <CardDescription>
            {cancelling.member} - {cancelling.trainer} - {cancelling.time}{" "}
            {formatDate(cancelling.date)}. Hủy lịch không trừ buổi.
          </CardDescription>
        )}
      </SketchDialog>
    </div>
  );
}
