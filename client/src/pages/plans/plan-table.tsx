import DataTable from "@/components/shared/data-table";
import { formatDate, type ServicePlan } from "@/data/member";
import PlanRow from "./plan-row";

export default function PlanTable({
  title,
  data,
  onView,
}: {
  title: string;
  data: ServicePlan[];
  onView: (plan: ServicePlan) => void;
}) {
  return (
    <DataTable
      title={title}
      data={data}
      columns={["Gói dịch vụ", "Dịch vụ", "Thời hạn", "Còn lại", "Trạng thái"]}
      searchLabel="Tìm gói dịch vụ"
      emptyDateLabel="Chưa có gói dịch vụ"
      emptyTitle="Không tìm thấy gói dịch vụ"
      emptyDescription="Thử tìm theo tên gói, dịch vụ hoặc trạng thái."
      getDate={(plan) => plan.start}
      getSearchText={(plan) =>
        [
          plan.id,
          plan.name,
          plan.service,
          plan.remaining,
          plan.status,
          formatDate(plan.start),
          plan.end ? formatDate(plan.end) : "Không giới hạn",
        ].join(" ")
      }
      renderRow={(plan) => <PlanRow plan={plan} onView={onView} />}
    />
  );
}
