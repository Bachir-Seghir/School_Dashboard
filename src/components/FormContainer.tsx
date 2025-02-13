import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

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
				const announcementClass = await prisma.class.findMany({
					select: { id: true, name: true },
				});
				relatedData = { classes: announcementClass };
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
