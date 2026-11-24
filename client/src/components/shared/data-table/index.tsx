// TailAdmin Table Three presentation, shared by member invoices and service plans.
import { Fragment, useState, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  getCenteredColumns,
} from "@/components/ui/table";
import { formatDate } from "@/data/member";
import CardHeader from "./card-header";
import CardFooter from "./card-footer";
import EmptyState from "./empty-state";

const headerClasses = [
  "h-11 min-w-44 py-3 ps-5 text-start text-sm font-semibold text-gray-500 sm:ps-6 dark:text-gray-400",
  "h-11 min-w-44 px-4 py-3 text-start text-sm font-semibold text-gray-500 dark:text-gray-400",
  "h-11 min-w-32 px-4 py-3 text-start text-sm font-semibold text-gray-500 dark:text-gray-400",
  "h-11 min-w-36 px-4 py-3 text-start text-sm font-semibold text-gray-500 dark:text-gray-400",
  "h-11 min-w-28 px-4 py-3 text-start text-sm font-semibold text-gray-500 dark:text-gray-400",
];
const PAGE_SIZE = 7;

type DataTableProps<T extends { id: string }> = {
  title: string;
  data: T[];
  columns: readonly string[];
  getSearchText: (row: T) => string;
  getDate: (row: T) => string;
  renderRow: (row: T) => ReactNode;
  searchLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyDateLabel?: string;
};

export default function DataTable<T extends { id: string }>({
  title,
  data,
  columns,
  getSearchText,
  getDate,
  renderRow,
  searchLabel,
  emptyTitle,
  emptyDescription,
  emptyDateLabel = "Chưa có giao dịch",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const query = searchQuery.trim().toLocaleLowerCase("vi");
  const filtered = data.filter((row) =>
    getSearchText(row).toLocaleLowerCase("vi").includes(query),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const dates = data.map(getDate).sort();
  const dateRange = dates.length
    ? formatDate(dates[0]) + " – " + formatDate(dates[dates.length - 1])
    : emptyDateLabel;
  return (
    <Card className="w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-800 dark:bg-white/3">
      <CardHeader
        title={title}
        dateRange={dateRange}
        searchLabel={searchLabel}
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setPage(1);
        }}
      />
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <Table centeredColumns={getCenteredColumns(columns)}>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column}
                    isHeader
                    className={headerClasses[index]}
                  >
                    {column}
                  </TableCell>
                ))}
                <TableCell
                  isHeader
                  className="h-11 min-w-16 py-3 pe-5 sm:pe-6"
                />
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.length ? (
                rows.map((row) => (
                  <Fragment key={row.id}>{renderRow(row)}</Fragment>
                ))
              ) : (
                <EmptyState
                  colSpan={columns.length + 1}
                  title={emptyTitle}
                  description={emptyDescription}
                />
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}
