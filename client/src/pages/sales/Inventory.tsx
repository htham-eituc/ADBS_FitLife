import { useState } from "react";
import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import {
  SectionCard,
  StatCard,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { CardDescription } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TableRow } from "@/components/ui/table";
import { SearchIcon } from "@/icons/search";
import { homeBranch, products, stockStatus } from "@/data/branch";
import { money } from "@/data/member";

export default function Inventory() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLocaleLowerCase("vi");
  const rows = products.filter((item) =>
    [item.id, item.name, item.type]
      .join(" ")
      .toLocaleLowerCase("vi")
      .includes(q),
  );
  const selling = products.filter((item) => item.status === "Đang bán");

  return (
    <div className="space-y-6">
      <PageHeading
        title="Tồn kho"
        description={`Số lượng tồn theo sản phẩm tại ${homeBranch.name}.`}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Sản phẩm đang bán" value={selling.length} />
        <StatCard
          label="Hết hàng"
          value={selling.filter((item) => item.stock === 0).length}
          hint="Không bán được cho đến khi nhập thêm"
        />
      </div>
      <SectionCard
        title="Tồn kho theo sản phẩm"
        action={
          <InputGroup className="h-10 sm:w-72">
            <InputGroupAddon align="inline-start">
              <SearchIcon className="size-5 text-gray-400" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Tìm sản phẩm..."
              aria-label="Tìm sản phẩm"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </InputGroup>
        }
      >
        <InfoTable
          headers={[
            "Mã",
            "Sản phẩm",
            "Loại",
            "Giá bán",
            "Tồn kho",
            "Tình trạng",
          ]}
        >
          {rows.map((item) => (
            <TableRow key={item.id}>
              <InfoCell>{item.id}</InfoCell>
              <InfoCell>{item.name}</InfoCell>
              <InfoCell>{item.type}</InfoCell>
              <InfoCell>{money(item.price)}</InfoCell>
              <InfoCell>
                <span className="font-semibold">{item.stock}</span>
              </InfoCell>
              <InfoCell>
                <StatusBadge
                  status={
                    item.status === "Ngừng bán"
                      ? "Ngừng bán"
                      : stockStatus(item.stock)
                  }
                />
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
        <CardDescription>
          Tồn kho gắn theo cặp chi nhánh – sản phẩm và không được âm. Số tồn
          tăng khi phiếu nhập được gửi và giảm khi hóa đơn có sản phẩm được
          thanh toán.
        </CardDescription>
      </SectionCard>
    </div>
  );
}
