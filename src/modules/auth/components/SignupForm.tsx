import { InputField, SubmitButton } from "virtual:modules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
	email: z.string().email("Invalid email"),
	name: z.string().min(3, "At least 3 characters"),
	password: z.string().min(3, "At least 3 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: SignupFormValues) => {
		console.log(data);
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
				{...register("name")}
				placeholder="Name"
				error={errors.name?.message}
			/>
			<InputField
				{...register("password")}
				type="password"
				placeholder="Password"
				error={errors.password?.message}
			/>
			<SubmitButton type="submit">Register</SubmitButton>
		</form>
	);
};

export default SignupForm;
