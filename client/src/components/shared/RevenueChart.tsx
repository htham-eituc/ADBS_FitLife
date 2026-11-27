// FitLife report chart using the Shopco monochrome palette.
// https://github.com/TailAdmin/free-react-tailwind-admin-dashboard/blob/main/src/components/ecommerce/MonthlySalesChart.tsx
import { lazy, Suspense } from "react";
import type { ApexOptions } from "apexcharts";
import { SectionCard } from "./StaffPage";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { money } from "@/data/member";
const chartFont = "var(--font-ui)";
const labelStyle = { fontFamily: chartFont, fontSize: "14px", fontWeight: 400 };
const Chart = lazy(() => import("react-apexcharts"));

type Props = {
  title: string;
  description: string;
  categories: string[];
  series: { name: string; data: number[] }[];
  horizontal?: boolean;
};
export default function RevenueChart({
  title,
  description,
  categories,
  series,
  horizontal = false,
}: Props) {
  const options: ApexOptions = {
    colors: ["#000000", "#999999"],
    chart: {
      type: "bar",
      fontFamily: chartFont,
      toolbar: { show: false },
      animations: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
        barHeight: "64%",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 3, colors: ["transparent"] },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: labelStyle,
        ...(horizontal
          ? {
              formatter: (value: string) =>
                `${Math.round(Number(value) / 1e6)} tr`,
            }
          : { rotate: -35 }),
      },
    },
    yaxis: {
      labels: {
        style: labelStyle,
        ...(horizontal
          ? {}
          : { formatter: (value: number) => `${Math.round(value / 1e6)} tr` }),
      },
    },
    grid: {
      borderColor: "#f2f4f7",
      yaxis: { lines: { show: !horizontal } },
      xaxis: { lines: { show: horizontal } },
    },
    legend: {
      show: series.length > 1,
      position: "top",
      horizontalAlign: "left",
      fontFamily: chartFont,
      fontSize: "14px",
      fontWeight: 400,
    },
    fill: { opacity: 1 },
    tooltip: {
      style: { fontFamily: chartFont, fontSize: "14px" },
      y: { formatter: money },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: { bar: { columnWidth: "60%" } },
          legend: { position: "bottom" },
        },
      },
    ],
  };
  return (
    <SectionCard
      className="min-w-0"
      title={title}
      description={description}
      action={
        <Badge size="sm" color="primary">
          Doanh thu
        </Badge>
      }
    >
      <figure aria-label={title} className="min-w-0 overflow-hidden">
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <Chart
            options={options}
            series={series}
            type="bar"
            height={horizontal ? 520 : 300}
          />
        </Suspense>
        <figcaption className="sr-only">
          Đơn vị: đồng.{" "}
          {categories
            .map(
              (label, index) =>
                `${label}: ${series.map((item) => `${item.name} ${money(item.data[index])}`).join(", ")}`,
            )
            .join("; ")}
        </figcaption>
      </figure>
    </SectionCard>
  );
}
