import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserData } from "@/lib/utils";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";

type ParentList = Parent & { students: Student[] };

const ParentListPage = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	// retreive the userId and role
	const { role } = await getUserData();

	const columns = [
		{
			header: "Info",
			accessor: "info",
		},
		{
			header: "Student Names",
			accessor: "students",
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
		...(role === "admin"
			? [
					{
						header: "Actions",
						accessor: "actions",
					},
			  ]
			: []),
	];

	/////// Render Row Component ////////////
	const renderRow = (item: ParentList) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
		>
			<td className="flex items-center gap-4 p-4">
				<div className="flex flex-col">
					<h3 className="font-semibold">{item.lastName}</h3>
					<p className="text-xs text-gray-500">{item?.email}</p>
				</div>
			</td>
			<td className="hidden md:table-cell">
				{item.students.map((student) => student.firstName).join(",")}
			</td>
			<td className="hidden lg:table-cell">{item.phone}</td>
			<td className="hidden lg:table-cell">{item.address}</td>
			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormContainer
								table="parent"
								type="update"
								data={item}
							/>
							<FormContainer
								table="parent"
								type="delete"
								id={item.id}
							/>
						</>
					)}
				</div>
			</td>
		</tr>
	);

	// extract query parameters
	const { page: rawPage, ...queryParams } = searchParams;

	const parsedPage = rawPage ? parseInt(rawPage as string) : NaN;

	// Check if the parsed page from search Params is valid Number greater then 0
	const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

	const query: Prisma.ParentWhereInput = {};

	// URL Params Conditions //
	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.lastName = { contains: value, mode: "insensitive" };
						break;
					default:
						break;
				}
			}
		}
	}
	const [data, count] = await prisma.$transaction([
		prisma.parent.findMany({
			where: query,
			include: {
				students: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (page - 1),
		}),
		prisma.parent.count({ where: query }),
	]);

	return (
		<div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
			{/* TOP */}
			<div className="flex justify-between items-center">
				<h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
								table="parent"
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
				page={page}
				count={count}
			/>
		</div>
	);
};

export default ParentListPage;
