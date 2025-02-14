import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { getUserData } from "@/lib/utils";

export type FormContainerProps = {
	table:
		| "teacher"
		| "student"
		| "parent"
		| "subject"
		| "class"
		| "lesson"
		| "exam"
		| "assignment"
		| "result"
		| "attendance"
		| "event"
		| "announcement";
	type: "create" | "update" | "delete";
	data?: any;
	id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
	let relatedData = {};
	const { currentUserId, role } = await getUserData();
	if (type !== "delete") {
		switch (table) {
			case "subject":
				const subjectTeachers = await prisma.teacher.findMany({
					select: { id: true, firstName: true, lastName: true },
				});
				relatedData = { teachers: subjectTeachers };
				break;
			case "class":
				const classGrades = await prisma.grade.findMany({
					select: { id: true, level: true },
				});
				const classTeachers = await prisma.teacher.findMany({
					select: { id: true, firstName: true, lastName: true },
				});
				relatedData = { teachers: classTeachers, grades: classGrades };
				break;
			case "teacher":
				const teacherSubjects = await prisma.subject.findMany({
					select: { id: true, name: true },
				});

				relatedData = { subjects: teacherSubjects };
				break;
			case "student":
				const studentGrades = await prisma.grade.findMany({
					select: { id: true, level: true },
				});
				console.log(studentGrades);

				const studentClasses = await prisma.class.findMany({
					include: {
						_count: { select: { students: true } },
					},
				});

				relatedData = { grades: studentGrades, classes: studentClasses };
				break;
			case "announcement":
				const announcementClasses = await prisma.class.findMany({
					select: { id: true, name: true },
				});
				relatedData = { classes: announcementClasses };
				break;
			case "assignment":
				const assignmentlessons = await prisma.lesson.findMany({
					select: { id: true, name: true, teacherId: true },
				});
				relatedData = {
					lessons:
						role === "teacher"
							? assignmentlessons.filter(
									(lesson) => lesson.teacherId === currentUserId
							  )
							: assignmentlessons,
				};
				break;
			default:
				break;
		}
	}
	return (
		<div className="">
			<FormModal
				table={table}
				type={type}
				data={data}
				id={id}
				relatedData={relatedData}
			/>
		</div>
	);
};

export default FormContainer;
