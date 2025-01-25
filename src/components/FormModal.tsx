"use client";

import { deleteClass, deleteSubject } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
	subject: deleteSubject,
	class: deleteClass,
	teacher: deleteSubject,
	student: deleteSubject,
	parent: deleteSubject,
	lesson: deleteSubject,
	exam: deleteSubject,
	assignment: deleteSubject,
	result: deleteSubject,
	attendance: deleteSubject,
	event: deleteSubject,
	announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
	loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
	loading: () => <h1>Loading...</h1>,
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
	loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
	loading: () => <h1>Loading...</h1>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
	loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
	loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
	loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
	loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
	loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
	loading: () => <h1>Loading...</h1>,
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
	loading: () => <h1>Loading...</h1>,
});

const forms: {
	[key: string]: (
		setOpen: Dispatch<SetStateAction<boolean>>,
		type: "create" | "update",
		data?: any,
		relatedData?: any
	) => JSX.Element;
} = {
	// teacher: (setOpen, type, data) => (
	// 	<TeacherForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	// student: (setOpen, type, data) => (
	// 	<StudentForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	// announcement: (setOpen, type, data) => (
	// 	<AnnouncementForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	// parent: (setOpen, type, data) => (
	// 	<ParentForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	// assignment: (setOpen, type, data) => (
	// 	<AssignmentForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	class: (setOpen, type, data, relatedData) => (
		<ClassForm
			setOpen={setOpen}
			type={type}
			data={data}
			relatedData={relatedData}
		/>
	),
	// event: (setOpen, type, data) => (
	// 	<EventForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	// exam: (setOpen, type, data) => (
	// 	<ExamForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	// lesson: (setOpen, type, data) => (
	// 	<LessonForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
	subject: (setOpen, type, data, relatedData) => (
		<SubjectForm
			setOpen={setOpen}
			type={type}
			data={data}
			relatedData={relatedData}
		/>
	),
	// result: (setOpen, type, data) => (
	// 	<ResultForm
	// 		setOpen={setOpen}
	// 		type={type}
	// 		data={data}
	// 	/>
	// ),
};

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

	const Form = () => {
		const [state, formAction] = useFormState(deleteActionMap[table], {
			success: false,
			error: false,
		});

		const router = useRouter();

		useEffect(() => {
			if (state.success) {
				toast(`${table} has been deleted`);
				setOpen(false);
				router.refresh();
			}
		}, [state]);
		return type === "delete" && id ? (
			<form
				action={formAction}
				className="p-4 flex flex-col gap-4"
			>
				<input
					type="text | number"
					name="id"
					value={id}
					hidden
				/>
				<span className="text-center font-medium">
					All data will be lost. are you sure you want to delete this {table}{" "}
				</span>
				<button className="bg-red-500 rounded-md text-white py-2 px-4 border-none w-max self-center">
					Delete
				</button>
			</form>
		) : type === "create" || type === "update" ? (
			forms[table](setOpen, type, data, relatedData)
		) : (
			"Form Not Found"
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
