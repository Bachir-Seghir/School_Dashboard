"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";

const SubjectForm = ({
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
	} = useForm<SubjectSchema>({ resolver: zodResolver(subjectSchema) });

	const [state, formAction] = useFormState(
		type === "create" ? createSubject : updateSubject,
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
			toast(`Subject has been ${type === "create" ? "created" : "updated"}`);
			setOpen(false);
			router.refresh();
		}
	}, [state]);

	const { teachers } = relatedData;

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create" : "Update"} Subject
			</h1>

			<div className="flex justify-between gap-4 flex-wrap mb-4">
				<InputField
					label="Subject Name"
					name="name"
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
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
			</div>
			<div className="flex flex-col gap-2 w-full md:w-1/4">
				<label className="text-xs text-gray-400">Teachers</label>
				<select
					multiple
					{...register("teachers")}
					defaultValue={data?.teachers}
					className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
				>
					{teachers.map(
						(teacher: { id: string; firstName: string; lastName: string }) => (
							<option
								value={teacher.id}
								key={teacher.id}
							>
								{teacher.firstName + " " + teacher.lastName}
							</option>
						)
					)}
				</select>
				{errors.teachers?.message && (
					<p className=" text-xs text-red-500">
						{errors.teachers.message.toString()}
					</p>
				)}
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

export default SubjectForm;
