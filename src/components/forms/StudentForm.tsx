"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchemas";
import { createStudent, updateStudent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { CldUploadWidget } from "next-cloudinary";

const StudentForm = ({
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
	} = useForm<StudentSchema>({ resolver: zodResolver(studentSchema) });

	const [img, setImg] = useState<any>();

	const [state, formAction] = useFormState(
		type === "create" ? createStudent : updateStudent,
		{
			success: false,
			error: false,
		}
	);

	const onSubmit = handleSubmit((data) => {
		formAction({ ...data, img: img?.secure_url });
	});
	const router = useRouter();

	useEffect(() => {
		if (state.success) {
			toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
			setOpen(false);
			router.refresh();
		}
	}, [state, setOpen, type, router]);

	const { grades, classes } = relatedData;

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create a new student" : "Update student"}
			</h1>

			<span className="text-xs text-gray-400 font-medium">
				Authentication Information
			</span>
			<div className="flex justify-between gap-4 flex-wrap mb-4">
				<InputField
					label="Username"
					name="username"
					defaultValue={data?.username}
					register={register}
					error={errors.username}
				/>
				<InputField
					label="Email"
					name="email"
					defaultValue={data?.email}
					register={register}
					error={errors.email}
				/>
				<InputField
					label="Password"
					name="password"
					defaultValue={data?.password}
					register={register}
					error={errors.password}
					type="password"
				/>
			</div>

			<span className="text-xs text-gray-400 font-medium">
				Personal Information
			</span>
			<CldUploadWidget
				uploadPreset="school"
				onSuccess={(result, { widget }) => {
					setImg(result.info);
					widget.close();
				}}
			>
				{({ open }) => {
					return (
						<div
							className="text-xs text-gray-400 flex items-center justify-center gap-2 cursor-pointer w-[200px] "
							onClick={() => open()}
						>
							{img ? (
								<Image
									src={img.secure_url}
									alt=""
									width={100}
									height={100}
									className="rounded-md"
								/>
							) : (
								<>
									<Image
										src="/upload.png"
										alt=""
										width={28}
										height={28}
									/>
									<span>Upload a photo</span>
								</>
							)}
						</div>
					);
				}}
			</CldUploadWidget>
			<div className="flex justify-between gap-4 flex-wrap">
				<InputField
					label="First Name"
					name="firstName"
					defaultValue={data?.firstName}
					register={register}
					error={errors.firstName}
				/>
				<InputField
					label="Last Name"
					name="lastName"
					defaultValue={data?.lastName}
					register={register}
					error={errors.lastName}
				/>
				<InputField
					label="Phone"
					name="phone"
					defaultValue={data?.phone}
					register={register}
					error={errors.phone}
				/>
				<InputField
					label="Address"
					name="address"
					defaultValue={data?.address}
					register={register}
					error={errors.address}
				/>
				<InputField
					label="Blood Type"
					name="bloodType"
					defaultValue={data?.bloodType}
					register={register}
					error={errors.bloodType}
				/>
				<InputField
					label="Birthday"
					name="birthday"
					defaultValue={data?.birthday.toISOString().split("T")[0]}
					register={register}
					error={errors.birthday}
					type="date"
				/>
				<InputField
					label="Parent Id"
					name="parentId"
					defaultValue={data?.parentId}
					register={register}
					error={errors.parentId}
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
					<label className="text-xs text-gray-400">Sex</label>
					<select
						{...register("sex")}
						defaultValue={data?.sex}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option value="MALE">Male</option>
						<option value="FEMALE">Female</option>
					</select>
					{errors.sex?.message && (
						<p className=" text-xs text-red-500">
							{errors.sex.message.toString()}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Grades</label>
					<select
						{...register("gradeId")}
						defaultValue={data?.gradeId}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
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
				<div className="flex flex-col gap-2 w-full md:w-1/4">
					<label className="text-xs text-gray-400">Classes</label>
					<select
						{...register("classId")}
						defaultValue={data?.classId}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						{classes.map(
							(classItem: {
								id: number;
								name: string;
								capacity: number;
								_count: { students: number };
							}) => (
								<option
									value={classItem.id}
									key={classItem.id}
								>
									({classItem.name} -{" "}
									{classItem._count.students + "/" + classItem.capacity}{" "}
									Capacity )
								</option>
							)
						)}
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
			<button
				className="bg-blue-400 text-white p-2 rounded-md"
				type="submit"
			>
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
};

export default StudentForm;
