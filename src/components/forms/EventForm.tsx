"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { eventSchema, EventSchema } from "@/lib/schemas";
import { useFormState } from "react-dom";
import { createEvent, updateEvent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EventForm = ({
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
	} = useForm<EventSchema>({ resolver: zodResolver(eventSchema) });

	const router = useRouter();

	const [state, formAction] = useFormState(
		type === "create" ? createEvent : updateEvent,
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
			toast(`Event has been ${type === "create" ? "created" : "updated"}`);
			setOpen(false);
			router.refresh();
		}
	}, [state, type, router, setOpen]);

	const { classes } = relatedData;

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create" : "Update"} Event
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
					label="Start Time"
					name="startTime"
					defaultValue={data?.startTime.toISOString().slice(0, 16)}
					register={register}
					error={errors.startTime}
					type="datetime-local"
				/>
				<InputField
					label="End Time"
					name="endTime"
					defaultValue={data?.endTime}
					register={register}
					error={errors.endTime}
					type="time"
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
						defaultValue={data?.classId}
						className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
					>
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

			<button
				className="bg-blue-400 text-white p-2 rounded-md"
				type="submit"
			>
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
};

export default EventForm;
