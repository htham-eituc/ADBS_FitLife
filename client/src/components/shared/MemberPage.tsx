import type { ReactNode } from "react";
import { CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  getCenteredColumns,
} from "@/components/ui/table";

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-title-lg font-semibold text-gray-800">{title}</h1>
        <CardDescription>{description}</CardDescription>
      </div>
      {action && (
        <div className="flex flex-wrap items-center gap-3">{action}</div>
      )}
    </div>
  );
}
export function InfoTable({
  headers,
  children,
  centeredColumns = [],
}: {
  headers: string[];
  children: ReactNode;
  centeredColumns?: number[];
}) {
  return (
    <div className="max-w-full overflow-x-auto">
      <Table
        centeredColumns={[...centeredColumns, ...getCenteredColumns(headers)]}
      >
        <TableHeader className="border-b border-gray-100">
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                isHeader
                className="px-5 py-3 text-start text-sm font-semibold text-brand-700 sm:px-6"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">{children}</TableBody>
      </Table>
    </div>
  );
}
export function InfoCell({ children }: { children?: ReactNode }) {
  return (
    <TableCell className="px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400 [&_[data-slot=card-description]]:text-xs">
      {children}
    </TableCell>
  );
}
