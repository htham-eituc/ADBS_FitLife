import { Toast } from "@base-ui/react/toast";
import ProductCatalog, { type CatalogProduct } from "./orders/ProductCatalog";
import { productVisuals } from "@/data/product-visuals";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BoxIcon } from "@/icons/box";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useMemberOrders, type CartLine, type Order } from "@/data/member-orders";
import DataTable from "@/components/shared/data-table";
import EmptyState from "@/components/shared/data-table/empty-state";
import InfoField from "@/components/shared/InfoField";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import {
  FormInput,
  SectionCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CartIcon } from "@/icons/cart";
import { XIcon } from "@/icons/x";
import { homeBranch, products, servicePackages } from "@/data/branch";
import { tierDiscount } from "@/data/front-desk";
import { formatDate, isoDate, member, money } from "@/data/member";

export default function Orders() {
  const { cart, setCart, orders, setOrders, count } = useMemberOrders();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const tab = requestedTab === "cart" || requestedTab === "orders"
    ? requestedTab
    : "products";
  const setTab = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === "products") nextParams.delete("tab");
    else nextParams.set("tab", value);
    setSearchParams(nextParams);
  };
  const [receiver, setReceiver] = useState(member.name);
  const [phone, setPhone] = useState(member.phone);
  const [note, setNote] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);
  const [cancelling, setCancelling] = useState<Order | null>(null);
  const toast = Toast.useToastManager();
  const notify = (description: string) => {
    toast.add({ title: "Đặt hàng", description });
  };
  const reserved = (id: string) =>
    orders
      .filter((order) => order.status !== "Hủy")
      .reduce(
        (sum, order) =>
          sum +
          order.lines
            .filter((line) => line.productId === id)
            .reduce((count, line) => count + line.quantity, 0),
        0,
      );
  const catalog: CatalogProduct[] = [
    ...servicePackages
      .filter((plan) => plan.status === "Đang bán")
      .map((plan) => ({
        id: plan.id,
        name: plan.name,
        type: "Gói dịch vụ",
        price: plan.price,
        image: plan.image,
        duration: plan.sessions ? `${plan.sessions} buổi` : `${plan.months} tháng`,
      })),
    ...products
      .filter((product) => product.status === "Đang bán")
      .map((product) => ({
        ...product,
        stock: product.stock - reserved(product.id),
      })),
  ];
  const quantityInCart = (id: string) =>
    cart.find((line) => line.productId === id)?.quantity ?? 0;
  const validQuantity = (line: CartLine) => {
    const product = catalog.find((item) => item.id === line.productId);
    return !!product && Number.isInteger(line.quantity) && line.quantity > 0 &&
      (product.stock === undefined || line.quantity <= product.stock);
  };
  const invalidCart = cart.some((line) => !validQuantity(line));
  const subtotal = cart.reduce(
    (sum, line) => sum + (validQuantity(line) ? line.price * line.quantity : 0),
    0,
  );
  const discount = Math.round((subtotal * tierDiscount(member.tier)) / 100);
  const total = subtotal - discount;
  const canOrder =
    cart.length > 0 && !invalidCart && !!receiver.trim() && !!phone.trim();

  const canAddProduct = (product: CatalogProduct) =>
    (product.stock === undefined || quantityInCart(product.id) < product.stock) &&
    !invalidCart;
  const getAvailableQuantity = (product: CatalogProduct) =>
    product.stock === undefined
      ? Number.POSITIVE_INFINITY
      : Math.max(0, product.stock - quantityInCart(product.id));
  const addProduct = (product: CatalogProduct, quantity: number) => {
    if (
      !canAddProduct(product) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > getAvailableQuantity(product)
    )
      return;
    setCart((current) =>
      current.some((line) => line.productId === product.id)
        ? current.map((line) =>
            line.productId === product.id
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          )
        : [
            ...current,
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity,
            },
          ],
    );
    notify(`Đã thêm ${quantity} ${product.name} vào giỏ hàng.`);
  };

  const placeOrder = () => {
    if (!canOrder) return;
    const order: Order = {
      id: `DH${String(orders.length + 1).padStart(4, "0")}`,
      date: isoDate(),
      branch: homeBranch.name,
      receiver: receiver.trim(),
      phone: phone.trim(),
      note: note.trim(),
      lines: cart.map((line) => ({ ...line })),
      subtotal,
      discount,
      total,
      status: "Chờ xác nhận",
    };
    setOrders((current) => [order, ...current]);
    setCart([]);
    setNote("");
    setConfirmOpen(false);
    setTab("orders");
    notify(
      `Đã tạo đơn ${order.id}. Nhận hàng và thanh toán tại ${order.branch}.`,
    );
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Đặt hàng"
        description="Chọn sản phẩm và nhận hàng tại chi nhánh."
        action={
          <Button variant="outline" onClick={() => setTab("cart")}>
            <CartIcon />
            Giỏ hàng ({count})
          </Button>
        }
      />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="max-w-full overflow-x-auto">
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          <TabsTrigger value="cart">Giỏ hàng</TabsTrigger>
          <TabsTrigger value="orders">Đơn đã đặt</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductCatalog
            products={catalog}
            discountPercent={tierDiscount(member.tier)}
            tier={member.tier}
            canAdd={canAddProduct}
            getAvailableQuantity={getAvailableQuantity}
            onAdd={addProduct}
          />
        </TabsContent>
        <TabsContent value="cart">
          <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-4">
              <SectionCard
                title="Giỏ hàng"
                action={
                  <Badge size="sm" color="primary">
                    {count} sản phẩm
                  </Badge>
                }
              >
                <InfoTable
                  headers={[
                    "Sản phẩm",
                    "Đơn giá",
                    "Số lượng",
                    "Thành tiền",
                    "",
                  ]}
                >
                  {cart.length ? (
                    cart.map((line) => (
                      <TableRow key={line.productId}>
                        <InfoCell>
                          <div className="flex items-center gap-3">
                            <Avatar size="lg" className="rounded-lg">
                              <AvatarImage
                                src={catalog.find((product) => product.id === line.productId)?.image || productVisuals[line.productId]?.image}
                                alt={line.name}
                                className="rounded-lg object-contain"
                              />
                              <AvatarFallback>
                                <BoxIcon />
                              </AvatarFallback>
                            </Avatar>
                            <span>{line.name}</span>
                          </div>
                        </InfoCell>
                        <InfoCell>{money(line.price)}</InfoCell>
                        <InfoCell>
                          <Input
                            type="number"
                            min={1}
                            max={
                              catalog.find(
                                (product) => product.id === line.productId,
                              )?.stock
                            }
                            step={1}
                            value={line.quantity}
                            aria-label={`Số lượng ${line.name}`}
                            aria-invalid={!validQuantity(line)}
                            className="mx-auto w-24 text-center"
                            onChange={(event) =>
                              setCart((current) =>
                                current.map((row) =>
                                  row.productId === line.productId
                                    ? {
                                        ...row,
                                        quantity: Number(event.target.value),
                                      }
                                    : row,
                                ),
                              )
                            }
                          />
                        </InfoCell>
                        <InfoCell>
                          {validQuantity(line)
                            ? money(line.price * line.quantity)
                            : "-"}
                        </InfoCell>
                        <InfoCell>
                          <Button
                            size="icon-xs"
                            variant="ghost"
                            aria-label={`Bỏ ${line.name}`}
                            onClick={() => {
                              setCart((current) =>
                                current.filter(
                                  (row) => row.productId !== line.productId,
                                ),
                              );
                            }}
                          >
                            <XIcon />
                          </Button>
                        </InfoCell>
                      </TableRow>
                    ))
                  ) : (
                    <EmptyState
                      colSpan={5}
                      title="Giỏ hàng đang trống"
                      description="Chọn sản phẩm để bắt đầu đặt hàng."
                    />
                  )}
                </InfoTable>
                {invalidCart && (
                  <CardDescription role="alert">
                    Số lượng phải là số nguyên từ 1 đến số tồn kho hiện có.
                  </CardDescription>
                )}
              </SectionCard>
              {cart.length > 0 && (
                <SectionCard title="Thông tin nhận hàng">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                      id="order-receiver"
                      label="Người nhận"
                      value={receiver}
                      required
                      onChange={(event) => setReceiver(event.target.value)}
                    />
                    <FormInput
                      id="order-phone"
                      label="Số điện thoại"
                      type="tel"
                      value={phone}
                      required
                      onChange={(event) => setPhone(event.target.value)}
                    />
                    <InfoField
                      label="Chi nhánh nhận hàng"
                      value={homeBranch.name}
                    />
                  </div>
                  <Field>
                    <FieldLabel htmlFor="order-note">
                      Ghi chú (không bắt buộc)
                    </FieldLabel>
                    <Textarea
                      id="order-note"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </Field>
                </SectionCard>
              )}
            </div>
            <SectionCard
              title="Tổng đơn hàng"
              titleClassName="font-bold text-brand-700"
              className="border-brand-200 bg-brand-50"
              action={
                <Badge size="sm" color="primary">
                  {count} sản phẩm
                </Badge>
              }
            >
              <div className="space-y-4">
                <InfoField label="Tổng tiền hàng" value={money(subtotal)} />
                <InfoField
                  label={`Ưu đãi ${member.tier} (${tierDiscount(member.tier)}%)`}
                  value={money(discount)}
                />
                <InfoField
                  label="Dự kiến thanh toán"
                  value={
                    <span className="font-heading text-3xl font-bold text-brand-600 tabular-nums">
                      {money(total)}
                    </span>
                  }
                />
              </div>
              <Separator />
              <InfoField label="Thanh toán" value="Tại quầy khi nhận hàng" />
              <div className="flex flex-col gap-3">
                <Button variant="outline" onClick={() => setTab("products")}>
                  Tiếp tục chọn sản phẩm
                </Button>
                <Button
                  disabled={!canOrder}
                  onClick={() => setConfirmOpen(true)}
                >
                  Đặt hàng
                </Button>
              </div>
            </SectionCard>
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <DataTable
            title="Đơn hàng của bạn"
            data={orders}
            columns={[
              "Đơn hàng",
              "Ngày đặt",
              "Số lượng",
              "Tổng tiền",
              "Trạng thái",
            ]}
            getDate={(order) => order.date}
            getSearchText={(order) =>
              [
                order.id,
                order.status,
                ...order.lines.map((line) => line.name),
              ].join(" ")
            }
            searchLabel="Tìm đơn hàng"
            emptyDateLabel="Chưa có đơn hàng"
            emptyTitle="Chưa có đơn hàng"
            emptyDescription="Đơn hàng sẽ xuất hiện sau khi bạn xác nhận đặt hàng."
            renderRow={(order) => (
              <TableRow>
                <InfoCell>
                  <span className="font-medium">{order.id}</span>
                </InfoCell>
                <InfoCell>{formatDate(order.date)}</InfoCell>
                <InfoCell>
                  {order.lines.reduce((sum, line) => sum + line.quantity, 0)}
                </InfoCell>
                <InfoCell>{money(order.total)}</InfoCell>
                <InfoCell>
                  <StatusBadge status={order.status} />
                </InfoCell>
                <InfoCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelected(order)}
                  >
                    Xem
                  </Button>
                </InfoCell>
              </TableRow>
            )}
          />
        </TabsContent>
      </Tabs>
      <SketchDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Xác nhận đặt hàng"
        actionLabel="Xác nhận đặt hàng"
        actionDisabled={!canOrder}
        onAction={placeOrder}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoField label="Người nhận" value={receiver} />
          <InfoField label="Số điện thoại" value={phone} />
          <InfoField label="Nhận tại" value={homeBranch.name} />
          <InfoField label="Số lượng" value={`${count} sản phẩm`} />
        </div>
        <InfoField
          label="Dự kiến thanh toán tại quầy"
          value={
            <span className="font-semibold text-brand-600">{money(total)}</span>
          }
        />
      </SketchDialog>
      <SketchDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title={selected ? `Đơn hàng ${selected.id}` : "Chi tiết đơn hàng"}
        actionLabel={
          selected?.status === "Chờ xác nhận" ? "Hủy đơn" : undefined
        }
        onAction={() => {
          setCancelling(selected);
          setSelected(null);
        }}
      >
        {selected && (
          <>
            <StatusBadge status={selected.status} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoField label="Người nhận" value={selected.receiver} />
              <InfoField label="Số điện thoại" value={selected.phone} />
              <InfoField label="Chi nhánh nhận hàng" value={selected.branch} />
              <InfoField label="Ngày đặt" value={formatDate(selected.date)} />
            </div>
            <InfoTable headers={["Sản phẩm", "Số lượng", "Thành tiền"]}>
              {selected.lines.map((line) => (
                <TableRow key={line.productId}>
                  <InfoCell>{line.name}</InfoCell>
                  <InfoCell>{line.quantity}</InfoCell>
                  <InfoCell>{money(line.price * line.quantity)}</InfoCell>
                </TableRow>
              ))}
            </InfoTable>
            <InfoField label="Ưu đãi" value={money(selected.discount)} />
            <InfoField
              label="Dự kiến thanh toán tại quầy"
              value={
                <span className="font-semibold text-brand-600">
                  {money(selected.total)}
                </span>
              }
            />
            {selected.note && (
              <InfoField label="Ghi chú" value={selected.note} />
            )}
          </>
        )}
      </SketchDialog>
      <SketchDialog
        open={!!cancelling}
        onOpenChange={(open) => {
          if (!open) setCancelling(null);
        }}
        title="Hủy đơn hàng"
        actionLabel="Xác nhận hủy đơn"
        onAction={() => {
          if (!cancelling) return;
          setOrders((current) =>
            current.map((order) =>
              order.id === cancelling.id ? { ...order, status: "Hủy" } : order,
            ),
          );
          notify(`Đã hủy đơn ${cancelling.id}.`);
          setCancelling(null);
        }}
      >
        <CardDescription>Hủy đơn {cancelling?.id}?</CardDescription>
      </SketchDialog>
    </div>
  );
}
