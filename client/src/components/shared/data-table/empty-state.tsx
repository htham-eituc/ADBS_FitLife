import { TableCell, TableRow } from "@/components/ui/table";
import { BoxIcon } from "@/icons/box";

export interface EmptyStateProps {
  colSpan?: number;
  title?: string;
  description?: string;
}

export default function EmptyState({
  colSpan = 6,
  title = "Không tìm thấy giao dịch",
  description = "Thử tìm theo mã hóa đơn, nội dung hoặc trạng thái.",
}: EmptyStateProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <BoxIcon className="size-6 text-gray-800 dark:text-white/90" />
          </div>
          <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}
