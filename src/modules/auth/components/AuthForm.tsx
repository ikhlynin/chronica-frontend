import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@shared/components/InputField";
import SubmitButton from "@shared/components/SubmitButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { authService } from "../auth.service";

interface AuthFormProps {
	isLogin: boolean;
}

const loginSchema = z.object({
	email: z.email("Invalid email"),
	password: z.string().min(3, "At least 3 characters"),
});

const signupSchema = z.object({
	email: z.email("Invalid email"),
	name: z.string().min(1, "At least 1 characters"),
	password: z.string().min(3, "At least 3 characters"),
});

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
	const schema = isLogin ? loginSchema : signupSchema;
	type FormValues = z.infer<typeof schema>;

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: FormValues) => {
		try {
			if (isLogin) {
				await authService.login(data.email, data.password);
			} else {
				await authService.signup(
					data.email,
					(data as z.infer<typeof signupSchema>).name,
					data.password,
				);
			}
			navigate("/feed");
		} catch (error) {
			let message = "Something went wrong";
			if (error instanceof Error) {
				message = error.message;
			}
			setError("root", { type: "server", message });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 max-w-sm mx-auto"
		>
			<InputField
				{...register("email")}
				placeholder="Email"
				error={errors.email?.message}
			/>

			{!isLogin && (
				<InputField
					{...register("name")}
					placeholder="Name"
					error={errors.name?.message}
				/>
			)}

			<InputField
				{...register("password")}
				type="password"
				placeholder="Password"
				error={errors.password?.message}
			/>
			{errors.root && (
				<p className="text-red-500 text-sm">{errors.root.message}</p>
			)}
			<SubmitButton type="submit">{isLogin ? "Login" : "Signup"}</SubmitButton>
		</form>
	);
};

export default AuthForm;
