import ProductRating from "@/components/shared/ProductRating";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { BoxIcon } from "@/icons/box";
import { HeartIcon } from "@/icons/heart";
import { DumbbellsIcon } from "@/icons/dumbbells";
import { StarIcon } from "@/icons/star";
import { MenuTwoIcon } from "@/icons/menu-two";
import type { ComponentType } from "react";
import type { IconProps } from "@/icons/types";
import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  SectionCard,
  SelectField,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CartIcon } from "@/icons/cart";
import { SearchIcon } from "@/icons/search";
import { homeBranch } from "@/data/branch";
import { money } from "@/data/member";
import { productVisuals } from "@/data/product-visuals";
import { cn } from "@/utils";

export type CatalogProduct = {
  id: string;
  name: string;
  type: string;
  price: number;
  stock?: number;
  image?: string;
  duration?: string;
};
function CatalogImage({ product, className }: { product: CatalogProduct; className: string }) {
  const image = product.image || productVisuals[product.id]?.image;
  const Icon = product.type === "Gói dịch vụ" ? DumbbellsIcon : BoxIcon;
  return image ? (
    <img src={image} alt={product.name} width={320} height={320} loading="lazy" className={cn(className, product.type === "Gói dịch vụ" && "object-cover object-center")} />
  ) : (
    <div className={`${className} flex flex-col items-center justify-center gap-3 bg-gray-100 p-3 text-black`}>
      <Icon aria-hidden="true" className="size-8" />
      <span className="whitespace-normal text-center text-sm font-medium">{product.name}</span>
    </div>
  );
}
const CATEGORY_ICONS: Record<string, ComponentType<IconProps>> = {
  "Tất cả": MenuTwoIcon,
  "Gói dịch vụ": DumbbellsIcon,
  "Đồ uống": BoxIcon,
  "Thực phẩm bổ sung": HeartIcon,
  "Phụ kiện": DumbbellsIcon,
  "Đồ ăn nhẹ": StarIcon,
};
const SORT_OPTIONS = ["Mặc định", "Giá tăng dần", "Giá giảm dần", "Tên A-Z"];
export default function ProductCatalog({
  products,
  discountPercent,
  tier,
  canAdd,
  getAvailableQuantity,
  onAdd,
}: {
  products: CatalogProduct[];
  discountPercent: number;
  tier: string;
  canAdd: (product: CatalogProduct) => boolean;
  getAvailableQuantity: (product: CatalogProduct) => number;
  onAdd: (product: CatalogProduct, quantity: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const category = requestedCategory === "services"
    ? "Gói dịch vụ"
    : requestedCategory && products.some((product) => product.type === requestedCategory)
      ? requestedCategory
      : "Tất cả";
  const setCategory = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === "Tất cả") nextParams.delete("category");
    else nextParams.set("category", value === "Gói dịch vụ" ? "services" : value);
    setSearchParams(nextParams);
  };
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const selected = products.find((product) => product.id === selectedId);
  const available = selected ? getAvailableQuantity(selected) : 0;
  const validQuantity =
    Number.isInteger(quantity) && quantity > 0 && quantity <= available;
  const selectProduct = (product: CatalogProduct) => {
    setQuantity(1);
    setSelectedId(product.id);
  };
  const categories = [
    "Tất cả",
    ...new Set(products.map((product) => product.type)),
  ];
  const search = query.trim().toLocaleLowerCase("vi");
  const visible = products
    .filter(
      (product) =>
        (category === "Tất cả" || product.type === category) &&
        [product.id, product.name, product.type]
          .join(" ")
          .toLocaleLowerCase("vi")
          .includes(search),
    )
    .sort((a, b) =>
      sort === "Giá tăng dần"
        ? a.price - b.price
        : sort === "Giá giảm dần"
          ? b.price - a.price
          : sort === "Tên A-Z"
            ? a.name.localeCompare(b.name, "vi")
            : 0,
    );
  return (
    <div className="grid items-start gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <SectionCard title="Danh mục" titleClassName="font-bold">
          <nav aria-label="Danh mục sản phẩm" className="flex flex-col gap-2">
            {categories.map((item) => {
              const Icon = CATEGORY_ICONS[item] ?? BoxIcon;
              return (
                <Button
                  key={item}
                  variant={category === item ? "default" : "ghost"}
                  className="h-auto min-h-10 justify-start whitespace-normal text-left"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  <Icon aria-hidden="true" />
                  <span className="min-w-0">{item}</span>
                </Button>
              );
            })}
          </nav>
        </SectionCard>
      </aside>
      <div className="min-w-0 space-y-4">
        <SectionCard
          title="Cửa hàng FitLife"
          titleClassName="font-bold"
          action={
            <Badge size="sm" color="primary">
              {homeBranch.name}
            </Badge>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2 lg:col-span-1">
              <FieldLabel htmlFor="product-search">Tìm sản phẩm</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="product-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm sản phẩm theo mã, tên hoặc loại"
                />
              </InputGroup>
            </Field>
            <div className="lg:hidden">
              <SelectField
                label="Danh mục"
                value={category}
                options={categories}
                onChange={setCategory}
              />
            </div>
            <SelectField
              label="Sắp xếp"
              value={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
            />
          </div>
        </SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardDescription>{visible.length} sản phẩm</CardDescription>
          <Badge size="sm" color="gray">
            Nhận tại chi nhánh
          </Badge>
        </div>
        {visible.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
            {visible.map((product) => (
              <Card
                key={product.id}
                className="gap-0 overflow-hidden rounded-none border-0 p-0 sm:p-0"
              >
                <Button
                  variant="ghost"
                  className="group h-auto w-full overflow-hidden rounded-[13px] bg-[#F0EEED] p-0 hover:bg-[#F0EEED] lg:rounded-[20px]"
                  aria-label={`Xem chi tiết ${product.name}`}
                  onClick={() => selectProduct(product)}
                >
                  <CatalogImage product={product} className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-110" />
                </Button>
                <CardHeader className="px-0 pt-3 pb-2">
                  <CardTitle className="line-clamp-2 text-base font-bold xl:text-xl">
                    {product.name}
                  </CardTitle>
                  <ProductRating productId={product.id} />
                </CardHeader>
                <CardContent className="space-y-2 px-0 pb-3">
                  <CardTitle className="text-xl font-bold text-black tabular-nums sm:text-2xl">
                    {money(
                      product.price -
                        Math.round((product.price * discountPercent) / 100),
                    )}
                  </CardTitle>
                  {discountPercent > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge size="sm" color="error">
                        -{discountPercent}%
                      </Badge>
                      <CardDescription className="text-xs line-through">
                        {money(product.price)}
                      </CardDescription>
                    </div>
                  )}
                  <CardDescription className="text-xs">
                    Giá hội viên {tier}
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge
                      status={product.stock === undefined ? "Đang bán" : product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                    />
                    <CardDescription className="text-xs">
                      {product.stock === undefined ? product.duration : `Còn ${product.stock}`}
                    </CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto justify-between gap-2 p-3">
                  <CardDescription className="text-xs">
                    Nhận tại chi nhánh
                  </CardDescription>
                  <Button
                    size="icon-sm"
                    variant="outline"
                    aria-label={`Thêm ${product.name}`}
                    disabled={!canAdd(product)}
                    onClick={() => selectProduct(product)}
                  >
                    <CartIcon />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <SectionCard
            title="Không tìm thấy sản phẩm"
            description="Thử tên sản phẩm hoặc danh mục khác."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategory("Tất cả");
                }}
              >
                Xóa bộ lọc
              </Button>
            }
          >
            <CardDescription role="status">
              Không có sản phẩm phù hợp.
            </CardDescription>
          </SectionCard>
        )}
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        <DialogContent
          className="max-h-[calc(100dvh-2rem)] overflow-y-auto"
        >
          {selected && (
            <>
              <DialogHeader className="flex-row items-center gap-4 pr-8">
                <CatalogImage product={selected} className="size-24 shrink-0 rounded-lg border border-gray-200 object-contain sm:size-28" />
                <div className="min-w-0 space-y-2">
                  <DialogTitle className="text-base">{selected.name}</DialogTitle>
                  <CardTitle className="mb-0 text-2xl font-bold text-brand-600">
                    {money(
                      selected.price -
                        Math.round((selected.price * discountPercent) / 100),
                    )}
                  </CardTitle>
                  {discountPercent > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <CardDescription className="text-xs line-through">
                        {money(selected.price)}
                      </CardDescription>
                      <Badge color="primary" size="sm">
                        -{discountPercent}%
                      </Badge>
                    </div>
                  )}
                  <ProductRating productId={selected.id} />
                  <CardDescription>{selected.stock === undefined ? selected.duration : `Kho: ${selected.stock}`}</CardDescription>
                </div>
              </DialogHeader>
              <Separator />
              <div className="flex items-center gap-2">
                <CartIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-brand-500"
                />
                <CardDescription>Nhận tại {homeBranch.name}</CardDescription>
              </div>
              <Separator />
              <Field className="flex-row flex-wrap items-center justify-between gap-3">
                <FieldLabel htmlFor="product-quantity">Số lượng</FieldLabel>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Giảm số lượng"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input
                    id="product-quantity"
                    type="number"
                    min={1}
                    max={Number.isFinite(available) ? available : undefined}
                    step={1}
                    value={quantity}
                    aria-invalid={!validQuantity}
                    className="w-20 text-center"
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                  />
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Tăng số lượng"
                    disabled={quantity >= available}
                    onClick={() =>
                      setQuantity(
                        Math.min(available, Math.max(1, quantity + 1)),
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </Field>
              {!validQuantity && (
                <CardDescription role="alert">
                  {Number.isFinite(available) ? `Chọn số lượng nguyên từ 1 đến ${available}.` : "Chọn số lượng nguyên lớn hơn 0."}
                </CardDescription>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardDescription>Thành tiền sau ưu đãi {tier}</CardDescription>
                <CardTitle className="mb-0 text-xl font-bold text-brand-600">
                  {validQuantity
                    ? money(
                        selected.price * quantity -
                          Math.round(
                            (selected.price * quantity * discountPercent) / 100,
                          ),
                      )
                    : "-"}
                </CardTitle>
              </div>
              <Separator />
              <DialogFooter className="m-0 p-0">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!canAdd(selected) || !validQuantity}
                  onClick={() => {
                    if (canAdd(selected) && validQuantity) {
                      onAdd(selected, quantity);
                      setSelectedId(null);
                    }
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
