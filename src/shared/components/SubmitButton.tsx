interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			className={`w-full rounded p-2 text-white ${
				props.className ? props.className : "bg-blue-500 hover:bg-blue-600"
			}`}
		>
			{children}
		</button>
	);
};

export default Button;
