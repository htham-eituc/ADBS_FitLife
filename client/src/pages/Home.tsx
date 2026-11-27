// Adapted from Shopco homepage/Header, ProductListSec, DressStyle and Reviews.
// Hero images and decorative stars are the original template assets.
import { useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProductRating from "@/components/shared/ProductRating";
import { Link, useLocation, useNavigate } from "react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ROLES, type Role } from "@/layouts/navigation";
import { getPagePath, getRoleHomePath } from "@/layouts/routes";
import { homeBranch, products, servicePackages } from "@/data/branch";
import { productVisuals } from "@/data/product-visuals";
import { money } from "@/data/member";

const memberPath = (
  page: "plans" | "orders" | "schedule" | "profile" | "rewards",
) => getPagePath("member", page);
const experiences = [
  {
    title: "Năng động mỗi ngày",
    image: "khampha1.jpg",
    to: memberPath("plans"),
  },
  {
    title: "Phong cách của bạn",
    image: "khampha2.jpg",
    to: memberPath("profile"),
  },
  {
    title: "Tự tin hơn mỗi ngày",
    image: "khampha3.jpg",
    to: memberPath("rewards"),
  },
  {
    title: "Sẵn sàng tập luyện",
    image: "khampha4.jpg",
    to: memberPath("schedule"),
  },
];
const steps = [
  {
    title: "Chọn gói phù hợp",
    description:
      "Khám phá các gói Gym, Yoga, GroupX và PT. Xem thông tin dịch vụ để chọn hành trình phù hợp với bạn.",
    to: memberPath("plans"),
    action: "Khám phá gói tập",
  },
  {
    title: "Lên lịch cho bản thân",
    description:
      "Theo dõi lịch tập và chọn buổi hẹn với huấn luyện viên cá nhân ngay trên FitLife Hub.",
    to: memberPath("schedule"),
    action: "Xem lịch tập",
  },
  {
    title: "Sẵn sàng cho buổi tập",
    description:
      "Chọn đồ uống, dinh dưỡng và phụ kiện. Đặt hàng trên website và nhận tại chi nhánh của bạn.",
    to: memberPath("orders"),
    action: "Ghé cửa hàng",
  },
];
export default function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const role: Role = ROLES.some((item) => item.id === state?.role)
    ? state.role
    : "member";
  useEffect(() => {
    document.title = "FitLife Hub";
    window.scrollTo(0, 0);
  }, []);
  const changeRole = (next: Role) => navigate(getRoleHomePath(next));
  const featured = products
    .filter((item) => item.status === "Đang bán" && item.stock > 0)
    .slice(0, 4);
  const packages = servicePackages
    .filter((item) => item.status === "Đang bán")
    .filter((item) => ["GYM03", "YOGA03", "GX06", "PT10"].includes(item.id));
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <div className="min-h-dvh bg-white text-black">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-99999 focus:rounded-full focus:bg-black focus:px-6 focus:py-3 focus:text-white"
          >
            Đến nội dung chính
          </a>
          <Header role={role} onRoleChange={changeRole} />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <section
              aria-labelledby="hero-title"
              className="overflow-hidden bg-[#F2F0F1] pt-10 md:pt-24"
            >
              <div className="mx-auto grid grid-cols-1 md:max-w-frame md:grid-cols-2">
                <div className="max-w-frame px-4">
                  <motion.h1
                    initial={{ y: 100, opacity: 0, rotate: 10 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    id="hero-title"
                    className="mb-5 text-4xl leading-[1.02] lg:mb-8 lg:text-[64px]"
                  >
                    <span className="hero-headline">
                      SỐNG KHỎE
                      <br />
                      THEO CÁCH
                      <br />
                      CỦA BẠN
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mb-6 max-w-[545px] text-sm leading-relaxed text-black/60 lg:mb-8 lg:text-base"
                  >
                    Tìm nhịp tập luyện phù hợp với bạn tại FitLife. Từ Gym, Yoga
                    đến huấn luyện cá nhân, mỗi buổi tập là một bước gần hơn đến
                    phiên bản khỏe mạnh và tự tin của chính mình.
                  </motion.p>
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <Link
                      to={memberPath("plans")}
                      className="mb-5 inline-block w-full rounded-full bg-black px-10 py-4 text-center text-sm text-white transition-colors hover:bg-black/80 md:mb-12 md:w-auto"
                    >
                      Khám phá gói tập
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="mb-8 flex flex-wrap items-center justify-center gap-y-5 md:mb-[80px] md:justify-start"
                  >
                    {[
                      { value: 20000, label: "Hội viên đồng hành" },
                      {
                        value: 200,
                        label: "Huấn luyện viên",
                      },
                      { value: "05:00 - 22:00", label: "Giờ mở cửa tại Quận 1" },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className={
                          index === 2
                            ? "mt-0 w-full text-center sm:w-auto sm:border-l sm:border-black/10 sm:pl-5 sm:text-left"
                            : "border-r border-black/10 px-5 first:pl-0 md:pr-5"
                        }
                      >
                        <p className="text-2xl font-bold lg:text-3xl xl:text-[36px]">
                          {typeof item.value === "number" ? (
                            <AnimatedCounter
                              from={0}
                              to={item.value}
                              animationOptions={{ duration: 2 }}
                            />
                          ) : (
                            item.value
                          )}
                        </p>
                        <p className="mt-1 text-xs text-black/60">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ y: 100, opacity: 0, rotate: 10 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.3, duration: 0.8 }}
                  role="img"
                  aria-label="Hai người mẫu trong trang phục đen trắng"
                  className="relative min-h-[448px] bg-[url('/images/shopco/header-res-homepage.png')] bg-cover bg-top bg-no-repeat md:min-h-[428px] md:bg-[url('/images/shopco/header-homepage.png')] md:px-4 xl:bg-[center_top_-1.6rem]"
                >
                  <img
                    src="/images/shopco/big-star.svg"
                    alt=""
                    width={104}
                    height={104}
                    className="absolute right-7 top-12 size-[76px] lg:size-24 xl:right-0 xl:size-[104px] motion-safe:animate-[spin_4s_linear_infinite]"
                  />
                  <img
                    src="/images/shopco/small-star.svg"
                    alt=""
                    width={56}
                    height={56}
                    className="absolute left-7 top-36 size-11 sm:top-64 md:left-0 md:top-44 md:size-14 lg:top-56 motion-safe:animate-[spin_3s_linear_infinite]"
                  />
                </motion.div>
              </div>
            </section>
            <div className="bg-black px-4 text-white">
              <div className="mx-auto flex max-w-frame flex-wrap items-center justify-center gap-x-8 gap-y-5 py-8 md:justify-between md:py-10">
                {homeBranch.services.map((service) => (
                  <span
                    key={service}
                    className="font-heading text-xl font-bold md:text-3xl"
                  >
                    {service.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            <div className="my-[50px] sm:my-[72px]">
              <motion.section
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                aria-labelledby="products-title"
                className="mx-auto max-w-frame px-4 xl:px-0"
              >
                <h2
                  id="products-title"
                  className="mb-8 text-center text-[32px] font-bold leading-tight md:mb-14 md:text-5xl"
                >
                  ĐỒNG HÀNH CÙNG BUỔI TẬP
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-5">
                  {featured.map((product) => (
                    <Link
                      key={product.id}
                      to={memberPath("orders")}
                      className="group flex min-w-0 flex-col items-start"
                    >
                      <div className="mb-3 aspect-square w-full overflow-hidden rounded-[13px] bg-[#F0EEED] lg:rounded-[20px]">
                        <img
                          src={productVisuals[product.id].image}
                          alt={product.name}
                          width={295}
                          height={298}
                          loading="lazy"
                          className="size-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-base font-bold xl:text-xl">
                        {product.name}
                      </h3>
                      <div className="mt-2">
                        <ProductRating productId={product.id} />
                      </div>
                      <p className="mt-2 text-xs text-black/60">
                        {product.type}
                      </p>
                      <p className="mt-2 text-xl font-bold xl:text-2xl">
                        {money(product.price)}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link
                    to={memberPath("orders")}
                    className="inline-block w-full rounded-full border border-black/10 px-14 py-4 text-sm transition-colors hover:bg-[#F0F0F0] sm:w-auto"
                  >
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              </motion.section>
              <div className="mx-auto max-w-frame px-4 xl:px-0">
                <hr className="my-10 border-black/10 sm:my-16" />
              </div>
              <motion.section
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                aria-labelledby="packages-title"
                className="mx-auto mb-[50px] max-w-frame px-4 sm:mb-20 xl:px-0"
              >
                <h2
                  id="packages-title"
                  className="mb-8 text-center text-[32px] font-bold leading-tight md:mb-14 md:text-5xl"
                >
                  GÓI TẬP DÀNH CHO BẠN
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-5">
                  {packages.map((plan) => (
                    <Link
                      key={plan.id}
                      to={`${memberPath("orders")}?category=services`}
                      className="group min-w-0"
                    >
                      <div className="relative mb-3 flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-[#F0F0F0] transition-colors group-hover:bg-[#e6e6e6]">
                        {plan.image ? (
                          <img
                            src={plan.image}
                            alt={plan.name}
                            width={295}
                            height={295}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover"
                          />
                        ) : (
                          <span className="px-3 text-center text-2xl font-bold md:text-4xl">
                            {plan.type}
                          </span>
                        )}
                        <span className={`rounded-full bg-white px-4 py-2 text-sm ${plan.image ? "absolute bottom-3 right-3" : ""}`}>
                          {plan.sessions
                            ? `${plan.sessions} buổi`
                            : `${plan.months} tháng`}
                        </span>
                      </div>
                      <h3 className="text-base font-bold xl:text-xl">
                        {plan.name}
                      </h3>
                      <p className="mt-2 text-xl font-bold xl:text-2xl">
                        {money(plan.price)}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link
                    to={`${memberPath("orders")}?category=services`}
                    className="inline-block w-full rounded-full border border-black/10 px-14 py-4 text-sm hover:bg-[#F0F0F0] sm:w-auto"
                  >
                    Khám phá dịch vụ
                  </Link>
                </div>
              </motion.section>
              <div className="mb-[50px] px-4 sm:mb-20 xl:px-0">
                <motion.section
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6 }}
                  aria-labelledby="experiences-title"
                  className="mx-auto max-w-frame rounded-[40px] bg-[#F0F0F0] px-6 pb-6 pt-10 text-center md:p-[70px]"
                >
                  <h2
                    id="experiences-title"
                    className="mb-8 text-[32px] font-bold leading-tight md:mb-14 md:text-5xl"
                  >
                    KHÁM PHÁ FITLIFE
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
                    {experiences.map((item, index) => (
                      <Link
                        key={item.title}
                        to={item.to}
                        className={`relative h-[190px] overflow-hidden rounded-[20px] bg-white text-left md:h-[289px] ${index === 1 || index === 2 ? "sm:col-span-2" : ""}`}
                      >
                        <img
                          src={`/images/shopco/${item.image}`}
                          alt=""
                          width={684}
                          height={289}
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover object-top"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.4)_40%,transparent_75%)]"
                        />
                        <h3 className="relative max-w-[250px] px-6 py-4 text-2xl font-bold leading-tight text-white md:px-9 md:py-[25px] md:text-3xl">
                          {item.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              </div>
              <motion.section
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                aria-labelledby="steps-title"
                className="mx-auto max-w-frame px-4 xl:px-0"
              >
                <h2
                  id="steps-title"
                  className="mb-8 text-[32px] font-bold leading-tight md:mb-10 md:text-5xl"
                >
                  BẮT ĐẦU THẬT ĐƠN GIẢN
                </h2>
                <div className="grid gap-5 md:grid-cols-3">
                  {steps.map((step, index) => (
                    <article
                      key={step.title}
                      className="flex flex-col rounded-[20px] border border-black/10 px-6 py-7 md:px-8"
                    >
                      <span className="mb-4 text-sm font-semibold text-black/40">
                        0{index + 1}
                      </span>
                      <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                      <p className="mb-6 text-sm leading-relaxed text-black/60">
                        {step.description}
                      </p>
                      <Link
                        to={step.to}
                        className="mt-auto text-sm font-semibold underline underline-offset-4"
                      >
                        {step.action} <span aria-hidden="true">↗</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </motion.section>
            </div>
          </main>
          <Footer role={role} onRoleChange={changeRole} />
        </div>
      </TooltipProvider>
    </MotionConfig>
  );
}
