import DataTable from "@/components/shared/data-table";
import { formatDate, type Invoice } from "@/data/member";
import InvoiceRow from "./invoice-row";

export default function InvoiceTable({
  title,
  data,
  onView,
}: {
  title: string;
  data: Invoice[];
  onView: (invoice: Invoice) => void;
}) {
  return (
    <DataTable
      title={title}
      data={data}
      columns={["Hóa đơn", "Ngày lập", "Số tiền", "Nội dung", "Trạng thái"]}
      getDate={(invoice) => invoice.date}
      getSearchText={(invoice) =>
        [
          invoice.id,
          invoice.item,
          invoice.status,
          formatDate(invoice.date),
          String(invoice.amount),
        ].join(" ")
      }
      renderRow={(invoice) => <InvoiceRow invoice={invoice} onView={onView} />}
    />
  );
}
