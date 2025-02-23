"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { lessonSchema, LessonSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createLesson, updateLesson } from "@/lib/actions";
import { toast } from "react-toastify";
import { Day } from "@prisma/client";

const LessonForm = ({
	setOpen,
	type,
	data,
	relatedData,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	type: "create" | "update";
	data?: any;
	relatedData?: any;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LessonSchema>({
		resolver: zodResolver(lessonSchema),
	});

	const router = useRouter();

	const [state, formAction] = useFormState(
		type === "create" ? createLesson : updateLesson,
		{
			success: false,
			error: false,
		}
	);

	const onSubmit = handleSubmit((data) => {
		data.startTime = new Date(data.startTime);
		data.endTime = new Date(data.endTime);
		formAction(data);
	});

	useEffect(() => {
		if (state.success) {
			toast(`Lesson has been ${type === "create" ? "Created" : "Updated"}`);
			setOpen(false);
			router.refresh();
		}
	}, [state, setOpen, router, type]);
	const { classes, subjects, teachers } = relatedData;

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create" : "Update"} Lesson
			</h1>

			<div className="flex justify-between gap-4 flex-wrap mb-4">
				<InputField
					label="Lesson Name"
					name="name"
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
				/>
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Day</label>
					<select
						{...register("day")}
						defaultValue={data?.day || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select a Day
						</option>
						{Object.values(Day).map((day) => (
							<option
								value={day}
								key={day}
							>
								{day}
							</option>
						))}
					</select>

					{errors.day?.message && (
						<p className=" text-xs text-red-500">
							{errors.day.message.toString()}
						</p>
					)}
				</div>
				<InputField
					label="Start time"
					name="startTime"
					defaultValue={
						data?.startTime
							? new Date(
									new Date(data.startTime).setHours(
										new Date(data.startTime).getHours() + 1
									)
							  )
									.toISOString()
									.slice(0, 16) // Formats for "YYYY-MM-DDTHH:mm"
							: ""
					}
					register={register}
					error={errors?.startTime}
					type="datetime-local"
				/>
				<InputField
					label="End time"
					name="endTime"
					defaultValue={
						data?.endTime
							? new Date(
									new Date(data.endTime).setHours(
										new Date(data.endTime).getHours() + 1
									)
							  )
									.toISOString()
									.slice(0, 16) // Formats for "YYYY-MM-DDTHH:mm"
							: ""
					}
					register={register}
					error={errors?.endTime}
					type="datetime-local"
				/>
			</div>

			<div className="flex justify-between gap-4 flex-wrap mb-4">
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Teacher</label>
					<select
						{...register("teacherId")}
						defaultValue={data?.teacherId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select a teacher
						</option>
						{teachers.map(
							(teacher: {
								id: string;
								firstName: string;
								lastName: string;
							}) => (
								<option
									value={teacher.id}
									key={teacher.id}
								>
									{teacher.firstName + " " + teacher.lastName}
								</option>
							)
						)}
					</select>
					{errors.teacherId?.message && (
						<p className=" text-xs text-red-500">
							{errors.teacherId.message.toString()}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Subject</label>
					<select
						{...register("subjectId")}
						defaultValue={data?.subjectId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select a subject
						</option>
						{subjects.map((subject: { id: number; name: string }) => (
							<option
								value={subject.id}
								key={subject.id}
							>
								{subject.name}
							</option>
						))}
					</select>
					{errors.subjectId?.message && (
						<p className=" text-xs text-red-500">
							{errors.subjectId.message.toString()}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Class</label>
					<select
						{...register("classId")}
						defaultValue={data?.classId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select a subject
						</option>
						{classes.map((classItem: { id: number; name: string }) => (
							<option
								value={classItem.id}
								key={classItem.id}
							>
								{classItem.name}
							</option>
						))}
					</select>
					{errors.classId?.message && (
						<p className=" text-xs text-red-500">
							{errors.classId.message.toString()}
						</p>
					)}
				</div>
			</div>
			{state.error && (
				<span className="text-red-500">Something went wrong!</span>
			)}
			{data && (
				<InputField
					label="Id"
					name="id"
					defaultValue={data?.id}
					register={register}
					error={errors?.id}
					hidden
				/>
			)}
			<button
				className="bg-blue-400 text-white p-2 rounded-md"
				type="submit"
			>
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
};

export default LessonForm;
