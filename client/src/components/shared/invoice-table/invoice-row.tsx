import { formatDate, money } from "@/data/member";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PageIcon } from "@/icons/page";
import { HorizontalDotsIcon } from "@/icons/horizontal-dots";
import type { Invoice } from "@/data/member";
interface InvoiceRowProps {
  invoice: Invoice;
  onView: (invoice: Invoice) => void;
}
export default function InvoiceRow({ invoice, onView }: InvoiceRowProps) {
  return (
    <TableRow className="h-16 border-b border-gray-100 dark:border-gray-800">
      <TableCell className="min-w-44 py-3 ps-5 text-start sm:ps-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <PageIcon className="size-4" />
          </div>
          <span className="text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
            {invoice.id}
          </span>
        </div>
      </TableCell>
      <TableCell className="min-w-44 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
        {formatDate(invoice.date)}
      </TableCell>
      <TableCell className="min-w-32 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
        {money(invoice.amount)}
      </TableCell>
      <TableCell className="min-w-36 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
        {invoice.item}
      </TableCell>
      <TableCell className="min-w-28 px-4 py-3 text-start text-sm whitespace-nowrap">
        <Badge
          size="sm"
          color={
            invoice.status === "Đã thanh toán"
              ? "success"
              : invoice.status === "Chờ thanh toán"
                ? "warning"
                : "error"
          }
        >
          {invoice.status}
        </Badge>
      </TableCell>
      <TableCell className="min-w-16 py-3 pe-5 text-end whitespace-nowrap sm:pe-6">
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={`Xem hóa đơn ${invoice.id}`}
          onClick={() => onView(invoice)}
        >
          <HorizontalDotsIcon className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
