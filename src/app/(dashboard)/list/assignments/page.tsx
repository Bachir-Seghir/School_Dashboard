import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type AssignmentList = Assignment & {
  lesson: {
    class: Class
    teacher: Teacher
    subject: Subject
  }
}


const AssignmentListPage = async ({
  searchParams,
}: {
    searchParams: {
    [key: string]: string | undefined
  }
  }) => {
  
  const { userId: currentUserId, sessionClaims } = await auth()
  const role = (sessionClaims?.metadata as { role?: string })?.role
  
 /////// Render Row Component ////////////
  const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
  >
    <td className="flex items-center gap-4 p-4 font-semibold">
      {item.lesson.subject.name}
    </td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{item.lesson.teacher.lastName}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" || role === "teacher" && (
          //   <Link href={`/list/teachers/${item.id}`}>
          //   <button className="h-7 w-7 rounded-full flex justify-center items-center bg-sky-200">
          //     <Image src="/update.png" alt="" width={16} height={16} />
          //   </button>
          // </Link>
          // <button className="h-7 w-7 rounded-full flex justify-center items-center bg-purple-200">
          //   <Image src="/delete.png" alt="" width={16} height={16} />
          // </button>
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
  );
  
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL Params Conditions //
  const query: Prisma.AssignmentWhereInput = {}
  query.lesson = {}
  
  if(queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "search":
          query.lesson.subject = {
              name: { contains: value, mode: 'insensitive'}
            }
          break;
        
        case "teacherId":
          query.lesson.teacherId = value
          break;
        
        case "classId":
          query.lesson.classId = parseInt(value) 
          break;
        
        default:
          break;
      }
    }
  }
}
  // ROLE conditions // 

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId!
          }
        }
      }
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: currentUserId!
          }
        }
      }
      break;
    default:
      break;
  }
  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
       where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
          teacher: { select: { lastName: true, firstName: true } },
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
     prisma.assignment.count({ where: query})
  ])

  const columns = [
  {
    header: "Subject",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "Duedate",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher" ? [{
    header: "Actions",
    accessor: "actions",
  }] : []),
  ];
  
  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="w-full md:w-auto flex flex-col gap-4 md:flex-row items-center">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role === "teacher" && (
              // <button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="assignment" type="create" />
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

export default AssignmentListPage;
