import { AuthSwitch, SignupForm } from "virtual:modules";

const RegisterPage = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
			<SignupForm />
			<AuthSwitch isLogin={false} />
		</div>
	);
};

export default RegisterPage;
