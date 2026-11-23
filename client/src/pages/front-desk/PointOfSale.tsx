import { useState } from "react";
import FormSelect from "@/components/shared/FormSelect";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import {
  FormInput,
  SectionCard,
  SelectField,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TableRow } from "@/components/ui/table";
import { XIcon } from "@/icons/x";
import { homeBranch, products, servicePackages } from "@/data/branch";
import { counterInvoices, members } from "@/data/front-desk";
import { formatDate, money } from "@/data/member";

const CATALOG = [
  ...servicePackages
    .filter(
      (item) =>
        item.status === "Đang bán" && homeBranch.services.includes(item.type),
    )
    .map((item) => ({
      key: `${item.id} – ${item.name}`,
      kind: "Gói",
      price: item.price,
    })),
  ...products
    .filter((item) => item.status === "Đang bán")
    .map((item) => ({
      key: `${item.id} – ${item.name}`,
      kind: "Sản phẩm",
      price: item.price,
    })),
];

type Line = (typeof CATALOG)[number] & { quantity: number };

const METHODS = ["Tiền mặt", "Thanh toán mô phỏng"];

export default function PointOfSale() {
  const [method, setMethod] = useState(METHODS[0]);
  const [itemKey, setItemKey] = useState(CATALOG[0].key);
  const [quantity, setQuantity] = useState(1);
  const [lines, setLines] = useState<Line[]>([]);
  const item = CATALOG.find((entry) => entry.key === itemKey) ?? CATALOG[0];

  return (
    <div className="space-y-6">
      <PageHeading
        title="Bán hàng"
        description={`Lập hóa đơn gói dịch vụ và sản phẩm tại ${homeBranch.name}.`}
      />
      <SectionCard
        title="Hóa đơn mới"
        description="Mỗi hóa đơn thuộc một hội viên và có ít nhất một dòng."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormSelect
            label="Hội viên (thẻ/QR hoặc SĐT)"
            options={members.map(
              (row) => `${row.id} – ${row.name} – ${row.phone}`,
            )}
          />
          <SelectField
            label="Hình thức thanh toán"
            value={method}
            options={METHODS}
            onChange={setMethod}
          />
          {method === "Tiền mặt" && (
            <FormInput
              id="pos-cash"
              label="Số tiền nhận"
              type="number"
              min={0}
              step={1000}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_8rem_auto] md:items-end">
          <SelectField
            label="Gói dịch vụ hoặc sản phẩm"
            value={itemKey}
            options={CATALOG.map((entry) => entry.key)}
            onChange={setItemKey}
          />
          <Field>
            <FieldLabel htmlFor="pos-qty">Số lượng</FieldLabel>
            <Input
              id="pos-qty"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </Field>
          <Button
            disabled={quantity < 1}
            onClick={() => {
              setLines((current) => [...current, { ...item, quantity }]);
              setQuantity(1);
            }}
          >
            Thêm dòng
          </Button>
        </div>
        <InfoTable
          headers={["Mặt hàng", "Loại", "Đơn giá", "SL", "Thành tiền", ""]}
        >
          {lines.map((line, index) => (
            <TableRow key={`${line.key}-${index}`}>
              <InfoCell>{line.key}</InfoCell>
              <InfoCell>
                <Badge
                  size="sm"
                  color={line.kind === "Gói" ? "primary" : "gray"}
                >
                  {line.kind}
                </Badge>
              </InfoCell>
              <InfoCell>{money(line.price)}</InfoCell>
              <InfoCell>{line.quantity}</InfoCell>
              <InfoCell>{money(line.price * line.quantity)}</InfoCell>
              <InfoCell>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  aria-label={`Bỏ dòng ${line.key}`}
                  onClick={() =>
                    setLines((current) => current.filter((_, i) => i !== index))
                  }
                >
                  <XIcon className="size-4" />
                </Button>
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardDescription>
            Giảm giá theo hạng, tổng tiền, điểm và tồn kho do hệ thống kiểm tra
            khi lưu hóa đơn.
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled>
              Lưu hóa đơn
            </Button>
            <Button disabled>Thanh toán</Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Hóa đơn tại quầy">
        <InfoTable
          headers={[
            "Hóa đơn",
            "Ngày",
            "Hội viên",
            "Nội dung",
            "Tổng tiền",
            "Hình thức",
            "Trạng thái",
          ]}
        >
          {counterInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <InfoCell>{invoice.id}</InfoCell>
              <InfoCell>
                {invoice.time} {formatDate(invoice.date)}
              </InfoCell>
              <InfoCell>{invoice.member}</InfoCell>
              <InfoCell>{invoice.item}</InfoCell>
              <InfoCell>{money(invoice.amount)}</InfoCell>
              <InfoCell>{invoice.method}</InfoCell>
              <InfoCell>
                <StatusBadge status={invoice.status} />
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>
    </div>
  );
}
