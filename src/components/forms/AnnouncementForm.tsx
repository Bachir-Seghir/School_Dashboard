"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { announcementSchema, AnnouncementSchema } from "@/lib/schemas";
import { createAnnouncement, updateAnnouncement } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";

const AnnouncementForm = ({
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
	} = useForm<AnnouncementSchema>({
		resolver: zodResolver(announcementSchema),
	});

	const [state, formAction] = useFormState(
		type === "create" ? createAnnouncement : updateAnnouncement,
		{
			success: false,
			error: false,
		}
	);
	const onSubmit = handleSubmit((data) => {
		formAction(data);
	});

	const router = useRouter();
	useEffect(() => {
		if (state.success) {
			toast(
				`Announcement has been ${type === "create" ? "created" : "updated"}!`
			);
			setOpen(false);
			router.refresh();
		}
	}, [state, router, type, setOpen]);

	const { classes } = relatedData;
	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create" : "Update"} Announcement
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
					label="Date"
					name="date"
					defaultValue={data?.date.toISOString().split("T")[0]}
					register={register}
					error={errors.date}
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
					<label className="text-xs text-gray-400">Class</label>
					<select
						{...register("classId")}
						defaultValue={data?.classId || ""}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
						<option value="">Public</option>
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

			<div className="flex justify-between gap-4 flex-wrap">
				<InputField
					label="Description"
					name="description"
					defaultValue={data?.description || ""}
					register={register}
					error={errors.description}
					textarea
				/>
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

export default AnnouncementForm;
