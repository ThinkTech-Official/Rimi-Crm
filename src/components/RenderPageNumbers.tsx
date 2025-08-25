export const RenderPageNumbers = ({
  goToPage,
  totalPages,
  page,
}: {
  goToPage: (p: number) => void;
  totalPages: number;
  page: number;
}) => {
  const currentPage = page;
  const maxVisiblePages = 5;

  const pages: (number | string)[] = [];

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage < 3) {
      //beginning: 1,2,3,...,last
      for (let i = 1; i <= maxVisiblePages - 2; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      //ending: first,...,last-2,last-1,last
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      //middle: first,...,current-1,current,current+1,...,last
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
  }
  return pages.map((p, idx) =>
    p === "..." ? (
      <span key={`dots-${idx}`} className="px-2 mt-4">
        ...
      </span>
    ) : (
      <button
        key={p}
        onClick={() => goToPage(p as number)}
        className={`px-3 py-2 cursor-pointer ${
          p === currentPage
            ? "bg-primary text-white"
            : "bg-[#F1F0F2] text-[#808080]"
        }`}
      >
        {p}
      </button>
    )
  );
};
