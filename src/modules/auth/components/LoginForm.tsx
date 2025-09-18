import { authService, InputField, SubmitButton } from "virtual:modules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(3, "At least 3 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});
	const navigate = useNavigate();
	const onSubmit = async (data: LoginFormValues) => {
		try {
			await authService.login(data.email, data.password);
			navigate("/feed");
		} catch (error) {
			console.error("Login failed", error);
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
			<InputField
				{...register("password")}
				type="password"
				placeholder="Password"
				error={errors.password?.message}
			/>
			<SubmitButton type="submit">Login</SubmitButton>
		</form>
	);
};

export default LoginForm;
