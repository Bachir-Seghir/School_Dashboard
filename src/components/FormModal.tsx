"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
	deleteAnnouncement,
	deleteAssignment,
	deleteClass,
	deleteStudent,
	deleteSubject,
	deleteTeacher,
	deleteEvent,
	deleteLesson,
	deleteExam,
} from "@/lib/actions";

import { FormContainerProps } from "./FormContainer";
import LoadingSpinner from "./LoadingSpinner";

const deleteActionMap = {
	subject: deleteSubject,
	class: deleteClass,
	teacher: deleteTeacher,
	student: deleteStudent,
	parent: deleteSubject,
	lesson: deleteLesson,
	exam: deleteExam,
	assignment: deleteAssignment,
	result: deleteSubject,
	attendance: deleteSubject,
	event: deleteEvent,
	announcement: deleteAnnouncement,
};

const loadable = (path: string) =>
	dynamic(() => import(`./forms/${path}`), {
		loading: () => <LoadingSpinner />,
	});

const formComponents: Record<string, any> = {
	teacher: loadable("TeacherForm"),
	student: loadable("StudentForm"),
	announcement: loadable("AnnouncementForm"),
	parent: loadable("ParentForm"),
	assignment: loadable("AssignmentForm"),
	class: loadable("ClassForm"),
	event: loadable("EventForm"),
	exam: loadable("ExamForm"),
	lesson: loadable("LessonForm"),
	result: loadable("ResultForm"),
	subject: loadable("SubjectForm"),
};

const forms: Record<
	string,
	(
		setOpen: Dispatch<SetStateAction<boolean>>,
		type: "create" | "update" | "delete",
		data?: any,
		relatedData?: any
	) => JSX.Element
> = Object.fromEntries(
	Object.entries(formComponents).map(
		([key, Component]: [string, React.FC<any>]) => [
			key,
			(
				setOpen: Dispatch<SetStateAction<boolean>>,
				type: "create" | "update" | "delete",
				data?: any,
				relatedData?: any
			) => (
				<Component
					setOpen={setOpen}
					type={type}
					data={data}
					relatedData={relatedData}
				/>
			),
		]
	)
);
const FormModal = ({
	table,
	type,
	data,
	id,
	relatedData,
}: FormContainerProps & { relatedData: any }) => {
	const size = type === "create" ? "h-8 w-8" : "h-7 w-7";
	const bgColor =
		type === "create"
			? "bg-yellow-200"
			: type === "update"
			? "bg-sky-200"
			: "bg-purple-200";

	const [open, setOpen] = useState(false);
	const router = useRouter();

	const Form = () => {
		const [state, formAction] = useFormState(deleteActionMap[table], {
			success: false,
			error: false,
		});

		useEffect(() => {
			if (state.success) {
				toast(`${table} has been deleted`);
				setOpen(false);
				router.refresh();
			}
		}, [state, router]);

		return type === "delete" && id ? (
			<form
				action={formAction}
				className="p-4 flex flex-col gap-4"
			>
				<input
					type="hidden"
					name="id"
					value={id}
				/>
				<span className="text-center font-medium">
					All data will be lost. Are you sure you want to delete this {table}?
				</span>
				<button className="bg-red-500 rounded-md text-white py-2 px-4 border-none w-max self-center">
					Delete
				</button>
			</form>
		) : forms[table] ? (
			forms[table](setOpen, type, data, relatedData)
		) : (
			<h1 className="text-center text-red-500 font-bold">Form Not Found</h1>
		);
	};
	return (
		<>
			<button
				className={`${size} rounded-full flex items-center justify-center ${bgColor}`}
				onClick={() => setOpen(true)}
			>
				<Image
					src={`/${type}.png`}
					alt=""
					width={16}
					height={16}
				/>
			</button>
			{open && (
				<div className="w-screen h-screen absolute z-50 left-0 top-0 bg-black bg-opacity-60 flex justify-center items-center">
					<div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
						<Form />
						<div
							className="absolute top-4 right-4 cursor-pointer"
							onClick={() => setOpen(false)}
						>
							<Image
								src="/close.png"
								alt=""
								width={14}
								height={14}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FormModal;
