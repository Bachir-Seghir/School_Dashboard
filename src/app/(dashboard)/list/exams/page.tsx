import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserData } from "@/lib/utils";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type ExamList = Exam & {
	lesson: {
		class: Class;
		teacher: Teacher;
		subject: Subject;
	};
};

const ExamListPage = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	// retreive the userId and role
	const { currentUserId, role } = await getUserData();

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
			header: "Date",
			accessor: "date",
			className: "hidden md:table-cell",
		},
		...(role === "admin" || "teacher"
			? [
					{
						header: "Actions",
						accessor: "actions",
					},
			  ]
			: []),
	];

	/////// Render Row Component ////////////
	const renderRow = (item: ExamList) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
		>
			<td className="flex items-center gap-4 p-4 font-semibold">
				{item.lesson.subject.name}
			</td>
			<td>{item.lesson.class.name}</td>
			<td className="hidden md:table-cell">{item.lesson.teacher.lastName}</td>
			<td className="hidden md:table-cell">
				{new Intl.DateTimeFormat("en-US").format(item.startTime)}
			</td>
			<td>
				<div className="flex items-center gap-2">
					{(role === "admin" || "teacher") && (
						<>
							<FormContainer
								table="exam"
								type="update"
								data={item}
							/>
							<FormContainer
								table="exam"
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

	// URL Params Conditions //
	const query: Prisma.ExamWhereInput = {};
	query.lesson = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.lesson.subject = {
							name: { contains: value, mode: "insensitive" },
						};
						break;
					case "teacherId":
						query.lesson.teacherId = value;
						break;
					case "classId":
						query.lesson.classId = parseInt(value);
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
		teacher: { teacherId: currentUserId },
		student: { class: { students: { some: { id: currentUserId } } } },
		parent: { class: { students: { some: { parentId: currentUserId } } } },
	};

	const roleCondition =
		roleConditions[role as keyof typeof roleConditions] || {};

	if (role !== "admin") {
		query.lesson = { ...query.lesson, ...roleCondition };
	}

	const [data, count] = await prisma.$transaction([
		prisma.exam.findMany({
			where: query,
			include: {
				lesson: {
					select: {
						subject: { select: { name: true } },
						class: { select: { name: true } },
						teacher: { select: { lastName: true, firstName: true } },
					},
				},
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (page - 1),
		}),
		prisma.exam.count({ where: query }),
	]);

	return (
		<div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
			{/* TOP */}
			<div className="flex justify-between items-center">
				<h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
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
						{(role === "admin" || "teacher") && (
							<FormContainer
								table="exam"
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

export default ExamListPage;
