import { useState } from "react";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import { SectionCard, SelectField } from "@/components/shared/StaffPage";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TableRow } from "@/components/ui/table";
import { InboxIcon } from "@/icons/inbox";
import { XIcon } from "@/icons/x";
import {
  homeBranch,
  products,
  receiptTotal,
  stockReceipts,
  type StockReceipt,
} from "@/data/branch";
import { formatDate, isoDate, money } from "@/data/member";

type DraftLine = { product: string; quantity: number; cost: number };
const PRODUCT_NAMES = products
  .filter((item) => item.status === "Đang bán")
  .map((item) => item.name);

export default function StockReceipts() {
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState<StockReceipt | null>(null);
  const [product, setProduct] = useState(PRODUCT_NAMES[0]);
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(0);
  const [lines, setLines] = useState<DraftLine[]>([]);
  const invalid = quantity <= 0 || cost <= 0;

  return (
    <div className="space-y-6">
      <PageHeading
        title="Nhập hàng"
        description={`Phiếu nhập sản phẩm vào kho ${homeBranch.name}.`}
        action={
          <Button onClick={() => setOpen(true)}>
            <InboxIcon className="size-5" />
            Lập phiếu nhập
          </Button>
        }
      />
      <SectionCard
        title="Phiếu nhập gần đây"
        description="Phiếu hợp lệ có hiệu lực ngay khi gửi, không cần quản lý duyệt; tồn kho được cộng theo từng dòng."
      >
        <InfoTable
          headers={[
            "Phiếu",
            "Ngày nhập",
            "Người lập",
            "Số dòng",
            "Giá trị nhập",
            "",
          ]}
        >
          {stockReceipts.map((receipt) => (
            <TableRow key={receipt.id}>
              <InfoCell>{receipt.id}</InfoCell>
              <InfoCell>{formatDate(receipt.date)}</InfoCell>
              <InfoCell>{receipt.staff}</InfoCell>
              <InfoCell>{receipt.lines.length}</InfoCell>
              <InfoCell>{money(receiptTotal(receipt))}</InfoCell>
              <InfoCell>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setViewing(receipt)}
                >
                  Xem
                </Button>
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>

      <SketchDialog
        open={open}
        onOpenChange={setOpen}
        title="Lập phiếu nhập"
        description={`${homeBranch.name} · ${formatDate(isoDate(0))}`}
        actionLabel="Gửi phiếu nhập"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_6rem_8rem]">
          <SelectField
            label="Sản phẩm"
            value={product}
            options={PRODUCT_NAMES}
            onChange={setProduct}
          />
          <Field>
            <FieldLabel htmlFor="receipt-qty">Số lượng</FieldLabel>
            <Input
              id="receipt-qty"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="receipt-cost">Đơn giá nhập</FieldLabel>
            <Input
              id="receipt-cost"
              type="number"
              min={0}
              step={1000}
              value={cost}
              onChange={(event) => setCost(Number(event.target.value))}
            />
          </Field>
        </div>
        <Button
          variant="outline"
          disabled={invalid}
          onClick={() => {
            setLines((current) => [...current, { product, quantity, cost }]);
            setQuantity(1);
            setCost(0);
          }}
        >
          Thêm dòng
        </Button>
        {lines.length > 0 && (
          <InfoTable headers={["Sản phẩm", "SL", "Đơn giá", "Thành tiền", ""]}>
            {lines.map((line, index) => (
              <TableRow key={`${line.product}-${index}`}>
                <InfoCell>{line.product}</InfoCell>
                <InfoCell>{line.quantity}</InfoCell>
                <InfoCell>{money(line.cost)}</InfoCell>
                <InfoCell>{money(line.quantity * line.cost)}</InfoCell>
                <InfoCell>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    aria-label={`Bỏ dòng ${line.product}`}
                    onClick={() =>
                      setLines((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <XIcon className="size-4" />
                  </Button>
                </InfoCell>
              </TableRow>
            ))}
          </InfoTable>
        )}
        <CardDescription>
          {invalid
            ? "Số lượng và đơn giá nhập phải lớn hơn 0."
            : "Mỗi dòng ghi đúng một sản phẩm. Phiếu không ghi nhà cung cấp."}
        </CardDescription>
      </SketchDialog>

      <SketchDialog
        open={!!viewing}
        onOpenChange={(value) => {
          if (!value) setViewing(null);
        }}
        title={viewing ? `Phiếu nhập ${viewing.id}` : "Phiếu nhập"}
      >
        {viewing && (
          <>
            <CardDescription>
              {formatDate(viewing.date)} · {viewing.staff} · {homeBranch.name}
            </CardDescription>
            <InfoTable
              headers={["Sản phẩm", "SL", "Đơn giá nhập", "Thành tiền"]}
            >
              {viewing.lines.map((line) => (
                <TableRow key={line.product}>
                  <InfoCell>{line.product}</InfoCell>
                  <InfoCell>{line.quantity}</InfoCell>
                  <InfoCell>{money(line.cost)}</InfoCell>
                  <InfoCell>{money(line.quantity * line.cost)}</InfoCell>
                </TableRow>
              ))}
            </InfoTable>
            <CardDescription>
              Tổng giá trị:{" "}
              <strong className="text-gray-800">
                {money(receiptTotal(viewing))}
              </strong>
            </CardDescription>
          </>
        )}
      </SketchDialog>
    </div>
  );
}
