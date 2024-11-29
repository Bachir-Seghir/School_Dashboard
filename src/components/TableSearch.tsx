import Image from "next/image";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex rounded-full items-center gap-2 text-xs ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="w-[200px] outline-none p-2 bg-transparent"
      />
    </div>
  );
};

export default TableSearch;
