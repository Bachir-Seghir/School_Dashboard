"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { parentSchema, ParentSchema } from "@/lib/schemas";
import { useFormState } from "react-dom";
import { createParent, updateParent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ParentForm = ({
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
	} = useForm<ParentSchema>({ resolver: zodResolver(parentSchema) });

	const router = useRouter();

	const [state, formAction] = useFormState(
		type === "create" ? createParent : updateParent,
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
			toast(`Parent has been ${type === "create" ? "created" : "updated"}`);
			setOpen(false);
			router.refresh();
		}
	}, [state, type, setOpen, router]);

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={onSubmit}
		>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create a new Parent" : "Update Parent"}
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

export default ParentForm;
