import type { ReactNode } from "react";
import { CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
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
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        <TableHeader className="border-b border-gray-100">
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                isHeader
                className="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6"
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
export function InfoCell({ children }: { children: ReactNode }) {
  return (
    <TableCell className="px-5 py-4 text-start text-sm text-gray-800 sm:px-6">
      {children}
    </TableCell>
  );
}
