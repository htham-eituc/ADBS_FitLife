import SketchDialog from "@/components/shared/SketchDialog";
import FormSelect from "@/components/shared/FormSelect";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { isoDate } from "@/data/member";

export default function BookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <SketchDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Đặt lịch PT"
      actionLabel="Xác nhận đặt lịch"
    >
      <FormSelect
        label="Chi nhánh"
        options={["Chi nhánh Quận 1", "Chi nhánh Quận 3"]}
      />
      <FormSelect
        label="Huấn luyện viên"
        options={["HLV Minh (mẫu)", "HLV An (mẫu)"]}
      />
      <Field>
        <FieldLabel htmlFor="booking-date">Ngày tập</FieldLabel>
        <Input
          id="booking-date"
          type="date"
          defaultValue={isoDate(1)}
          min={isoDate()}
          max={isoDate(14)}
        />
      </Field>
      <FormSelect
        label="Giờ bắt đầu"
        options={["18:00", "07:00", "09:00", "17:00", "19:00"]}
      />
      <Field>
        <FieldLabel htmlFor="booking-plan">Gói sử dụng</FieldLabel>
        <Input id="booking-plan" value="PT 10 buổi – Còn 8 buổi" readOnly />
      </Field>
    </SketchDialog>
  );
}
