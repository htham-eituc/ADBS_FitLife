import { InfoIcon } from "@/icons/info";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ChartIcon } from "@/icons/chart";
import { WalletIcon } from "@/icons/wallet";
import { UsersIcon } from "@/icons/users";
import { DoorIcon } from "@/icons/door";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
} from "@/components/ui/progress-bar";
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
  "Đã dùng hết": "gray",
  "Bổ sung": "success",
  "Khấu trừ": "error",
  "Chờ áp dụng": "warning",
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
  "Chờ xác nhận": "warning",
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
  size = "sm",
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
  tone,
  highlighted = false,
  icon,
  hintInTooltip = false,
}: {
  label: string;
  tone?: "primary" | "success" | "info" | "warning";
  highlighted?: boolean;
  icon?: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  hintInTooltip?: boolean;
  badge?: ReactNode;
  className?: string;
}) {
  const hintTooltip =
    hint && hintInTooltip ? (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Thông tin ${label}`}
            />
          }
        >
          <InfoIcon aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent role="tooltip" className="whitespace-normal">
          {hint}
        </TooltipContent>
      </Tooltip>
    ) : null;
  if (icon) {
    return (
      <Card>
        <CardHeader className="flex-row items-center gap-3">
          <Badge color={tone ?? "primary"} size="lg">
            {icon}
          </Badge>
          <CardDescription className="inline-flex items-center gap-1">
            {label}
            {hintTooltip}
          </CardDescription>
          {badge}
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="mb-0 text-3xl font-semibold text-brand-600 tabular-nums dark:text-brand-400">
            {value}
          </CardTitle>
          {hint && !hintInTooltip && <CardDescription>{hint}</CardDescription>}
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      size="sm"
      className={cn(
        "gap-3",
        highlighted &&
          "border-brand-200 bg-brand-50 dark:border-brand-500/30 dark:bg-brand-500/15",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <CardDescription className="inline-flex items-center gap-1">
          {label}
          {hintTooltip}
        </CardDescription>
        {tone && (
          <Badge color={tone} size="lg">
            {tone === "success" ? (
              <WalletIcon />
            ) : tone === "info" ? (
              <UsersIcon />
            ) : tone === "warning" ? (
              <DoorIcon />
            ) : (
              <ChartIcon />
            )}
          </Badge>
        )}
        {badge}
      </div>
      <CardTitle className="mb-0 text-2xl font-semibold text-brand-600 dark:text-brand-400">
        {value}
      </CardTitle>
      {hint && !hintInTooltip && <CardDescription>{hint}</CardDescription>}
    </Card>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  titleClassName,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle className={`font-semibold ${titleClassName ?? ""}`}>
            {title}
          </CardTitle>
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
  items: { label: string; value: number; note?: string; color?: BadgeColor }[];
  format?: (value: number) => string;
}) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <Badge
              size="sm"
              color={
                item.color ??
                (["primary", "success", "info", "warning"] as const)[index % 4]
              }
            >
              {item.label}
            </Badge>
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
          >
            {item.color && (
              <ProgressTrack>
                <ProgressIndicator
                  className={
                    item.color === "gray"
                      ? "from-gray-300 to-gray-500"
                      : item.color === "warning"
                        ? "from-amber-300 to-amber-500"
                        : undefined
                  }
                />
              </ProgressTrack>
            )}
          </Progress>
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
