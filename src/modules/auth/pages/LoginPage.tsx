import { AuthSwitch, LoginForm } from "virtual:modules";

const LoginPage = () => {
	return (
		<div
			className="
				min-h-screen flex flex-col 
				justify-center items-center bg-gray-50
			"
		>
			<LoginForm />
			<AuthSwitch isLogin={true} />
		</div>
	);
};

export default LoginPage;
