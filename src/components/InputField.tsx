import { FieldError } from "react-hook-form";
import classNames from "classnames";

type InputFiledProps = {
	label: string;
	type?: string;
	textarea?: boolean;
	register: any;
	name: string;
	defaultValue?: string;
	error?: FieldError;
	hidden?: boolean;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement> &
		React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const InputField = ({
	label,
	type = "text",
	textarea = false,
	register,
	name,
	defaultValue,
	error,
	hidden,
	inputProps,
}: InputFiledProps) => {
	return (
		<div
			className={classNames("flex flex-col gap-2 w-full", {
				hidden: hidden,
				"md:w-1/3": !textarea,
			})}
		>
			<label className="text-xs text-gray-400">{label}</label>
			{textarea ? (
				<textarea
					{...register(name)}
					className={classNames(
						"ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm",
						{
							"ring-red-500": error,
						}
					)}
					{...inputProps}
					defaultValue={defaultValue}
					rows={10}
					// cols={10}
				/>
			) : (
				<input
					type={type}
					{...register(name)}
					className={classNames(
						"ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm",
						{
							"ring-red-500": error,
						}
					)}
					{...inputProps}
					defaultValue={defaultValue}
				/>
			)}

			{error?.message && (
				<p className=" text-xs text-red-500">{error.message.toString()}</p>
			)}
		</div>
	);
};

export default InputField;
