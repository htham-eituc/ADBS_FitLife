import {
  InfoCell,
  InfoTable,
  PageHeading,
} from "@/components/shared/MemberPage";
import { BarList, SectionCard, StatCard } from "@/components/shared/StaffPage";
import { CardDescription } from "@/components/ui/card";
import { TableRow } from "@/components/ui/table";
import { StarFilledIcon } from "@/icons/star-filled";
import { formatDate } from "@/data/member";
import { trainerReviews } from "@/data/staff";

function Stars({ value }: { value: number }) {
  return (
    <span
      className="inline-flex gap-0.5 text-amber-400"
      aria-label={`${value} sao`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarFilledIcon
          key={index}
          className={index < value ? "size-4" : "size-4 text-gray-200"}
        />
      ))}
    </span>
  );
}

export default function TrainerReviews() {
  const average =
    trainerReviews.reduce((sum, item) => sum + item.stars, 0) /
    trainerReviews.length;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    label: `${stars} sao`,
    value: trainerReviews.filter((item) => item.stars === stars).length,
  }));

  return (
    <div className="space-y-6">
      <PageHeading
        title="Đánh giá"
        description="Đánh giá của hội viên cho các buổi PT đã hoàn thành."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <StatCard
          label="Điểm trung bình"
          value={
            <span className="flex items-center gap-2">
              {average.toLocaleString("vi-VN", { maximumFractionDigits: 1 })}
              <Stars value={Math.round(average)} />
            </span>
          }
          hint={`${trainerReviews.length} đánh giá`}
        />
        <SectionCard className="lg:col-span-2" title="Phân bố điểm">
          <BarList items={distribution} format={(value) => `${value} lượt`} />
        </SectionCard>
      </div>
      <SectionCard
        title="Nhận xét gần đây"
        description="Mỗi buổi có tối đa một đánh giá, gửi trong 7 ngày sau buổi tập."
      >
        <InfoTable headers={["Ngày", "Hội viên", "Điểm", "Nhận xét"]}>
          {trainerReviews.map((item) => (
            <TableRow key={item.id}>
              <InfoCell>{formatDate(item.date)}</InfoCell>
              <InfoCell>{item.member}</InfoCell>
              <InfoCell>
                <Stars value={item.stars} />
              </InfoCell>
              <InfoCell>
                <CardDescription className="max-w-md whitespace-normal">
                  {item.comment}
                </CardDescription>
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
      </SectionCard>
    </div>
  );
}
