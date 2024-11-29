const Pagination = () => {
  return (
    <div className="p-4 flex justify-between items-center text-gray-500">
      <button
        disabled
        className="px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="rounded-sm px-2 bg-sky-200">1</button>
        <button className="rounded-sm px-2">2</button>
        <button className="rounded-sm px-2">3</button>
        ...
        <button className="text-sm rounded-sm px-2">10</button>
      </div>
      <button className="px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
