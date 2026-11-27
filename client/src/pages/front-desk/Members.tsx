import InfoList from "@/components/shared/InfoList";
import { TierIcon } from "@/icons/tier";
import { UsersIcon } from "@/icons/users";
import { CalendarIcon } from "@/icons/calendar";
import { HeartIcon } from "@/icons/heart";
import { StatCard } from "@/components/shared/StaffPage";
import { useState } from "react";
import DataTable from "@/components/shared/data-table";
import FormSelect from "@/components/shared/FormSelect";
import InfoField from "@/components/shared/InfoField";
import { PageHeading } from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import { FormInput, StatusBadge } from "@/components/shared/StaffPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { HorizontalDotsIcon } from "@/icons/horizontal-dots";
import { UserIcon } from "@/icons/user";
import { BRANCH_NAMES, homeBranch } from "@/data/branch";
import {
  members,
  tierColor,
  tierDiscount,
  type Member,
} from "@/data/front-desk";
import { formatDate, isoDate, money } from "@/data/member";

const cell = "px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700";

export default function Members() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const newThisMonth = members.filter(
    (item) => item.registered.slice(0, 7) === isoDate(0).slice(0, 7),
  ).length;

  return (
    <div className="space-y-6">
      <PageHeading
        title="Hội viên"
        description={`Tra cứu, đăng ký và cập nhật hồ sơ hội viên tại ${homeBranch.name}.`}
        action={
          <Button onClick={() => setRegisterOpen(true)}>
            <UserIcon className="size-5" />
            Đăng ký hội viên
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<UsersIcon />}
          tone="primary"
          label="Hội viên tại chi nhánh"
          value={members.length}
        />
        <StatCard
          icon={<CalendarIcon />}
          tone="info"
          label="Đăng ký trong tháng"
          value={newThisMonth}
        />
        <StatCard
          icon={<HeartIcon />}
          tone="warning"
          label="Cần chăm sóc"
          value={
            members.filter((item) => item.status !== "Còn hiệu lực").length
          }
          hintInTooltip
          hint="Sắp hết hạn hoặc không còn gói"
        />
      </div>
      <DataTable
        title="Danh sách hội viên"
        data={members}
        columns={[
          "Hội viên",
          "Số điện thoại",
          "Hạng",
          "Gói hiện có",
          "Trạng thái",
        ]}
        searchLabel="Tìm theo mã, họ tên, SĐT, email hoặc CCCD"
        emptyTitle="Không tìm thấy hội viên"
        emptyDescription="Thử tìm theo số điện thoại, email hoặc CCCD."
        emptyDateLabel="Chưa có hội viên"
        getDate={(item) => item.registered}
        getSearchText={(item) =>
          [
            item.id,
            item.name,
            item.phone,
            item.email,
            item.idCard,
            item.tier,
          ].join(" ")
        }
        renderRow={(item) => (
          <TableRow className="h-16 border-b border-gray-100">
            <TableCell className="min-w-44 py-3 ps-5 text-start sm:ps-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500">{item.id}</span>
              </div>
            </TableCell>
            <TableCell className={cell}>{item.phone}</TableCell>
            <TableCell className={cell}>
              <Badge size="sm" color={tierColor(item.tier)}><TierIcon tier={item.tier} />
                {item.tier}
              </Badge>
            </TableCell>
            <TableCell className={cell}>{item.plans}</TableCell>
            <TableCell className={cell}>
              <StatusBadge size="sm" status={item.status} />
            </TableCell>
            <TableCell className="min-w-16 py-3 pe-5 text-end whitespace-nowrap sm:pe-6">
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={`Xem hồ sơ ${item.id}`}
                onClick={() => setSelected(item)}
              >
                <HorizontalDotsIcon className="size-5" />
              </Button>
            </TableCell>
          </TableRow>
        )}
      />

      <SketchDialog
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        title="Đăng ký hội viên"
        actionLabel="Tạo hồ sơ và cấp thẻ"
      >
        <FormInput id="reg-name" label="Họ tên" autoComplete="off" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput id="reg-phone" label="Số điện thoại" type="tel" />
          <FormInput id="reg-email" label="Email" type="email" />
          <FormInput id="reg-idcard" label="Số CCCD" inputMode="numeric" />
          <FormSelect label="Giới tính" options={["Nam", "Nữ", "Khác"]} />
          <FormInput
            id="reg-birthday"
            label="Ngày sinh"
            type="date"
            description="Hội viên phải đủ 16 tuổi."
          />
          <FormSelect
            label="Chi nhánh đăng ký"
            options={[
              homeBranch.name,
              ...BRANCH_NAMES.filter((name) => name !== homeBranch.name),
            ]}
          />
        </div>
        <CardDescription>
          Số điện thoại, email và CCCD không được trùng.
        </CardDescription>
      </SketchDialog>

      <SketchDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title={selected ? `Hồ sơ ${selected.id}` : "Hồ sơ hội viên"}
        actionLabel="Lưu thay đổi"
      >
        {selected && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-semibold text-gray-800">
                {selected.name}
              </span>
              <Badge color={tierColor(selected.tier)}><TierIcon tier={selected.tier} />{selected.tier}</Badge>
              <StatusBadge status={selected.status} />
            </div>
            <InfoList>
              <InfoField label="CCCD" value={selected.idCard} />
              <InfoField label="Giới tính" value={selected.gender} />
              <InfoField
                label="Ngày sinh"
                value={formatDate(selected.birthday)}
              />
              <InfoField
                label="Ngày đăng ký"
                value={formatDate(selected.registered)}
              />
              <InfoField
                label="Chi tiêu năm"
                value={money(selected.spending)}
              />
              <InfoField
                label="Ưu đãi hiện tại"
                value={`${tierDiscount(selected.tier)}%`}
              />
            </InfoList>
            <InfoList>
              <InfoField label="Mã thẻ/QR" value={selected.cardCode} />
              <InfoField
                label="Gói hiện có"
                value={selected.plans}

              />
            </InfoList>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                id="edit-phone"
                label="Số điện thoại"
                type="tel"
                defaultValue={selected.phone}
              />
              <FormInput
                id="edit-email"
                label="Email"
                type="email"
                defaultValue={selected.email}
              />
            </div>
          </>
        )}
      </SketchDialog>
    </div>
  );
}
