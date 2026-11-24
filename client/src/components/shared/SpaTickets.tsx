import { useState } from "react";
import { SectionCard, StatusBadge } from "./StaffPage";
import { InfoTable, InfoCell } from "./MemberPage";
import SketchDialog from "./SketchDialog";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { type ServicePlan } from "@/data/member";

export default function SpaTickets({
  tickets: allTickets,
  onUse,
}: {
  tickets: ServicePlan[];
  onUse: (id: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const tickets = allTickets.filter((plan) => plan.service === "Spa/Sauna");
  return (
    <SectionCard
      title="Vé Spa của bạn"
      className="[&_tr>:nth-child(2)]:text-center [&_tr>:nth-child(3)]:text-center"
    >
      {message && <CardDescription role="status">{message}</CardDescription>}
      <InfoTable headers={["Vé", "Số lượt còn lại", "Trạng thái", ""]}>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <InfoCell>
              {ticket.name} - {ticket.id}
            </InfoCell>
            <InfoCell>
              {ticket.status === "Đã dùng hết" ? "0 lượt" : ticket.remaining}
            </InfoCell>
            <InfoCell>
              <StatusBadge
                status={
                  ticket.status === "Đã dùng hết" ? "Đã dùng hết" : "Còn lượt"
                }
              />
            </InfoCell>
            <InfoCell>
              <Button
                size="sm"
                variant="outline"
                disabled={ticket.status === "Đã dùng hết"}
                onClick={() => setSelected(ticket.id)}
              >
                Sử dụng
              </Button>
            </InfoCell>
          </TableRow>
        ))}
      </InfoTable>
      <SketchDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title="Xác nhận sử dụng vé Spa"
        actionLabel="Xác nhận sử dụng"
        onAction={() => {
          if (selected) {
            onUse(selected);
            setMessage(`Đã ghi nhận dùng vé ${selected}. Vé còn 0 lượt.`);
          }
          setSelected(null);
        }}
      >
        <CardDescription>
          Vé {selected} sẽ được trừ 1 lượt sau khi xác nhận.
        </CardDescription>
      </SketchDialog>
    </SectionCard>
  );
}
