import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserData } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";

type ResultList = {
	id: number;
	title: string;
	studentFName: string;
	studentLName: string;
	teacherFName: string;
	teacherLName: string;
	score: number;
	className: string;
	startTime: Date;
};

// retreive the userId and role
const { currentUserId, role } = await getUserData();

const columns = [
	{
		header: "Title",
		accessor: "title",
	},
	{
		header: "Student",
		accessor: "studentId",
	},
	{
		header: "Score",
		accessor: "score",
		className: "hidden md:table-cell",
	},
	{
		header: "Teacher",
		accessor: "teacher",
		className: "hidden md:table-cell",
	},
	{
		header: "Class",
		accessor: "class",
		className: "hidden md:table-cell",
	},
	{
		header: "Date",
		accessor: "date",
		className: "hidden md:table-cell",
	},
	...(role === "admin" || role === "teacher"
		? [
				{
					header: "Actions",
					accessor: "actions",
				},
		  ]
		: []),
];

/////// Render Row Component ////////////
const renderRow = (item: ResultList) => (
	<tr
		key={item.id}
		className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
	>
		<td className="flex items-center gap-4 p-4">{item.title}</td>
		<td>{item.studentFName + " " + item.studentLName}</td>
		<td className="hidden md:table-cell">{item.score}</td>
		<td className="hidden md:table-cell">{item.teacherLName}</td>
		<td className="hidden md:table-cell">{item.className}</td>
		<td className="hidden md:table-cell">
			{new Intl.DateTimeFormat("en-US").format(item.startTime)}
		</td>
		<td>
			<div className="flex items-center gap-2">
				{role === "admin" ||
					(role === "teacher" && (
						<>
							<FormModal
								table="result"
								type="update"
								data={item}
							/>
							<FormModal
								table="result"
								type="delete"
								id={item.id}
							/>
						</>
					))}
			</div>
		</td>
	</tr>
);

const ResultListPage = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	const { page, ...queryParams } = searchParams;
	const p = page ? parseInt(page) : 1;

	const query: Prisma.ResultWhereInput = {};

	// URL Params Conditions //
	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.OR = [
							{ exam: { title: { contains: value, mode: "insensitive" } } },
							{
								student: {
									OR: [
										{ lastName: { contains: value, mode: "insensitive" } },
										{ firstName: { contains: value, mode: "insensitive" } },
									],
								},
							},
						];
						break;
					case "studentId":
						query.studentId = value;
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
			query.OR = [
				{ exam: { lesson: { teacherId: currentUserId! } } },
				{ assignment: { lesson: { teacherId: currentUserId! } } },
			];
			break;
		case "student":
			query.studentId = currentUserId!;
			break;
		case "parent":
			query.student = {
				parentId: currentUserId!,
			};
		default:
			break;
	}

	const [dataRes, count] = await prisma.$transaction([
		prisma.result.findMany({
			where: query,
			include: {
				student: { select: { lastName: true, firstName: true } },
				exam: {
					include: {
						lesson: {
							select: {
								class: { select: { name: true } },
								teacher: { select: { lastName: true, firstName: true } },
							},
						},
					},
				},
				assignment: {
					include: {
						lesson: {
							select: {
								class: { select: { name: true } },
								teacher: { select: { lastName: true, firstName: true } },
							},
						},
					},
				},
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.result.count({ where: query }),
	]);

	const data = dataRes.map((item) => {
		const assessment = item.exam || item.assignment;

		if (!assessment) return null;

		const isExam = "startTime" in assessment;
		return {
			id: item.id,
			title: assessment.title,
			studentFName: item.student.firstName,
			studentLName: item.student.lastName,
			teacherFName: assessment.lesson.teacher.firstName,
			teacherLName: assessment.lesson.teacher.lastName,
			score: item.score,
			className: assessment.lesson.class.name,
			startTime: isExam ? assessment.startTime : assessment.startDate,
		};
	});

	return (
		<div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
			{/* TOP */}
			<div className="flex justify-between items-center">
				<h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
						{role === "admin" ||
							(role === "teacher" && (
								// <button className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-200">
								//   <Image src="/plus.png" alt="" width={14} height={14} />
								// </button>
								<FormModal
									table="result"
									type="create"
								/>
							))}
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

export default ResultListPage;
