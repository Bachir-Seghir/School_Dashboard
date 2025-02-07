import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendatContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { getUserData } from "@/lib/utils";

const ParentPage = async () => {
	const { currentUserId } = await getUserData();

	const students = await prisma.student.findMany({
		where: {
			parentId: currentUserId!,
		},
	});
	return (
		<div className="p-4 flex flex-1 flex-col gap-4 xl:flex-row">
			{/* LEFT */}
			<div className="xl:w-2/3">
				{students.map((student) => (
					<div
						className="w-full"
						key={student.id}
					>
						<div className="h-full p-4 rounded-md bg-white">
							<h1 className="text-xl font-semibold">
								Schedule ({student.firstName + " " + student.lastName})
							</h1>
							<BigCalendarContainer
								id={student.classId}
								type={"classId"}
							/>
						</div>
					</div>
				))}
			</div>

			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-8">
				<EventCalendar />
				<Announcements />
			</div>
		</div>
	);
};

export default ParentPage;
