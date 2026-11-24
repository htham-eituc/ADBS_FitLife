import { useId, useState } from "react";
import { FormInput, SectionCard, SelectField } from "./StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BRANCH_NAMES, homeBranch } from "@/data/branch";
import {
  getPtAvailability,
  type PtSlotSelection,
} from "@/data/pt-availability";
import { isoDate } from "@/data/member";

export default function PtAvailability({
  onSelect,
}: {
  onSelect: (selection: PtSlotSelection) => void;
}) {
  const dateId = useId();
  const [branch, setBranch] = useState(homeBranch.name);
  const [date, setDate] = useState(isoDate(1));
  const trainers = getPtAvailability(branch, date);
  return (
    <SectionCard
      title="Khung giờ PT còn trống"
      action={
        <Badge size="sm" color="gray">
          Dữ liệu mẫu
        </Badge>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="Chi nhánh"
          value={branch}
          options={BRANCH_NAMES}
          onChange={setBranch}
        />
        <FormInput
          id={dateId}
          label="Ngày tập"
          type="date"
          value={date}
          min={isoDate()}
          max={isoDate(14)}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {trainers.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trainers.map((row) => (
            <Card key={row.trainer} size="sm">
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-sm font-semibold">
                  {row.trainer}
                </CardTitle>
                <Badge size="sm" color="primary">
                  {row.slots.length} khung giờ
                </Badge>
              </CardHeader>
              <div className="flex flex-wrap gap-2">
                {row.slots.map((time) => (
                  <Button
                    key={time}
                    size="sm"
                    variant="outline"
                    aria-label={`Đặt ${time} với ${row.trainer}`}
                    onClick={() =>
                      onSelect({ branch, date, trainer: row.trainer, time })
                    }
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <CardDescription role="status">
          Chưa có khung giờ trống trong dữ liệu mẫu cho chi nhánh và ngày đã
          chọn.
        </CardDescription>
      )}
    </SectionCard>
  );
}
