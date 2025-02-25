import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleCurrWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
	id,
	type,
}: {
	id: string | number;
	type: "teacherId" | "classId";
}) => {
	const resData = await prisma.lesson.findMany({
		where: {
			...(type === "teacherId"
				? { teacherId: id as string }
				: { classId: id as number }),
		},
	});

	const data = resData.map((lesson) => ({
		title: lesson.name,
		start: lesson.startTime,
		end: lesson.endTime,
	}));
	const schedule = adjustScheduleCurrWeek(data);
	return (
		<div className="">
			<BigCalendar data={schedule} />
		</div>
	);
};

export default BigCalendarContainer;
