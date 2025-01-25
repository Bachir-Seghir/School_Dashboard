"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { classSchema, ClassSchema } from "@/lib/formValidationSchemas";
import { createClass, updateClass } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";

const ClassForm = ({
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
	} = useForm<ClassSchema>({ resolver: zodResolver(classSchema) });

	const [state, formAction] = useFormState(
		type === "create" ? createClass : updateClass,
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
			toast(`Class has been ${type === "create" ? "created" : "updated"}`);
			setOpen(false);
			router.refresh();
		}
	}, [state]);

	const { teachers, grades } = relatedData;

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create" : "Update"} Class
			</h1>

			<div className="flex justify-between gap-4 flex-wrap mb-4">
				<InputField
					label="Class Name"
					name="name"
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
				/>
				<InputField
					label="Capacity"
					name="capacity"
					defaultValue={data?.capacity}
					register={register}
					error={errors?.capacity}
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
					<label className="text-xs text-gray-400">Supervisor</label>
					<select
						{...register("supervisorId")}
						defaultValue={data?.supervisorId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select a supervisor
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

					{errors.supervisorId?.message && (
						<p className=" text-xs text-red-500">
							{errors.supervisorId.message.toString()}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Grade</label>
					<select
						{...register("gradeId")}
						defaultValue={data?.gradeId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select a grade
						</option>
						{grades.map((grade: { id: number; level: number }) => (
							<option
								value={grade.id}
								key={grade.id}
							>
								{grade.level}
							</option>
						))}
					</select>
					{errors.gradeId?.message && (
						<p className=" text-xs text-red-500">
							{errors.gradeId.message.toString()}
						</p>
					)}
				</div>
			</div>
			{state.error && (
				<span className="text-red-500">Something went wrong!</span>
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

export default ClassForm;
