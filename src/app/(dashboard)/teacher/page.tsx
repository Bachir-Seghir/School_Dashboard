import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendatContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async () => {
	const { userId } = await auth();

	return (
		<div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
			{/* LEFT */}
			<div className="w-full xl:w-2/3 flex flex-col gap-8">
				<div className="h-full p-4 rounded-md bg-white">
					<h1 className="text-xl font-semibold">Schedule</h1>
					<BigCalendarContainer
						id={userId!}
						type="teacherId"
					/>
				</div>
			</div>
			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-8">
				<Announcements />
			</div>
		</div>
	);
};

export default TeacherPage;
