import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendatContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
	const { userId } = await auth();

	const classItem = await prisma.class.findMany({
		where: {
			students: {
				some: { id: userId! },
			},
		},
	});

	return (
		<div className="p-4 flex flex-col gap-4 xl:flex-row">
			{/* LEFT */}
			<div className="w-full xl:w-2/3 flex flex-col gap-8">
				<div className="h-full p-4 rounded-md bg-white">
					<h1 className="text-xl font-semibold">Schedule (4A)</h1>
					<BigCalendarContainer
						type="classId"
						id={classItem[0].id}
					/>
				</div>
			</div>
			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-8">
				<EventCalendar />
				<Announcements />
			</div>
		</div>
	);
};

export default StudentPage;
