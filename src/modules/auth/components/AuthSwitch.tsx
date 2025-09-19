import { useState } from "react";
import AuthForm from "./AuthForm";

const AuthSwitch = () => {
	const [isLoginMode, setIsLoginMode] = useState(true);
	return (
		<div>
			<AuthForm isLogin={isLoginMode} />
			<p className="text-sm text-center mt-4">
				{isLoginMode ? (
					<>
						Don’t have an account?{" "}
						<button
							type="button"
							onClick={() => setIsLoginMode(false)}
							className="text-blue-500 hover:underline"
						>
							Sign up
						</button>
					</>
				) : (
					<>
						Have an account?{" "}
						<button
							type="button"
							onClick={() => setIsLoginMode(true)}
							className="text-blue-500 hover:underline"
						>
							Log In
						</button>
					</>
				)}
			</p>
		</div>
	);
};

export default AuthSwitch;
