import {
  PageHeading,
  InfoTable,
  InfoCell,
} from "@/components/shared/MemberPage";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress-bar";
import { TableRow } from "@/components/ui/table";
import { StarFilledIcon } from "@/icons/star-filled";
import { CheckIcon } from "@/icons/check";
import { member, money } from "@/data/member";

import { TIERS as tiers, tierColor, tierTextClass } from "@/data/tiers";

export default function Rewards() {
  const currentTier =
    tiers.find((tier) => tier.name === member.tier) ?? tiers[0];
  const nextTier = tiers.find((tier) => tier.threshold > member.spending);
  const target = nextTier ?? tiers[tiers.length - 1];
  const progress = Math.min(
    100,
    Math.round((member.spending / target.threshold) * 100),
  );

  return (
    <div className="space-y-6">
      <PageHeading
        title="Điểm & hạng"
        description="Hạng hội viên, điểm tích lũy và quyền lợi của bạn."
        action={<Badge color="gray">{member.year}</Badge>}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-brand-200 bg-brand-50">
          <CardHeader className="flex-row items-center justify-between gap-3">
            <CardDescription className="font-bold text-gray-900">
              Hạng hội viên
            </CardDescription>
            <Badge color={tierColor(currentTier.name)}>
              <StarFilledIcon />
              Hạng hiện tại
            </Badge>
          </CardHeader>
          <CardTitle
            className={`text-3xl font-semibold ${tierTextClass(currentTier.name)}`}
          >
            {currentTier.name}
          </CardTitle>
          <CardFooter className="flex-wrap justify-between gap-3">
            <Badge color="primary" variant="solid">
              Ưu đãi {currentTier.discount}%
            </Badge>
            <CardDescription>Cho hóa đơn tiếp theo</CardDescription>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="font-bold text-gray-900">
              Điểm tích lũy
            </CardDescription>
          </CardHeader>
          <div className="flex items-baseline gap-2">
            <CardTitle className="text-3xl font-semibold text-brand-600">
              {member.points}
            </CardTitle>
            <CardDescription>điểm</CardDescription>
          </div>
          <CardFooter>
            <CardDescription>100.000 đ thực trả = 1 điểm</CardDescription>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="font-semibold">Tiến độ nâng hạng</CardTitle>
            <Badge color="primary">{progress}%</Badge>
          </div>
          <CardDescription>
            {nextTier
              ? "Còn " +
                money(nextTier.threshold - member.spending) +
                " để đạt hạng " +
                nextTier.name
              : "Bạn đã đạt hạng cao nhất trong năm " + member.year}
          </CardDescription>
        </CardHeader>
        <Progress
          value={progress}
          aria-label={"Tiến độ chi tiêu tới hạng " + target.name}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardDescription>
            Đã chi tiêu{" "}
            <strong className="font-semibold text-brand-600 dark:text-brand-400">
              {money(member.spending)}
            </strong>
          </CardDescription>
          <CardDescription>Mục tiêu {money(target.threshold)}</CardDescription>
        </div>
      </Card>
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle className="font-semibold">Hạng & ưu đãi</CardTitle>
          <CardDescription>Theo chi tiêu năm {member.year}</CardDescription>
        </CardHeader>
        <InfoTable headers={["Hạng", "Chi tiêu năm", "Ưu đãi", ""]}>
          {tiers.map((tier) => (
            <TableRow
              key={tier.name}
              className={tier.name === member.tier ? "bg-sky-50/50 dark:bg-sky-500/5" : undefined}
            >
              <InfoCell>
                <Badge color={tierColor(tier.name)}>{tier.name}</Badge>
              </InfoCell>
              <InfoCell>
                {tier.threshold
                  ? "Từ " + money(tier.threshold)
                  : "Dưới " + money(tiers[1].threshold)}
              </InfoCell>
              <InfoCell>
                <span className="font-semibold">{tier.discount}%</span>
              </InfoCell>
              <InfoCell>
                {tier.name === member.tier && (
                  <Badge color="primary">
                    <CheckIcon />
                    Hiện tại
                  </Badge>
                )}
              </InfoCell>
            </TableRow>
          ))}
        </InfoTable>
        <CardFooter>
          <CardDescription>
            Điểm không quy đổi thành tiền. Điểm, chi tiêu và hạng được xét theo
            năm dương lịch.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
