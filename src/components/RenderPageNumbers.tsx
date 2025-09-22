function buildPages(total: number, current: number, windowSize = 3) {
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + windowSize - 1);

  // shift window left if we're at the end
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }

  const pages: (number | "...")[] = [];
  if (start > 1) pages.push(1, "...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total) pages.push("...", total);
  return pages;
}

export const RenderPageNumbers = ({
  onPageChange,
  totalPages,
  page,
}: {
  onPageChange: (p: number) => void;
  totalPages: number;
  page: number;
}) => {
  const pages = buildPages(totalPages, page);

  return pages.map((p, idx) =>
    p === "..." ? (
      <span key={`dots-${idx}`} className="px-2 mt-4">
        ...
      </span>
    ) : (
      <button
        key={p}
        onClick={() => onPageChange(p as number)}
        className={`px-3 py-2 cursor-pointer ${
          p === page ? "bg-primary text-white" : "bg-[#F1F0F2] text-[#808080]"
        }`}
      >
        {p}
      </button>
    )
  );
};
