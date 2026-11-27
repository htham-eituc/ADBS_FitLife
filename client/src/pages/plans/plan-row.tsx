import { formatDate } from "@/data/member";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { DumbbellsIcon } from "@/icons/dumbbells";
import { HorizontalDotsIcon } from "@/icons/horizontal-dots";
import type { ServicePlan } from "@/data/member";
interface PlanRowProps {
  plan: ServicePlan;
  onView: (plan: ServicePlan) => void;
}
export default function PlanRow({ plan, onView }: PlanRowProps) {
  return (
    <TableRow className="h-16 border-b border-gray-100">
      <TableCell className="min-w-44 py-3 ps-5 text-start sm:ps-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            <DumbbellsIcon className="size-4" />
          </div>
          <span className="text-sm font-medium whitespace-nowrap text-gray-800">
            {plan.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="min-w-44 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700">
        {plan.service}
      </TableCell>
      <TableCell className="min-w-32 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700">
        {plan.end
          ? `${formatDate(plan.start)} – ${formatDate(plan.end)}`
          : "Không giới hạn"}
      </TableCell>
      <TableCell className="min-w-36 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700">
        {plan.remaining}
      </TableCell>
      <TableCell className="min-w-28 px-4 py-3 text-start text-sm whitespace-nowrap">
        <Badge
          size="sm"
          color={plan.status === "Đã dùng hết" ? "gray" : "success"}
        >
          {plan.status}
        </Badge>
      </TableCell>
      <TableCell className="min-w-16 py-3 pe-5 text-end whitespace-nowrap sm:pe-6">
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={`Xem gói ${plan.id}`}
          onClick={() => onView(plan)}
        >
          <HorizontalDotsIcon className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
