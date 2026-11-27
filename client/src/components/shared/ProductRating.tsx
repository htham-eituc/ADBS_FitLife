import { productRatings } from "@/data/product-ratings";

// Shopco ProductCard: gold stars, fractional fill and a score out of five.
export default function ProductRating({ productId }: { productId: string }) {
  const rating = productRatings[productId];
  if (rating === undefined) return null;
  return (
    <div
      role="img"
      aria-label={`Đánh giá mẫu: ${rating} trên 5 sao`}
      className="flex flex-wrap items-center gap-x-2 gap-y-1"
    >
      <span aria-hidden="true" className="inline-flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.max(0, Math.min(1, rating - index));
          return (
            <span
              key={index}
              className="relative block size-4 shrink-0 sm:size-[18px]"
            >
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 size-full fill-[#F0F0F0]"
              >
                <path d="m12 1.8 3.15 6.38 7.04 1.02-5.1 4.97 1.21 7.02L12 17.88l-6.3 3.31 1.21-7.02-5.1-4.97 7.04-1.02Z" />
              </svg>
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 max-w-none fill-[#FFC633] sm:h-[18px] sm:w-[18px]"
                >
                  <path d="m12 1.8 3.15 6.38 7.04 1.02-5.1 4.97 1.21 7.02L12 17.88l-6.3 3.31 1.21-7.02-5.1-4.97 7.04-1.02Z" />
                </svg>
              </span>
            </span>
          );
        })}
      </span>
      <span aria-hidden="true" className="text-xs text-black sm:text-sm">
        {rating.toFixed(1)}
        <span className="text-black/60">/5</span>{" "}
        <span className="text-[10px] text-black/50"></span>
      </span>
    </div>
  );
}
