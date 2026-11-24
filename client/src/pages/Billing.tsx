import { useState } from "react";
import { PageHeading } from "@/components/shared/MemberPage";
import InvoiceTable from "@/components/shared/invoice-table";
import InvoiceDetails from "@/components/shared/InvoiceDetails";
import { invoices, type Invoice } from "@/data/member";
export default function Billing() {
  const [selected, setSelected] = useState<Invoice | null>(null);
  return (
    <div className="space-y-6">
      <PageHeading
        title="Hóa đơn"
        description="Theo dõi các giao dịch gần đây và trạng thái thanh toán."
      />
      <InvoiceTable
        title="Hóa đơn gần đây"
        data={invoices}
        onView={setSelected}
      />
      <InvoiceDetails selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
