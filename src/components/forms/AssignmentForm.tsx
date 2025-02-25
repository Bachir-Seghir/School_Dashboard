"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";

import InputField from "../InputField";
import { assignmentSchema, AssignmentSchema } from "@/lib/schemas";
import { createAssignment, updateAssignment } from "@/lib/actions";

const AssignmentForm = ({
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
	} = useForm<AssignmentSchema>({ resolver: zodResolver(assignmentSchema) });

	const { lessons } = relatedData;

	const [state, formAction] = useFormState(
		type === "create" ? createAssignment : updateAssignment,
		{
			success: false,
			error: false,
		}
	);

	const router = useRouter();

	const onSubmit = handleSubmit((data) => {
		formAction(data);
	});

	useEffect(() => {
		if (state.success) {
			toast(
				`Assignment has been ${type === "create" ? "created" : "updated"}!`
			);
			setOpen(false);
			router.refresh();
		}
	}, [state, router, type, setOpen]);

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create" : "Update"} Assignment
			</h1>

			<div className="flex justify-between gap-4 flex-wrap mb-4">
				<InputField
					label="Title"
					name="title"
					defaultValue={data?.title}
					register={register}
					error={errors.title}
				/>

				<InputField
					label="Start Date"
					name="startDate"
					defaultValue={data?.startDate.toISOString().split("T")[0]}
					register={register}
					error={errors.startDate}
					type="date"
				/>
				<InputField
					label="Due Date"
					name="dueDate"
					defaultValue={data?.dueDate.toISOString().split("T")[0]}
					register={register}
					error={errors.dueDate}
					type="date"
				/>
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
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Lesson</label>
					<select
						{...register("lessonId")}
						defaultValue={data?.lessonId}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						{lessons.map((lesson: { id: number; name: string }) => (
							<option
								value={lesson.id}
								key={lesson.id}
							>
								{lesson.name}
							</option>
						))}
					</select>
					{errors.lessonId?.message && (
						<p className=" text-xs text-red-500">
							{errors.lessonId.message.toString()}
						</p>
					)}
				</div>
			</div>

			<button
				className="bg-blue-400 text-white p-2 rounded-md"
				type="submit"
			>
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
};

export default AssignmentForm;
