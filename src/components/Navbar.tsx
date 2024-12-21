import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Navbar = async () => {
  const user = await currentUser()
    const role = user?.publicMetadata.role as string
  return (
    <div className="flex justify-between items-center p-4">
      {/* Search bar */}
      <div className="hidden md:flex rounded-full items-center gap-2 text-xs ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-[200px] outline-none p-2 bg-transparent"
        />
      </div>
      {/* Icons and User */}
      <div className="flex items-center gap-6 w-full justify-end">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 rounded-full text-white text-xs font-bold bg-purple-500 w-5 h-5 flex items-center justify-center">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-bold">Bachir Seghir</span>
          <span className="text-[12px] text-gray-500 text-right">{role}</span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
