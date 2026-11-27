import { TierIcon } from "@/icons/tier";
import { PageHeading } from "@/components/shared/MemberPage";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/icons/check";
import { member, money, invoices, formatDate } from "@/data/member";
import { TIERS as tiers } from "@/data/tiers";

export default function Rewards() {
  const currentTier =
    tiers.find((tier) => tier.name === member.tier) ?? tiers[0];
  const nextTier = tiers.find((tier) => tier.threshold > member.spending);
  const target = nextTier ?? tiers[tiers.length - 1];
  const progress = Math.min(
    100,
    Math.round((member.spending / target.threshold) * 100),
  );
  const recentPayments = invoices
    .filter((invoice) => invoice.status === "Đã thanh toán")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-6 md:space-y-8">
      <PageHeading
        title="Điểm & hạng"
        description="Theo dõi hạng hội viên, điểm tích lũy và quyền lợi của bạn."
        action={<Badge color="gray">Năm {member.year}</Badge>}
      />

      <Card className="gap-0 p-0 sm:p-0">
        <CardHeader className="items-center gap-4 px-5 pb-8 pt-10 text-center sm:px-8 sm:pt-12">
          <Badge color="gray" size="lg">FitLife Membership</Badge>
          <h2 className="w-full text-2xl font-bold leading-tight tracking-tight sm:text-[32px] lg:whitespace-nowrap lg:text-[40px]">
            Hạng hội viên, quyền lợi dành cho bạn
          </h2>
          <CardDescription className="max-w-xl">
            Khám phá ba hạng hội viên và ưu đãi theo hành trình của bạn tại FitLife.
            Hạng được xét theo tổng chi tiêu năm {member.year}.
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="tiers" className="gap-8 px-5 pb-5 sm:px-8 sm:pb-8">
          <TabsList aria-label="Thông tin điểm và hạng" className="mx-auto grid max-w-2xl grid-cols-3 overflow-visible">
            <TabsTrigger value="tiers" className="min-w-0 whitespace-normal px-2 text-center sm:px-6">Hạng & quyền lợi</TabsTrigger>
            <TabsTrigger value="points" className="min-w-0 whitespace-normal px-2 text-center sm:px-6">Điểm tích lũy</TabsTrigger>
            <TabsTrigger value="payments" className="min-w-0 whitespace-normal px-2 text-center sm:px-6">Thanh toán gần đây</TabsTrigger>
          </TabsList>

          <TabsContent value="tiers" className="space-y-6 text-black">
            <ul className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
              {tiers.map((tier, index) => {
                const isCurrent = tier.name === currentTier.name;
                const followingTier = tiers[index + 1];
                const benefits = [
                  tier.discount > 0
                    ? `Ưu đãi ${tier.discount}% cho hóa đơn tiếp theo`
                    : "Quyền lợi hội viên cơ bản",
                  "100.000 đ thực trả = 1 điểm tích lũy",
                  "Hạng được xét theo tổng chi tiêu năm",
                  "Điểm không quy đổi thành tiền",
                ];

                return (
                  <li key={tier.name} className="min-w-0">
                    <Card
                      aria-current={isCurrent ? "true" : undefined}
                      className={`h-full gap-0 p-2 sm:p-2 ${isCurrent ? "border-black ring-1 ring-black" : ""}`}
                    >
                      <CardHeader className="gap-5 rounded-[16px] bg-gray-100 p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="flex items-center gap-2 text-xl font-bold"><TierIcon tier={tier.name} className="size-6 shrink-0" />{tier.name}</h3>
                          <Badge color="primary" variant={isCurrent ? "solid" : "light"}>
                            {isCurrent ? "Hạng hiện tại" : `Ưu đãi ${tier.discount}%`}
                          </Badge>
                        </div>
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span className="text-4xl font-bold tracking-tight tabular-nums">
                            {tier.discount}%
                          </span>
                          <span className="text-sm text-black/60">ưu đãi hóa đơn</span>
                        </p>
                        <CardDescription className="min-h-12">
                          {tier.threshold === 0
                            ? `Dành cho hội viên chi tiêu dưới ${money(followingTier.threshold)} trong năm.`
                            : followingTier
                              ? `Dành cho hội viên chi tiêu từ ${money(tier.threshold)} đến dưới ${money(followingTier.threshold)} trong năm.`
                              : `Dành cho hội viên chi tiêu từ ${money(tier.threshold)} trong năm.`}
                        </CardDescription>
                        <Button
                          variant={isCurrent ? "default" : "outline"}
                          className="w-full"
                          render={<a href="#membership-progress" />}
                        >
                          {isCurrent ? "Theo dõi hạng của bạn" : "Xem tiến độ nâng hạng"}
                        </Button>
                      </CardHeader>
                      <ul className="space-y-4 px-4 py-6 text-sm leading-relaxed sm:px-5">
                        {benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-black/40">
                              <CheckIcon aria-hidden="true" className="size-3" />
                            </span>
                            <span className="text-black/60">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </li>
                );
              })}
            </ul>

            <Card id="membership-progress" tabIndex={-1} className="scroll-mt-36 bg-gray-50">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-bold sm:text-lg">
                  {/* {member.name} - {" "} */}
                  {nextTier ? `Tiến tới ${nextTier.name}` : "Đã đạt hạng cao nhất"}
                </h3>
                <p className="text-sm font-bold tabular-nums sm:text-base">
                  {money(member.spending)} / {money(target.threshold)}
                </p>
              </div>
              <Progress
                value={progress}
                aria-label={`Tiến độ chi tiêu tới hạng ${target.name}`}
              />
              <div className="flex flex-wrap justify-between gap-2 text-sm text-black/60">
                <p>Hạng hiện tại: {currentTier.name}</p>
                <p>
                  {nextTier
                    ? `Còn ${money(nextTier.threshold - member.spending)} để đạt ${nextTier.name}`
                    : `Bạn đã đạt hạng cao nhất trong năm ${member.year}`}
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="points" className="space-y-5 text-black">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Tổng quan điểm tích lũy</h3>
                <CardDescription>Thông tin tích lũy của {member.name}.</CardDescription>
              </div>
              <Badge color="primary"><TierIcon tier={currentTier.name} />Hội viên {currentTier.name}</Badge>
            </div>

            <Card className="gap-0 p-0 sm:p-0">
              <dl className="grid divide-y divide-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="space-y-3 p-5 sm:p-6">
                  <dt className="text-sm text-black/60">Điểm tích lũy</dt>
                  <dd className="flex flex-wrap items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight tabular-nums">
                      {member.points.toLocaleString("vi-VN")}
                    </span>
                    <span className="text-sm text-black/60">điểm</span>
                  </dd>
                  <p className="text-xs text-black/60">Trong năm {member.year}</p>
                </div>
                <div className="space-y-3 p-5 sm:p-6">
                  <dt className="text-sm text-black/60">Tổng chi tiêu năm</dt>
                  <dd className="break-words text-2xl font-bold tracking-tight tabular-nums">
                    {money(member.spending)}
                  </dd>
                  <p className="text-xs text-black/60">Dùng để xét hạng hội viên</p>
                </div>
                <div className="space-y-3 p-5 sm:p-6">
                  <dt className="text-sm text-black/60">Ưu đãi hiện tại</dt>
                  <dd className="text-4xl font-bold tracking-tight tabular-nums">
                    {currentTier.discount}%
                  </dd>
                  <p className="text-xs text-black/60">Cho hóa đơn tiếp theo</p>
                </div>
              </dl>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <h4 className="text-lg font-bold">Cách tích điểm</h4>
                <CardDescription>
                  Tích lũy điểm từ số tiền thực trả của bạn tại FitLife.
                </CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge color="gray" size="lg">100.000 đ thực trả</Badge>
                  <span aria-hidden="true" className="text-black/60">=</span>
                  <Badge color="primary" variant="solid" size="lg">1 điểm tích lũy</Badge>
                </div>
                <dl className="space-y-3 text-sm">
                  {/* <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-black/60">Kỳ tích lũy</dt>
                    <dd className="font-medium">Năm dương lịch {member.year}</dd>
                  </div> */}
                  <div className="flex flex-wrap justify-between gap-2">
                    {/* <dt className="text-black/60">Quy đổi điểm</dt>
                    <dd className="font-medium">Không quy đổi thành tiền</dd> */}
                  </div>
                </dl>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="text-black">
            <section aria-labelledby="payments-title">
              <h3 id="payments-title" className="mb-5 text-lg font-bold">
                Thanh toán gần đây
              </h3>
              {recentPayments.length > 0 ? (
                <ul className="divide-y divide-black/10">
                  {recentPayments.map((invoice) => (
                    <li
                      key={invoice.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{invoice.item}</p>
                        <p className="mt-1 text-xs text-black/60">
                          {invoice.id} · {formatDate(invoice.date)}
                        </p>
                      </div>
                      <span className="text-sm font-medium tabular-nums">
                        {money(invoice.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <CardDescription>Chưa có hóa đơn đã thanh toán.</CardDescription>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
