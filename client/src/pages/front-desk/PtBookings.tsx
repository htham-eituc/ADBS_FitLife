import { useState } from "react";
import FormSelect from "@/components/shared/FormSelect";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import {
  FormInput,
  SectionCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { CalendarIcon } from "@/icons/calendar";
import { BRANCH_NAMES, homeBranch } from "@/data/branch";
import {
  TRAINERS,
  freeSlots,
  members,
  ptBookings,
  type PtBooking,
} from "@/data/front-desk";
import { formatDate, isoDate } from "@/data/member";

const HOURS = Array.from(
  { length: 17 },
  (_, index) => `${String(index + 5).padStart(2, "0")}:00`,
);

export default function PtBookings() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [cancelling, setCancelling] = useState<PtBooking | null>(null);
  const upcoming = ptBookings.filter((item) => item.date >= isoDate(0));
  const past = ptBookings.filter((item) => item.date < isoDate(0));
  const now = new Date().toTimeString().slice(0, 5);
  const cancellable = (item: PtBooking) =>
    item.status === "Đã đặt" && !(item.date === isoDate(0) && item.time <= now);

  return (
    <div className="space-y-6">
      <PageHeading
        title="Lịch PT"
        description="Đặt hoặc hủy lịch PT 1-1 hộ hội viên tại quầy."
        action={
          <Button onClick={() => setBookingOpen(true)}>
            <CalendarIcon className="size-5" />
            Đặt lịch hộ hội viên
          </Button>
        }
      />

      <SectionCard
        title="Khung giờ trống hôm nay"
        description={`HLV đang công tác tại ${homeBranch.name}. Mỗi buổi 60 phút, bắt đầu ở giờ tròn.`}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {freeSlots.map((row) => (
            <div
              key={row.trainer}
              className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/3"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                {row.trainer}
              </span>
              <div className="flex flex-wrap gap-2">
                {row.slots.map((slot) => (
                  <Badge key={slot} color="primary">
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Lịch sắp tới"
        description="Chỉ lịch Đã đặt mới hủy được; hủy lịch không trừ buổi và giải phóng khung giờ."
      >
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
                {item.time} · {formatDate(item.date)}
              </InfoCell>
              <InfoCell>{item.member}</InfoCell>
              <InfoCell>{item.trainer}</InfoCell>
              <InfoCell>{item.plan}</InfoCell>
              <InfoCell>
                <StatusBadge status={item.status} />
              </InfoCell>
              <InfoCell>
                {cancellable(item) && (
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
                {item.time} · {formatDate(item.date)}
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

      <SketchDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        title="Đặt lịch PT hộ hội viên"
        actionLabel="Xác nhận đặt lịch"
      >
        <FormSelect
          label="Hội viên"
          options={members.map((item) => `${item.id} – ${item.name}`)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormSelect
            label="Chi nhánh"
            options={[
              homeBranch.name,
              ...BRANCH_NAMES.filter((name) => name !== homeBranch.name),
            ]}
          />
          <FormSelect label="Huấn luyện viên" options={TRAINERS} />
          <FormSelect label="Gói PT" options={["PT 10 buổi – Còn 8 buổi"]} />
          <FormInput
            id="booking-date"
            label="Ngày tập"
            type="date"
            min={isoDate(0)}
            defaultValue={isoDate(1)}
          />
          <FormSelect label="Giờ bắt đầu" options={HOURS} />
        </div>
        <CardDescription>
          Buổi tập 60 phút, bắt đầu ở giờ tròn, nằm trong giờ mở cửa và thời hạn
          gói. HLV phải công tác tại chi nhánh vào ngày tập; HLV và hội viên đều
          không có hai lịch trùng giờ.
        </CardDescription>
      </SketchDialog>

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
            {cancelling.member} · {cancelling.trainer} · {cancelling.time}{" "}
            {formatDate(cancelling.date)}. Lịch chuyển sang Hủy, không trừ buổi;
            hội viên và HLV nhận thông báo.
          </CardDescription>
        )}
      </SketchDialog>
    </div>
  );
}
