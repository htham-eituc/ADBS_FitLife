import { useState } from "react";
import SketchDialog from "@/components/shared/SketchDialog";
import InfoField from "@/components/shared/InfoField";
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
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { XIcon } from "@/icons/x";
import { homeBranch, products, servicePackages } from "@/data/branch";
import { counterInvoices, members, tierDiscount } from "@/data/front-desk";
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
  const [memberId, setMemberId] = useState(members[0].id);
  const [cash, setCash] = useState(0);
  const [result, setResult] = useState<"success" | "failure" | null>(null);
  const [outcome, setOutcome] = useState("Thành công");
  const [paid, setPaid] = useState(false);
  const [saved, setSaved] = useState(false);
  const [method, setMethod] = useState(METHODS[0]);
  const [itemKey, setItemKey] = useState(CATALOG[0].key);
  const [quantity, setQuantity] = useState(1);
  const [lines, setLines] = useState<Line[]>([]);
  const item = CATALOG.find((entry) => entry.key === itemKey) ?? CATALOG[0];

  const customer = members.find((row) => row.id === memberId) ?? members[0];
  const subtotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const discount = Math.round((subtotal * tierDiscount(customer.tier)) / 100);
  const payable = subtotal - discount;
  const canPay =
    lines.length > 0 &&
    !paid &&
    (method !== "Tiền mặt" || (Number.isFinite(cash) && cash >= payable));
  const pay = () => {
    const success = method === "Tiền mặt" || outcome === "Thành công";
    setResult(success ? "success" : "failure");
    setSaved(true);
    if (success) setPaid(true);
  };
  return (
    <div className="space-y-6">
      <PageHeading
        title="Bán hàng"
        description={`Lập hóa đơn gói dịch vụ và sản phẩm tại ${homeBranch.name}.`}
      />
      <SectionCard title="Hóa đơn mới">
        <fieldset disabled={paid} className="contents">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SelectField
              label="Hội viên (thẻ/QR hoặc SĐT)"
              value={memberId}
              options={members.map((row) => row.id)}
              onChange={setMemberId}
            />
            <InfoField
              label="Hội viên"
              value={`${customer.name} - ${customer.phone}`}
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
                value={cash}
                onChange={(event) => setCash(Number(event.target.value))}
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
              disabled={!Number.isInteger(quantity) || quantity < 1}
              onClick={() => {
                setLines((current) => [...current, { ...item, quantity }]);
                setQuantity(1);
              }}
            >
              Thêm
            </Button>
          </div>
          <div className="max-w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <Table centeredColumns={[2, 3, 4]}>
              <TableHeader className="border-b border-brand-200">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start whitespace-nowrap"
                  >
                    Mặt hàng
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start whitespace-nowrap"
                  >
                    Loại
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-right whitespace-nowrap"
                  >
                    Đơn giá
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-center whitespace-nowrap"
                  >
                    Số lượng
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-right whitespace-nowrap"
                  >
                    Thành tiền
                  </TableCell>
                  <TableCell
                    isHeader
                    aria-label="Thao tác"
                    className="w-12 px-4 py-3"
                  />
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {lines.length ? (
                  lines.map((line, index) => (
                    <TableRow key={`${line.key}-${index}`}>
                      <TableCell className="px-4 py-3 text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
                        {line.key}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm">
                        <Badge
                          size="sm"
                          color={line.kind === "Gói" ? "primary" : "gray"}
                        >
                          {line.kind}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right text-sm whitespace-nowrap tabular-nums">
                        {money(line.price)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-center text-sm tabular-nums">
                        {line.quantity}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right text-sm whitespace-nowrap tabular-nums">
                        {money(line.price * line.quantity)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          aria-label={`Bỏ dòng ${line.key}`}
                          onClick={() =>
                            setLines((current) =>
                              current.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <XIcon className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      Chưa có mặt hàng. Chọn gói hoặc sản phẩm để thêm vào hóa
                      đơn.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className="border-t border-gray-200 bg-gray-50 text-sm dark:border-gray-800 dark:bg-white/3">
                {[
                  { label: "Tổng tiền hàng", value: money(subtotal) },
                  {
                    label: `Ưu đãi ${customer.tier} (${tierDiscount(customer.tier)}%)`,
                    value: money(discount),
                  },
                  { label: "Thực trả", value: money(payable) },
                  {
                    label: method === "Tiền mặt" ? "Tiền thừa" : "Điểm dự kiến",
                    value:
                      method === "Tiền mặt"
                        ? money(Math.max(0, cash - payable))
                        : `${Math.floor(payable / 100000)} điểm`,
                  },
                ].map((row) => (
                  <TableRow
                    key={row.label}
                    className={
                      row.label === "Thực trả"
                        ? "border-y border-brand-200 bg-brand-50 dark:border-brand-500/30 dark:bg-brand-500/15"
                        : undefined
                    }
                  >
                    <TableCell
                      colSpan={4}
                      className="px-4 py-3 text-right font-semibold whitespace-nowrap text-gray-700 dark:text-gray-300"
                    >
                      {row.label}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center font-semibold whitespace-nowrap text-brand-600 tabular-nums dark:text-brand-400">
                      {row.value}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                ))}
              </TableFooter>
            </Table>
          </div>
          {method === "Thanh toán mô phỏng" && (
            <SelectField
              label="Kết quả mô phỏng"
              value={outcome}
              options={["Thành công", "Thất bại"]}
              onChange={setOutcome}
            />
          )}
        </fieldset>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={paid ? "Đã thanh toán" : "Chờ thanh toán"} />
          {method === "Tiền mặt" && cash < payable && !paid && (
            <CardDescription role="status">
              Số tiền nhận chưa đủ để thanh toán.
            </CardDescription>
          )}
          <div className="flex flex-wrap gap-2">
            {paid ? (
              <Button
                variant="outline"
                onClick={() => {
                  setLines([]);
                  setCash(0);
                  setPaid(false);
                  setSaved(false);
                }}
              >
                Hóa đơn mới
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  disabled={!lines.length}
                  onClick={() => setSaved(true)}
                >
                  {saved ? "Đã lưu bản nháp" : "Lưu hóa đơn"}
                </Button>
                <Button disabled={!canPay} onClick={pay}>
                  Thanh toán
                </Button>
              </>
            )}
          </div>
        </div>
      </SectionCard>

      <SketchDialog
        open={!!result}
        onOpenChange={(open) => {
          if (!open) setResult(null);
        }}
        title={
          result === "success"
            ? "Thanh toán thành công"
            : "Thanh toán chưa thành công"
        }
        actionLabel={result === "failure" ? "Thử lại" : undefined}
        onAction={result === "failure" ? pay : undefined}
      >
        <Badge color={result === "success" ? "success" : "error"}>
          {result === "success" ? "Đã thanh toán" : "Chờ thanh toán"}
        </Badge>
        <InfoField label="Hội viên" value={customer.name} />
        <InfoField label="Số tiền" value={money(payable)} />
        <InfoField label="Hình thức" value={method} />
        {result === "success" ? (
          <CardDescription>
            Điểm dự kiến: {Math.floor(payable / 100000)}.
          </CardDescription>
        ) : (
          <>
            <CardDescription>
              Hóa đơn vẫn chờ thanh toán. Bạn có thể thử lại hoặc chuyển sang
              tiền mặt.
            </CardDescription>
            <SelectField
              label="Kết quả thử lại"
              value={outcome}
              options={["Thành công", "Thất bại"]}
              onChange={setOutcome}
            />
          </>
        )}
      </SketchDialog>
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
