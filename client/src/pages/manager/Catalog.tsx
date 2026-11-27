import InfoList from "@/components/shared/InfoList";
import { useState } from "react";
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
  SelectField,
  StatusBadge,
} from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeBranch, products, servicePackages } from "@/data/branch";
import { isoDate, money } from "@/data/member";

type Item = {
  id: string;
  name: string;
  type: string;
  price: number;
  status: string;
  months?: number | null;
  sessions?: number | null;
};
type Editor = { kind: "package" | "product"; item: Item; creating: boolean };
const blank = (): Item => ({
  id: "",
  name: "",
  type: "Gym",
  price: 0,
  status: "Đang bán",
  months: 3,
  sessions: null,
});
export default function Catalog() {
  const [packages, setPackages] = useState<Item[]>(servicePackages);
  const [productRows, setProducts] = useState<Item[]>(products);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [stopping, setStopping] = useState<Editor | null>(null);
  const [branchOpen, setBranchOpen] = useState(false);
  const [branch, setBranch] = useState({ ...homeBranch });
  const [draftBranch, setDraftBranch] = useState({ ...homeBranch });
  const [effective, setEffective] = useState(isoDate());
  const [message, setMessage] = useState("");
  const update = (patch: Partial<Item>) =>
    setEditor((current) =>
      current ? { ...current, item: { ...current.item, ...patch } } : null,
    );
  const rows = editor?.kind === "package" ? packages : productRows;
  const invalid =
    !editor ||
    !editor.item.id.trim() ||
    !editor.item.name.trim() ||
    !Number.isFinite(editor.item.price) ||
    editor.item.price <= 0 ||
    !effective ||
    (editor.creating && rows.some((row) => row.id === editor.item.id)) ||
    (editor.kind === "package" &&
      editor.item.type === "PT 1-1" &&
      (!Number.isInteger(editor.item.sessions) ||
        (editor.item.sessions ?? 0) < 1));
  const save = () => {
    if (!editor || invalid) return;
    const item = editor.item;
    const setter = editor.kind === "package" ? setPackages : setProducts;
    setter((current) =>
      editor.creating
        ? [...current, item]
        : current.map((row) => (row.id === item.id ? item : row)),
    );
    setMessage(`Đã lưu ${item.name}. Ngày hiệu lực: ${effective}.`);
    setEditor(null);
  };
  const table = (kind: "package" | "product", items: Item[]) => (
    <SectionCard
      title={kind === "package" ? "Gói dịch vụ" : "Sản phẩm"}
      description="Ngừng bán giữ lại dữ liệu và các giao dịch đã phát sinh."
      action={
        <Button
          size="sm"
          onClick={() => {
            setEffective(isoDate());
            setEditor({
              kind,
              item: {
                ...blank(),
                type: kind === "package" ? "Gym" : "Phụ kiện",
              },
              creating: true,
            });
          }}
        >
          Thêm {kind === "package" ? "gói" : "sản phẩm"}
        </Button>
      }
    >
      <InfoTable
        headers={[
          "Mã",
          "Tên",
          "Loại",
          ...(kind === "package" ? ["Thời hạn", "Số buổi/lượt"] : []),
          "Giá",
          "Trạng thái",
          "Thao tác",
        ]}
      >
        {items.map((item) => (
          <TableRow key={item.id}>
            <InfoCell>{item.id}</InfoCell>
            <InfoCell>{item.name}</InfoCell>
            <InfoCell>{item.type}</InfoCell>
            {kind === "package" && (
              <>
                <InfoCell>
                  {item.months ? `${item.months} tháng` : "Không hạn"}
                </InfoCell>
                <InfoCell>{item.sessions ?? "-"}</InfoCell>
              </>
            )}
            <InfoCell>{money(item.price)}</InfoCell>
            <InfoCell>
              <StatusBadge status={item.status} />
            </InfoCell>
            <InfoCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEffective(isoDate());
                    setEditor({ kind, item: { ...item }, creating: false });
                  }}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={item.status === "Ngừng bán"}
                  onClick={() => setStopping({ kind, item, creating: false })}
                >
                  Ngừng bán
                </Button>
              </div>
            </InfoCell>
          </TableRow>
        ))}
      </InfoTable>
    </SectionCard>
  );
  return (
    <div className="space-y-6">
      <PageHeading
        title="Danh mục"
        description="Thông tin chi nhánh, gói dịch vụ và sản phẩm."
      />
      {message && <CardDescription role="status">{message}</CardDescription>}
      <Tabs defaultValue="branch">
        <TabsList>
          <TabsTrigger value="branch">Chi nhánh</TabsTrigger>
          <TabsTrigger value="packages">Gói dịch vụ</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
        </TabsList>
        <TabsContent value="branch" className="space-y-6">
          <SectionCard
            title={branch.name}
            description={branch.id}
            action={
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setDraftBranch({ ...branch });
                  setBranchOpen(true);
                }}
              >
                Chỉnh sửa
              </Button>
            }
          >
            <InfoList>
              <InfoField label="Địa chỉ" value={branch.address} />
              <InfoField label="Số điện thoại" value={branch.phone} />
              <InfoField
                label="Giờ hoạt động"
                value={`${branch.open}-${branch.close}`}
              />
              <InfoField label="Sức chứa" value={`${branch.capacity} người`} />
              <InfoField
                label="Hoa hồng PT"
                value={`${money(branch.ptRate)}/buổi`}
              />
              <InfoField
                label="Dịch vụ - tiện ích"
                value={
                  <div className="flex flex-wrap gap-2">
                    {branch.services.map((service) => (
                      <Badge size="sm" key={service}>
                        {service}
                      </Badge>
                    ))}
                  </div>
                }
              />
            </InfoList>
          </SectionCard>
          <SectionCard
            title="Cửa kiểm soát"
            description="Cửa dùng chung cho các gói dịch vụ."
          >
            <InfoList><InfoField label="Cửa đang sử dụng" value={<div className="flex flex-wrap gap-2">
              {branch.gates.map((gate) => (
                <Badge size="sm" color="gray" key={gate}>
                  {gate}
                </Badge>
              ))}
            </div>} /></InfoList>
          </SectionCard>
        </TabsContent>
        <TabsContent value="packages">{table("package", packages)}</TabsContent>
        <TabsContent value="products">
          {table("product", productRows)}
        </TabsContent>
      </Tabs>
      <SketchDialog
        open={branchOpen}
        onOpenChange={setBranchOpen}
        title="Chỉnh sửa chi nhánh"
        actionLabel="Lưu thay đổi"
        actionDisabled={
          !draftBranch.name.trim() ||
          draftBranch.capacity <= 0 ||
          draftBranch.ptRate < 0 ||
          draftBranch.open >= draftBranch.close
        }
        onAction={() => {
          setBranch(draftBranch);
          setBranchOpen(false);
          setMessage("Đã cập nhật thông tin chi nhánh.");
        }}
      >
        <FormInput
          id="branch-name"
          label="Tên chi nhánh"
          value={draftBranch.name}
          onChange={(e) =>
            setDraftBranch({ ...draftBranch, name: e.target.value })
          }
        />
        <FormInput
          id="branch-address"
          label="Địa chỉ"
          value={draftBranch.address}
          onChange={(e) =>
            setDraftBranch({ ...draftBranch, address: e.target.value })
          }
        />
        <FormInput
          id="branch-phone"
          label="Số điện thoại"
          value={draftBranch.phone}
          onChange={(e) =>
            setDraftBranch({ ...draftBranch, phone: e.target.value })
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(
            [
              ["capacity", "Sức chứa", "number"],
              ["ptRate", "Hoa hồng PT/buổi", "number"],
              ["open", "Giờ mở cửa", "time"],
              ["close", "Giờ đóng cửa", "time"],
            ] as const
          ).map(([key, label, type]) => (
            <FormInput
              key={key}
              id={`branch-${key}`}
              label={label}
              type={type}
              value={draftBranch[key]}
              onChange={(e) =>
                setDraftBranch({
                  ...draftBranch,
                  [key]:
                    type === "number" ? Number(e.target.value) : e.target.value,
                })
              }
            />
          ))}
        </div>
      </SketchDialog>
      <SketchDialog
        open={!!editor}
        onOpenChange={(open) => {
          if (!open) setEditor(null);
        }}
        title={`${editor?.creating ? "Thêm" : "Chỉnh sửa"} ${editor?.kind === "package" ? "gói dịch vụ" : "sản phẩm"}`}
        actionLabel="Lưu thay đổi"
        actionDisabled={invalid}
        onAction={save}
      >
        {editor && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                id="catalog-id"
                label="Mã"
                value={editor.item.id}
                readOnly={!editor.creating}
                onChange={(e) => update({ id: e.target.value })}
              />
              <FormInput
                id="catalog-name"
                label="Tên"
                value={editor.item.name}
                onChange={(e) => update({ name: e.target.value })}
              />
              <SelectField
                label="Loại"
                value={editor.item.type}
                options={
                  editor.kind === "package"
                    ? ["Gym", "Yoga", "GroupX", "PT 1-1", "Spa"]
                    : ["Đồ uống", "Thực phẩm bổ sung", "Đồ ăn nhẹ", "Phụ kiện"]
                }
                onChange={(type) =>
                  update({
                    type,
                    months: type === "Spa" ? null : 3,
                    sessions:
                      type === "Spa" ? 1 : type === "PT 1-1" ? 10 : null,
                  })
                }
              />
              <FormInput
                id="catalog-price"
                label="Giá bán"
                type="number"
                min={1}
                value={editor.item.price}
                onChange={(e) => update({ price: Number(e.target.value) })}
              />
              {editor.kind === "package" &&
                (editor.item.type === "Spa" ? (
                  <InfoField
                    label="Vé Spa"
                    value="1 lượt - Không hạn sử dụng"
                  />
                ) : (
                  <>
                    <SelectField
                      label="Thời hạn"
                      value={`${editor.item.months} tháng`}
                      options={["3 tháng", "6 tháng", "12 tháng"]}
                      onChange={(value) => update({ months: parseInt(value) })}
                    />
                    {editor.item.type === "PT 1-1" && (
                      <FormInput
                        id="catalog-sessions"
                        label="Số buổi PT"
                        type="number"
                        min={1}
                        value={editor.item.sessions ?? 1}
                        onChange={(e) =>
                          update({ sessions: Number(e.target.value) })
                        }
                      />
                    )}
                  </>
                ))}
              <SelectField
                label="Trạng thái"
                value={editor.item.status}
                options={["Đang bán", "Ngừng bán"]}
                onChange={(status) => update({ status })}
              />
              <FormInput
                id="catalog-effective"
                label="Ngày hiệu lực"
                type="date"
                min={isoDate()}
                value={effective}
                onChange={(e) => setEffective(e.target.value)}
              />
            </div>
            {invalid && (
              <CardDescription>
                Nhập đủ thông tin; giá và số buổi phải lớn hơn 0, mã mới không
                trùng.
              </CardDescription>
            )}
          </>
        )}
      </SketchDialog>
      <SketchDialog
        open={!!stopping}
        onOpenChange={(open) => {
          if (!open) setStopping(null);
        }}
        title="Ngừng bán danh mục"
        actionLabel="Xác nhận ngừng bán"
        onAction={() => {
          if (!stopping) return;
          const setter =
            stopping.kind === "package" ? setPackages : setProducts;
          setter((items) =>
            items.map((item) =>
              item.id === stopping.item.id
                ? { ...item, status: "Ngừng bán" }
                : item,
            ),
          );
          setMessage(`Đã ngừng bán ${stopping.item.name}.`);
          setStopping(null);
        }}
      >
        <CardDescription>
          Ngừng bán {stopping?.item.name}? Các giao dịch cũ và gói hội viên đã
          mua được giữ lại.
        </CardDescription>
      </SketchDialog>
    </div>
  );
}
