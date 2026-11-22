import { useState } from "react";
import { PageHeading } from "@/components/shared/MemberPage";
import SketchDialog from "@/components/shared/SketchDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserIcon } from "@/icons/user";
import { PencilIcon } from "@/icons/pencil";
import { PageIcon } from "@/icons/page";
import { member } from "@/data/member";
import InfoField from "@/components/shared/InfoField";

export default function Profile() {
  const [cardOpen, setCardOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div className="space-y-6">
      <PageHeading
        title="Hồ sơ hội viên"
        description="Thông tin cá nhân và thẻ hội viên của bạn."
      />
      <Card className="relative overflow-hidden border border-gray-200 p-5 sm:p-6 lg:p-7 dark:border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-gray-800 sm:text-lg dark:text-white/90">
            Thông tin cá nhân
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            className="h-9 gap-2 px-3.5"
          >
            <PencilIcon className="size-4.5" />
            Chỉnh sửa
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-4 sm:gap-6">
          <Avatar className="size-16 shrink-0 sm:size-20">
            <AvatarFallback className="bg-brand-50 text-brand-500">
              <UserIcon className="size-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-gray-800 sm:text-lg dark:text-white/90">
              {member.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              <Badge color="primary">Hội viên</Badge>
              <span
                className="inline-block h-3.5 w-px bg-gray-300 dark:bg-gray-700"
                aria-hidden="true"
              />
              <span>{member.branch}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card size="sm" className="bg-gray-50">
            <InfoField label="Họ tên" value={member.name} />
            <Separator />
            <InfoField label="Email" value={member.email} />
          </Card>
          <Card size="sm" className="bg-gray-50">
            <InfoField label="Số điện thoại" value={member.phone} />
            <Separator />
            <InfoField
              label="Vai trò"
              value={<Badge color="primary">Hội viên</Badge>}
            />
          </Card>
        </div>
      </Card>
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle className="font-semibold">Thông tin hội viên</CardTitle>
          <Badge color="primary">{member.tier}</Badge>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card size="sm" className="bg-gray-50">
            <InfoField
              label="Mã hội viên"
              value={<Badge color="primary">{member.id}</Badge>}
            />
          </Card>
          <Card size="sm" className="bg-gray-50">
            <InfoField
              label="Hạng hội viên"
              value={
                <Badge color="primary" variant="solid">
                  {member.tier}
                </Badge>
              }
            />
          </Card>
          <Card size="sm" className="bg-gray-50">
            <InfoField label="Chi nhánh đăng ký" value={member.branch} />
          </Card>
        </div>
        <CardFooter className="flex-wrap justify-between gap-3">
          <CardDescription>
            Dùng thẻ hội viên tại cửa kiểm soát để check-in.
          </CardDescription>
          <Button variant="outline" onClick={() => setCardOpen(true)}>
            <PageIcon />
            Xem thẻ hội viên
          </Button>
        </CardFooter>
      </Card>
      <SketchDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Chỉnh sửa thông tin cá nhân"
        actionLabel="Lưu thông tin"
      >
        <Field>
          <FieldLabel htmlFor="profile-name">Họ tên</FieldLabel>
          <Input
            id="profile-name"
            autoComplete="name"
            defaultValue={member.name}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-email">Email</FieldLabel>
          <Input
            id="profile-email"
            type="email"
            autoComplete="email"
            defaultValue={member.email}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-phone">Số điện thoại</FieldLabel>
          <Input
            id="profile-phone"
            type="tel"
            autoComplete="tel"
            defaultValue={member.phone}
          />
        </Field>
      </SketchDialog>
      <SketchDialog
        open={cardOpen}
        onOpenChange={setCardOpen}
        title="Thẻ hội viên"
      >
        <CardHeader>
          <CardTitle>{member.name}</CardTitle>
          <Badge color="primary">{member.tier}</Badge>
        </CardHeader>
        <InfoField label="Mã hội viên" value={member.id} />
        <InfoField label="Chi nhánh đăng ký" value={member.branch} />
        <CardDescription>
          Dùng thẻ/QR hợp lệ tại cửa kiểm soát để check-in.
        </CardDescription>
      </SketchDialog>
    </div>
  );
}
