import prisma from "@/lib/prisma";
import { getUserData } from "@/lib/utils";

const Announcements = async () => {
	// retreive the userId and role
	const { currentUserId, role } = await getUserData();

	const roleConditions = {
		teacher: { lessons: { some: { teacherId: currentUserId! } } },
		student: { students: { some: { id: currentUserId! } } },
		parent: { students: { some: { parentId: currentUserId! } } },
	};
	const data = await prisma.announcement.findMany({
		take: 3,
		orderBy: { date: "desc" },
		where: {
			...(role !== "admin" && {
				OR: [
					{ classId: null },
					{ class: roleConditions[role as keyof typeof roleConditions] || {} },
				],
			}),
		},
	});

	return (
		<div className="bg-white rounded-md p-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold my-4">Announcements</h1>
				<span className="text-gray-400 text-xs">View All</span>
			</div>

			<div className="flex flex-col mt-4 gap-4">
				{data.map((e) => (
					<div
						key={e.id}
						className="odd:bg-sky-50 even:bg-yellow-50 rounded-md p-4"
					>
						<div className="flex items-center justify-between">
							<h2 className="font-semibold">{e.title}</h2>
							<span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
								{new Intl.DateTimeFormat("en-US").format(e.date)}
							</span>
						</div>
						<p className="text-sm text-gray-600 mt-1">{e.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Announcements;
