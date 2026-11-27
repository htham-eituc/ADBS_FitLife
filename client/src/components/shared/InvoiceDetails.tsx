// Adapted to the official TailAdmin Single Invoice demo layout using existing UI primitives.
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { member, money, formatDate, type Invoice } from "@/data/member";

export default function InvoiceDetails({
  selected,
  onClose,
}: {
  selected: Invoice | null;
  onClose: () => void;
}) {
  const paid = selected?.status === "Đã thanh toán";
  return (
    <Dialog
      open={!!selected}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-4xl">
        <DialogHeader className="flex-row flex-wrap items-center justify-between gap-3 pe-8">
          <DialogTitle>Hóa đơn {selected?.id}</DialogTitle>
          {selected && (
            <Badge color={paid ? "success" : "warning"}>
              {selected.status}
            </Badge>
          )}
        </DialogHeader>
        <Separator />
        {selected && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <CardHeader>
                <CardDescription>Bên lập hóa đơn</CardDescription>
                <CardTitle className="font-semibold">FitLife</CardTitle>
                <CardDescription>{member.branch}</CardDescription>
                <CardDescription>
                  Ngày lập:{" "}
                  <span className="font-medium text-gray-800">
                    {formatDate(selected.date)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardHeader className="sm:items-end sm:text-end">
                <CardDescription>Hội viên</CardDescription>
                <CardTitle className="font-semibold">{member.name}</CardTitle>
                <CardDescription>{member.id}</CardDescription>
                <CardDescription>{member.email}</CardDescription>
              </CardHeader>
            </div>
            <div className="max-w-full overflow-x-auto rounded-xl border border-gray-200">
              <Table centeredColumns={[0, 2, 3]}>
                <TableHeader className="border-b border-gray-100 bg-gray-50">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                    >
                      STT
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                    >
                      Dịch vụ
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-center text-xs font-medium text-gray-500"
                    >
                      Số lượng
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-end text-xs font-medium text-gray-500"
                    >
                      Thành tiền
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="px-5 py-4 text-sm text-gray-500">
                      1
                    </TableCell>
                    <TableCell className="min-w-44 px-5 py-4 text-sm font-medium text-gray-800">
                      {selected.item}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-sm text-gray-700">
                      1
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end text-sm whitespace-nowrap text-gray-700">
                      {money(selected.amount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <CardHeader className="items-end text-end">
              <CardDescription>
                {paid ? "Tổng thực trả" : "Tổng cần thanh toán"}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold text-brand-600">
                {money(selected.amount)}
              </CardTitle>
            </CardHeader>
            <Separator />
          </>
        )}
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Đóng</DialogClose>
          <Button disabled>In hóa đơn</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
