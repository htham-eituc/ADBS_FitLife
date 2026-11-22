import InvoiceTable from "@/components/shared/invoice-table";
import InvoiceDetails from "@/components/shared/InvoiceDetails";
import { invoices, type Invoice } from "@/data/member";
import { useState } from "react";
import {
  PageHeading,
  InfoTable,
  InfoCell,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import FormSelect from "@/components/shared/FormSelect";
import { Card, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TableRow } from "@/components/ui/table";
import { visits, formatDate } from "@/data/member";
import { INITIAL_EVENTS } from "./schedule/data";
import type { CalendarEvent } from "./schedule/types";

export default function History() {
  const [selected, setSelected] = useState<CalendarEvent | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const reviewing = selected?.extendedProps.status === "Đã hoàn thành";
  return (
    <div className="space-y-6">
      <PageHeading
        title="Lịch sử"
        description="Giao dịch thanh toán, lượt ra vào và các buổi tập PT của bạn."
      />
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Giao dịch</TabsTrigger>
          <TabsTrigger value="visits">Ra vào</TabsTrigger>
          <TabsTrigger value="sessions">Buổi PT</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <InvoiceTable
            title="Lịch sử giao dịch"
            data={invoices.filter((item) => item.status === "Đã thanh toán")}
            onView={setInvoice}
          />
        </TabsContent>
        <TabsContent value="visits">
          <Card>
            <InfoTable
              headers={["Ngày", "Chi nhánh", "Giờ vào", "Giờ ra", "Trạng thái"]}
            >
              {visits.map((visit) => (
                <TableRow key={visit.date}>
                  <InfoCell>{formatDate(visit.date)}</InfoCell>
                  <InfoCell>{visit.branch}</InfoCell>
                  <InfoCell>{visit.start}</InfoCell>
                  <InfoCell>{visit.end}</InfoCell>
                  <InfoCell>
                    <Badge color="gray">Đã check-out</Badge>
                  </InfoCell>
                </TableRow>
              ))}
            </InfoTable>
            <CardDescription>
              Thẻ/QR được quét tại cổng kiểm soát; trang này chỉ hiển thị lịch
              sử.
            </CardDescription>
          </Card>
        </TabsContent>
        <TabsContent value="sessions">
          <Card>
            <InfoTable
              headers={["Buổi tập", "Huấn luyện viên", "Trạng thái", ""]}
            >
              {INITIAL_EVENTS.map((event) => (
                <TableRow key={String(event.id)}>
                  <InfoCell>
                    {event.title}
                    <CardDescription>
                      {typeof event.start === "string" &&
                        new Date(event.start).toLocaleString("vi-VN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                    </CardDescription>
                  </InfoCell>
                  <InfoCell>{event.extendedProps.trainer}</InfoCell>
                  <InfoCell>
                    <Badge
                      color={
                        event.extendedProps.status === "Đã hoàn thành"
                          ? "success"
                          : event.extendedProps.status === "Chờ bạn xác nhận"
                            ? "warning"
                            : "primary"
                      }
                    >
                      {event.extendedProps.status}
                    </Badge>
                  </InfoCell>
                  <InfoCell>
                    {event.extendedProps.status !== "Đã đặt" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelected(event)}
                      >
                        {event.extendedProps.status === "Đã hoàn thành"
                          ? "Đánh giá"
                          : "Xác nhận buổi tập"}
                      </Button>
                    )}
                  </InfoCell>
                </TableRow>
              ))}
            </InfoTable>
          </Card>
        </TabsContent>
      </Tabs>
      <InvoiceDetails selected={invoice} onClose={() => setInvoice(null)} />
      <SketchDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title={reviewing ? "Đánh giá huấn luyện viên" : "Xác nhận buổi tập"}
        actionLabel={reviewing ? "Gửi đánh giá" : "Xác nhận hoàn thành"}
      >
        <CardDescription>
          {selected?.title} – {selected?.extendedProps.trainer}
        </CardDescription>
        {reviewing ? (
          <>
            <FormSelect
              label="Điểm đánh giá"
              options={["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"]}
            />
            <Field>
              <FieldLabel htmlFor="review-comment">Nhận xét</FieldLabel>
              <Textarea
                id="review-comment"
                placeholder="Chia sẻ về buổi tập..."
              />
            </Field>
            <CardDescription>
              Chỉ đánh giá buổi đã hoàn thành, trong 7 ngày và tối đa một lần.
            </CardDescription>
          </>
        ) : (
          <CardDescription>
            HLV đã xác nhận. Bạn xác nhận sau khi hoàn thành buổi tập; chỉ trừ
            buổi khi đủ cả hai xác nhận và lượt check-in hợp lệ.
          </CardDescription>
        )}
      </SketchDialog>
    </div>
  );
}
