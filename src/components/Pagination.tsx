'use client'

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number, count: number }) => {
  const router = useRouter()

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  }

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count
  return (
    <div className="p-4 flex justify-between items-center text-gray-500">
      <button
        disabled = {!hasPrev}
        className="px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {changePage(page - 1)}}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1
            return <button
              key={pageIndex}
              className={`rounded-sm px-2 ${page === pageIndex ? 'bg-sky-200' : ""}`}
              onClick={() => {changePage(pageIndex)}}
            >
              {pageIndex}
            </button>
          }
        )}
      </div>
      <button
        disabled = {!hasNext}
        className="px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {changePage(page + 1)}}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
