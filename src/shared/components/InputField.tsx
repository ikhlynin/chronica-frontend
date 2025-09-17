interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

const InputField = ({ error, ...props }: InputFieldProps) => {
	return (
		<div>
			<input
				{...props}
				className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default InputField;
