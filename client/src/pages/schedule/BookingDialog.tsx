import SketchDialog from "@/components/shared/SketchDialog";
import FormSelect from "@/components/shared/FormSelect";
import { FormInput, SelectField } from "@/components/shared/StaffPage";
import { CardDescription } from "@/components/ui/card";
import { BRANCH_NAMES } from "@/data/branch";
import { members } from "@/data/front-desk";
import {
  firstPtSlot,
  getPtAvailability,
  type PtSlotSelection,
} from "@/data/pt-availability";
import { isoDate } from "@/data/member";

export default function BookingDialog({
  open,
  onOpenChange,
  selection,
  onSelectionChange,
  forMember = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selection: PtSlotSelection;
  onSelectionChange: (selection: PtSlotSelection) => void;
  forMember?: boolean;
}) {
  const trainers = getPtAvailability(selection.branch, selection.date);
  const times =
    trainers.find((row) => row.trainer === selection.trainer)?.slots ?? [];
  return (
    <SketchDialog
      open={open}
      onOpenChange={onOpenChange}
      title={forMember ? "Đặt lịch PT hộ hội viên" : "Đặt lịch PT"}
      actionLabel="Xác nhận đặt lịch"
    >
      {forMember && (
        <FormSelect
          label="Hội viên"
          options={members.map((item) => `${item.id} - ${item.name}`)}
        />
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="Chi nhánh"
          value={selection.branch}
          options={BRANCH_NAMES}
          onChange={(branch) =>
            onSelectionChange(firstPtSlot(branch, selection.date))
          }
        />
        <FormInput
          id="booking-date"
          label="Ngày tập"
          type="date"
          min={isoDate()}
          max={isoDate(14)}
          value={selection.date}
          onChange={(e) =>
            onSelectionChange(firstPtSlot(selection.branch, e.target.value))
          }
        />
        <SelectField
          label="Huấn luyện viên"
          value={selection.trainer || "Không có HLV trống"}
          options={
            trainers.length
              ? trainers.map((row) => row.trainer)
              : ["Không có HLV trống"]
          }
          onChange={(trainer) => {
            const row = trainers.find((item) => item.trainer === trainer);
            if (row)
              onSelectionChange({ ...selection, trainer, time: row.slots[0] });
          }}
        />
        <SelectField
          label="Giờ bắt đầu"
          value={selection.time || "Không có giờ trống"}
          options={times.length ? times : ["Không có giờ trống"]}
          onChange={(time) => {
            if (times.includes(time)) onSelectionChange({ ...selection, time });
          }}
        />
      </div>
      <FormSelect label="Gói PT" options={["PT 10 buổi - Còn 8 buổi"]} />
      {!times.length && (
        <CardDescription role="status">
          Chọn chi nhánh hoặc ngày khác để xem giờ trống.
        </CardDescription>
      )}
    </SketchDialog>
  );
}
