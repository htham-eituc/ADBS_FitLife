import { useState } from "react";
import FormSelect from "@/components/shared/FormSelect";
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
import { TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PencilIcon } from "@/icons/pencil";
import { homeBranch, products, servicePackages } from "@/data/branch";
import { money } from "@/data/member";

type Editor = "branch" | "package" | "product" | null;

export default function Catalog() {
  const [editor, setEditor] = useState<Editor>(null);
  const close = (open: boolean) => {
    if (!open) setEditor(null);
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Danh mục"
        description="Thông tin chi nhánh, gói dịch vụ và sản phẩm."
      />
      <Tabs defaultValue="branch">
        <TabsList>
          <TabsTrigger value="branch">Chi nhánh</TabsTrigger>
          <TabsTrigger value="packages">Gói dịch vụ</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
        </TabsList>

        <TabsContent value="branch" className="space-y-6">
          <SectionCard
            title={homeBranch.name}
            description={homeBranch.id}
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditor("branch")}
              >
                <PencilIcon className="size-4" />
                Chỉnh sửa
              </Button>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoField
                label="Địa chỉ"
                value={homeBranch.address}
                className="lg:col-span-2"
              />
              <InfoField label="Số điện thoại" value={homeBranch.phone} />
              <InfoField
                label="Giờ hoạt động"
                value={`${homeBranch.open}–${homeBranch.close}`}
              />
              <InfoField
                label="Sức chứa"
                value={`${homeBranch.capacity} người`}
              />
              <InfoField
                label="Hoa hồng PT"
                value={`${money(homeBranch.ptRate)}/buổi`}
              />
              <InfoField
                label="Dịch vụ – tiện ích"
                className="lg:col-span-2"
                value={
                  <span className="flex flex-wrap gap-2">
                    {homeBranch.services.map((service) => (
                      <Badge key={service} color="primary">
                        {service}
                      </Badge>
                    ))}
                  </span>
                }
              />
            </div>
          </SectionCard>
          <SectionCard
            title="Cửa kiểm soát"
            description="Cửa dùng chung cho mọi gói, không có cửa riêng cho từng gói hoặc khu vực dịch vụ."
          >
            <div className="flex flex-wrap gap-2">
              {homeBranch.gates.map((gate) => (
                <Badge key={gate} color="gray">
                  {gate}
                </Badge>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="packages">
          <SectionCard
            title="Gói dịch vụ"
            description="Ngừng bán bằng cách đổi trạng thái, không xóa dữ liệu đã phát sinh giao dịch."
            action={
              <Button size="sm" onClick={() => setEditor("package")}>
                Thêm gói
              </Button>
            }
          >
            <InfoTable
              headers={[
                "Mã",
                "Tên gói",
                "Loại",
                "Thời hạn",
                "Số buổi/lượt",
                "Giá",
                "Trạng thái",
              ]}
            >
              {servicePackages.map((item) => (
                <TableRow key={item.id}>
                  <InfoCell>{item.id}</InfoCell>
                  <InfoCell>{item.name}</InfoCell>
                  <InfoCell>{item.type}</InfoCell>
                  <InfoCell>
                    {item.months ? `${item.months} tháng` : "Không hạn"}
                  </InfoCell>
                  <InfoCell>
                    {item.sessions
                      ? `${item.sessions} ${item.type === "Spa" ? "lượt" : "buổi"}`
                      : "—"}
                  </InfoCell>
                  <InfoCell>{money(item.price)}</InfoCell>
                  <InfoCell>
                    <StatusBadge status={item.status} />
                  </InfoCell>
                </TableRow>
              ))}
            </InfoTable>
          </SectionCard>
        </TabsContent>

        <TabsContent value="products">
          <SectionCard
            title="Sản phẩm"
            description="Ngừng bán bằng cách đổi trạng thái, không xóa dữ liệu đã phát sinh giao dịch."
            action={
              <Button size="sm" onClick={() => setEditor("product")}>
                Thêm sản phẩm
              </Button>
            }
          >
            <InfoTable
              headers={["Mã", "Tên sản phẩm", "Loại", "Giá bán", "Trạng thái"]}
            >
              {products.map((item) => (
                <TableRow key={item.id}>
                  <InfoCell>{item.id}</InfoCell>
                  <InfoCell>{item.name}</InfoCell>
                  <InfoCell>{item.type}</InfoCell>
                  <InfoCell>{money(item.price)}</InfoCell>
                  <InfoCell>
                    <StatusBadge status={item.status} />
                  </InfoCell>
                </TableRow>
              ))}
            </InfoTable>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <SketchDialog
        open={editor === "branch"}
        onOpenChange={close}
        title="Chỉnh sửa chi nhánh"
        actionLabel="Lưu thay đổi"
      >
        <FormInput
          id="branch-name"
          label="Tên chi nhánh"
          defaultValue={homeBranch.name}
        />
        <FormInput
          id="branch-address"
          label="Địa chỉ"
          defaultValue={homeBranch.address}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            id="branch-phone"
            label="Số điện thoại"
            defaultValue={homeBranch.phone}
          />
          <FormInput
            id="branch-capacity"
            label="Sức chứa"
            type="number"
            min={1}
            defaultValue={homeBranch.capacity}
          />
          <FormInput
            id="branch-open"
            label="Giờ mở cửa"
            type="time"
            defaultValue={homeBranch.open}
          />
          <FormInput
            id="branch-close"
            label="Giờ đóng cửa"
            type="time"
            defaultValue={homeBranch.close}
          />
          <FormInput
            id="branch-rate"
            label="Hoa hồng PT/buổi"
            type="number"
            min={0}
            step={10000}
            defaultValue={homeBranch.ptRate}
          />
        </div>
        <CardDescription>
          Giờ mở cửa phải sớm hơn giờ đóng cửa; sức chứa lớn hơn 0.
        </CardDescription>
      </SketchDialog>

      <SketchDialog
        open={editor === "package"}
        onOpenChange={close}
        title="Thêm gói dịch vụ"
        actionLabel="Lưu gói"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput id="pkg-id" label="Mã gói" />
          <FormInput id="pkg-name" label="Tên gói" />
          <FormSelect
            label="Loại"
            options={["Gym", "Yoga", "GroupX", "PT 1-1", "Spa"]}
          />
          <FormSelect
            label="Thời hạn"
            options={["3 tháng", "6 tháng", "12 tháng", "Không hạn (vé Spa)"]}
          />
          <FormInput
            id="pkg-sessions"
            label="Số buổi PT"
            type="number"
            min={1}
            description="Chỉ gói PT 1-1 có số buổi."
          />
          <FormInput
            id="pkg-price"
            label="Giá"
            type="number"
            min={1}
            step={100000}
          />
        </div>
        <CardDescription>
          Gym, Yoga, GroupX và PT 1-1 có thời hạn 3, 6 hoặc 12 tháng; vé Spa lẻ
          có một lượt và không có hạn sử dụng.
        </CardDescription>
      </SketchDialog>

      <SketchDialog
        open={editor === "product"}
        onOpenChange={close}
        title="Thêm sản phẩm"
        actionLabel="Lưu sản phẩm"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput id="prd-id" label="Mã sản phẩm" />
          <FormInput id="prd-name" label="Tên sản phẩm" />
          <FormSelect
            label="Loại"
            options={["Đồ uống", "Thực phẩm bổ sung", "Đồ ăn nhẹ", "Phụ kiện"]}
          />
          <FormInput
            id="prd-price"
            label="Giá bán"
            type="number"
            min={1}
            step={1000}
          />
        </div>
        <CardDescription>Giá bán phải lớn hơn 0.</CardDescription>
      </SketchDialog>
    </div>
  );
}
