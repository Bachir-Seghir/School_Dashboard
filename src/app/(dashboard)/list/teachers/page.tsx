import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


type TeacherList = Teacher & { subjects: Subject[], classes: Class[] }

const TeacherListPage = async ({
  searchParams,
}: {
    searchParams: {
    [key: string]: string | undefined
  }
  }) => {
  
    const { sessionClaims } = await auth()
    const role = (sessionClaims?.metadata as { role?: string })?.role
    
  /////// Render Row Component ////////////
  const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.lastName}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.subjects.map(subject => subject.name).join(",")}</td>
    <td className="hidden md:table-cell">{item.classes.map(item => item.name ).join(",")}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="h-7 w-7 rounded-full flex justify-center items-center bg-sky-200">
            <Image src="/view.png" alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal table="teacher" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.TeacherWhereInput = {}

  // URL Params Conditions //
  if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "classId":
          query.lessons = {
            some: {
              classId: parseInt(value)
            }
          }
          break;
        case "search":
          query.lastName = { contains: value, mode:"insensitive"}
      }
    }
  }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
       where: query,
      include: {
        subjects: true,
        classes: true
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
     prisma.teacher.count({ where: query})
  ])

  const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  ...( role === "admin" ? [{
    header: "Actions",
    accessor: "actions",
  }] : []),
  ];
  
  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="w-full md:w-auto flex flex-col gap-4 md:flex-row items-center">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherListPage;
