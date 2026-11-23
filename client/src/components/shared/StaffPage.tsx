import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils";

type BadgeColor = "primary" | "success" | "error" | "warning" | "info" | "gray";

const STATUS_COLORS: Record<string, BadgeColor> = {
  "Đã thanh toán": "success",
  "Đã hoàn thành": "success",
  "Còn hiệu lực": "success",
  "Còn lượt": "success",
  "Đang bán": "success",
  "Đang làm việc": "success",
  "Đã chốt": "success",
  "Còn hàng": "success",
  "Mở cửa": "success",
  "Đã check-out": "gray",
  "Đã đặt": "primary",
  "Đang trong CN": "primary",
  "Chờ thanh toán": "warning",
  "Chờ hội viên xác nhận": "warning",
  "Sắp hết hạn": "warning",
  "Chưa chốt": "warning",
  "Có sai lệch": "warning",
  Hủy: "error",
  "Hết hạn": "error",
  "Bị từ chối": "error",
  "Hết hàng": "error",
  "Ngừng bán": "gray",
  "Lâu chưa quay lại": "error",
};

export function StatusBadge({
  status,
  size,
}: {
  status: string;
  size?: "sm" | "default";
}) {
  return (
    <Badge size={size} color={STATUS_COLORS[status] ?? "gray"}>
      {status}
    </Badge>
  );
}

export function StatCard({
  label,
  value,
  hint,
  badge,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  badge?: ReactNode;
  className?: string;
}) {
  return (
    <Card size="sm" className={cn("gap-3", className)}>
      <div className="flex items-start justify-between gap-3">
        <CardDescription>{label}</CardDescription>
        {badge}
      </div>
      <CardTitle className="mb-0 text-2xl font-semibold">{value}</CardTitle>
      {hint && <CardDescription>{hint}</CardDescription>}
    </Card>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle className="font-semibold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action && (
          <div className="flex flex-wrap items-center gap-2">{action}</div>
        )}
      </CardHeader>
      {children}
    </Card>
  );
}

export function BarList({
  items,
  format = (value) => String(value),
}: {
  items: { label: string; value: number; note?: string }[];
  format?: (value: number) => string;
}) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
            <span className="font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
              {format(item.value)}
              {item.note && (
                <span className="ms-2 font-normal text-gray-500">
                  {item.note}
                </span>
              )}
            </span>
          </div>
          <Progress
            value={Math.round((item.value / max) * 100)}
            aria-label={item.label}
          />
        </li>
      ))}
    </ul>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <Field className={className}>
      <FieldLabel>{label}</FieldLabel>
      <Select
        value={value}
        onValueChange={(next) => {
          if (typeof next === "string") onChange(next);
        }}
      >
        <SelectTrigger aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

export function FormInput({
  id,
  label,
  description,
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  description?: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} {...props} />
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
