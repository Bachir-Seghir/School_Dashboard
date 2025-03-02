import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserData } from "@/lib/utils";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";

type EventList = Event & { class: Class };

const SubjectListPage = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	// retreive the userId and role
	const { currentUserId, role } = await getUserData();

	/////// Render Row Component ////////////

	const renderRow = (item: EventList) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
		>
			<td className="flex items-center gap-4 p-4">{item.title}</td>
			<td>{item.class?.name || "-"}</td>
			<td className="hidden md:table-cell">
				{new Intl.DateTimeFormat("en-US").format(item.startTime)}
			</td>
			<td className="hidden md:table-cell">
				{item.startTime.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				})}
			</td>
			<td className="hidden md:table-cell">{item.endTime}</td>
			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormContainer
								table="event"
								type="update"
								data={item}
							/>
							<FormContainer
								table="event"
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
			header: "Title",
			accessor: "title",
		},
		{
			header: "Class",
			accessor: "class",
		},
		{
			header: "Date",
			accessor: "date",
			className: "hidden md:table-cell",
		},
		{
			header: "Start Time",
			accessor: "startTime",
			className: "hidden md:table-cell",
		},
		{
			header: "End Time",
			accessor: "endTime",
			className: "hidden md:table-cell",
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

	// extract query parameters
	const { page: rawPage, ...queryParams } = searchParams;

	const parsedPage = rawPage ? parseInt(rawPage as string) : NaN;

	// Check if the parsed page from search Params is valid Number greater then 0
	const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

	// URL Params Conditions //
	let query: Prisma.EventWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.title = { contains: value, mode: "insensitive" };
						break;
					default:
						break;
				}
			}
		}
	}
	// ROLE conditions //

	const roleConditions = {
		admin: {},
		teacher: { lessons: { some: { teacherId: currentUserId! } } },
		student: { students: { some: { id: currentUserId! } } },
		parent: { students: { some: { parentId: currentUserId! } } },
	};

	const roleCondition =
		roleConditions[role as keyof typeof roleConditions] || {};

	if (role !== "admin") {
		query.OR = [
			{ classId: null },
			{
				class: roleCondition,
			},
		];
	}

	const [data, count] = await prisma.$transaction([
		prisma.event.findMany({
			where: query,
			include: {
				class: { select: { name: true } },
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (page - 1),
		}),
		prisma.event.count({ where: query }),
	]);

	return (
		<div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
			{/* TOP */}
			<div className="flex justify-between items-center">
				<h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
								table="event"
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

export default SubjectListPage;
