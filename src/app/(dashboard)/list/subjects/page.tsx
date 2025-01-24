import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserData } from "@/lib/utils";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type SubjectList = Subject & { teachers: Teacher[] };

// retreive the userId and role
const { currentUserId, role } = await getUserData();

const renderRow = (item: SubjectList) => (
	<tr
		key={item.id}
		className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
	>
		<td className="flex items-center gap-4 p-4 font-semibold">{item.name}</td>
		<td className="hidden md:table-cell">
			{item.teachers.map((teacher) => teacher.firstName).join(",")}
		</td>
		<td>
			<div className="flex items-center gap-2">
				{role === "admin" && (
					<>
						<FormContainer
							table="subject"
							type="update"
							data={item}
						/>
						<FormContainer
							table="subject"
							type="delete"
							id={item.id}
						/>
					</>
				)}
			</div>
		</td>
	</tr>
);

const columns = [
	{
		header: "Subject Name",
		accessor: "name",
	},
	{
		header: "Teachers",
		accessor: "teachers",
		className: "hidden md:table-cell",
	},
	{
		header: "Actions",
		accessor: "actions",
	},
];

const SubjectListPage = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	const { page, ...queryParams } = searchParams;
	const p = page ? parseInt(page) : 1;

	const query: Prisma.SubjectWhereInput = {};

	for (const [key, value] of Object.entries(queryParams)) {
		if (value !== undefined) {
			switch (key) {
				case "search":
					query.name = { contains: value, mode: "insensitive" };
					break;
				default:
					break;
			}
		}
	}

	const [data, count] = await prisma.$transaction([
		prisma.subject.findMany({
			where: query,
			include: {
				teachers: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.subject.count({ where: query }),
	]);

	return (
		<div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
			{/* TOP */}
			<div className="flex justify-between items-center">
				<h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
				<div className="w-full md:w-auto flex flex-col gap-4 md:flex-row items-center">
					<TableSearch />
					<div className="flex items-center gap-4 self-end">
						<button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
							<Image
								src="/filter.png"
								alt=""
								width={14}
								height={14}
							/>
						</button>
						<button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
							<Image
								src="/sort.png"
								alt=""
								width={14}
								height={14}
							/>
						</button>
						{role === "admin" && (
							<FormContainer
								table="subject"
								type="create"
							/>
						)}
					</div>
				</div>
			</div>
			{/* LIST */}
			<Table
				columns={columns}
				renderRow={renderRow}
				data={data}
			/>
			{/* Pagination */}
			<Pagination
				page={p}
				count={count}
			/>
		</div>
	);
};

export default SubjectListPage;
