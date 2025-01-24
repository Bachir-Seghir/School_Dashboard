import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { teachersData } from "@/lib/data";

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
