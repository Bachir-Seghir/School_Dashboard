"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { resultSchema, ResultSchema } from "@/lib/schemas";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createResult, updateResult } from "@/lib/actions";

const ResultForm = ({
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
	} = useForm<ResultSchema>({ resolver: zodResolver(resultSchema) });

	const router = useRouter();

	const [state, formAction] = useFormState(
		type === "create" ? createResult : updateResult,
		{
			success: false,
			error: false,
		}
	);

	const onSubmit = handleSubmit((data) => {
		formAction(data);
	});

	useEffect(() => {
		if (state.success) {
			toast(`Lesson has been ${type === "create" ? "Created" : "Updated"}`);
			setOpen(false);
			router.refresh();
		}
	}, [state, setOpen, router, type]);

	const { students, exams, assignments } = relatedData;

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create" : "Update"} Result
			</h1>

			<div className="flex justify-between gap-4 flex-wrap mb-4">
				<InputField
					label="Score"
					name="score"
					defaultValue={data?.score}
					register={register}
					error={errors?.score}
					type="number"
				/>

				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Student</label>
					<select
						{...register("studentId")}
						defaultValue={data?.studentId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select a Student
						</option>
						{students.map(
							(student: {
								id: string;
								firstName: string;
								lastName: string;
							}) => (
								<option
									value={student.id}
									key={student.id}
								>
									{student.firstName + " " + student.lastName}
								</option>
							)
						)}
					</select>
					{errors.studentId?.message && (
						<p className=" text-xs text-red-500">
							{errors.studentId.message.toString()}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Exam</label>
					<select
						{...register("examId")}
						defaultValue={data?.examId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select an Exam
						</option>
						{exams.map((exam: { id: number; title: string }) => (
							<option
								value={exam.id}
								key={exam.id}
							>
								{exam.title}
							</option>
						))}
					</select>
					{errors.examId?.message && (
						<p className=" text-xs text-red-500">
							{errors.examId.message.toString()}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Assignment</label>
					<select
						{...register("assignmentId")}
						defaultValue={data?.assignmentId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option
							value=""
							disabled
						>
							Select an assignment
						</option>
						{assignments.map((assignment: { id: number; title: string }) => (
							<option
								value={assignment.id}
								key={assignment.id}
							>
								{assignment.title}
							</option>
						))}
					</select>
					{errors.assignmentId?.message && (
						<p className=" text-xs text-red-500">
							{errors.assignmentId.message.toString()}
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

export default ResultForm;
