import { useState, type Dispatch, type SetStateAction } from "react";
import { InfoCell, InfoTable } from "./MemberPage";
import { FormInput, SectionCard, SelectField, StatusBadge } from "./StaffPage";
import SketchDialog from "./SketchDialog";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { ptBookings, TRAINERS, type PtBooking } from "@/data/front-desk";
import { homeBranch } from "@/data/branch";
import { formatDate, isoDate } from "@/data/member";

export default function TransferAppointments({
  bookings,
  onChange,
}: {
  bookings?: PtBooking[];
  onChange?: Dispatch<SetStateAction<PtBooking[]>>;
}) {
  const [trainer, setTrainer] = useState(TRAINERS[0]);
  const [date, setDate] = useState(isoDate(1));
  const [localRows, setLocalRows] = useState(ptBookings);
  const rows = bookings ?? localRows;
  const setRows = onChange ?? setLocalRows;
  const [editing, setEditing] = useState<{
    row: PtBooking;
    action: "replace" | "cancel";
  } | null>(null);
  const [replacement, setReplacement] = useState(TRAINERS[1]);
  const [message, setMessage] = useState("");
  const affected = rows.filter(
    (row) =>
      row.trainer === trainer && row.status === "Đã đặt" && row.date >= date,
  );
  const candidates = TRAINERS.filter(
    (name) =>
      name !== trainer &&
      !rows.some(
        (row) =>
          row.id !== editing?.row.id &&
          row.trainer === name &&
          row.date === editing?.row.date &&
          row.time === editing?.row.time &&
          row.status !== "Hủy",
      ),
  );
  return (
    <SectionCard
      title="Lịch PT ảnh hưởng bởi điều chuyển"
      description={homeBranch.name}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="HLV điều chuyển"
          value={trainer}
          options={TRAINERS}
          onChange={setTrainer}
        />
        <FormInput
          id="affected-effective"
          label="Ngày hiệu lực"
          type="date"
          min={isoDate()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {message && <CardDescription role="status">{message}</CardDescription>}
      <InfoTable headers={["Lịch", "Hội viên", "Thời gian", "HLV", "Xử lý"]}>
        {affected.map((row) => (
          <TableRow key={row.id}>
            <InfoCell>{row.id}</InfoCell>
            <InfoCell>{row.member}</InfoCell>
            <InfoCell>
              {row.time} - {formatDate(row.date)}
            </InfoCell>
            <InfoCell>{row.trainer}</InfoCell>
            <InfoCell>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const first = TRAINERS.find(
                      (name) =>
                        name !== trainer &&
                        !rows.some(
                          (other) =>
                            other.trainer === name &&
                            other.date === row.date &&
                            other.time === row.time &&
                            other.status !== "Hủy",
                        ),
                    );
                    setReplacement(first ?? "");
                    setEditing({ row, action: "replace" });
                  }}
                >
                  Đổi HLV
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="ms-auto justify-end px-0 text-right"
                  onClick={() => setEditing({ row, action: "cancel" })}
                >
                  Hủy lịch
                </Button>
              </div>
            </InfoCell>
          </TableRow>
        ))}
        {!affected.length && (
          <TableRow>
            <InfoCell>Không có lịch cần xử lý.</InfoCell>
            <InfoCell />
            <InfoCell />
            <InfoCell />
            <InfoCell />
          </TableRow>
        )}
      </InfoTable>
      <SketchDialog
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        title={
          editing?.action === "replace"
            ? "Đổi HLV phụ trách"
            : "Hủy lịch do điều chuyển"
        }
        actionLabel="Xác nhận"
        actionDisabled={
          editing?.action === "replace" && !candidates.includes(replacement)
        }
        onAction={() => {
          if (!editing) return;
          setRows((current) =>
            current.map((row) =>
              row.id === editing.row.id
                ? editing.action === "replace"
                  ? { ...row, trainer: replacement }
                  : { ...row, status: "Hủy" }
                : row,
            ),
          );
          setMessage(
            editing.action === "replace"
              ? `Đã chuyển lịch ${editing.row.id} sang ${replacement}.`
              : `Đã hủy lịch ${editing.row.id}, không trừ buổi.`,
          );
          setEditing(null);
        }}
      >
        <CardDescription>
          {editing?.row.id} - {editing?.row.member}.
          {editing?.action === "cancel" && " Hủy lịch không trừ buổi."}
        </CardDescription>
        {editing?.action === "replace" &&
          (candidates.length ? (
            <SelectField
              label="HLV thay thế"
              value={replacement}
              options={candidates}
              onChange={setReplacement}
            />
          ) : (
            <StatusBadge status="Không có HLV trống" />
          ))}
      </SketchDialog>
    </SectionCard>
  );
}
