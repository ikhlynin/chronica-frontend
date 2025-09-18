import type { AuthSwitchProps } from "virtual:modules";
import { Link } from "react-router-dom";

const AuthSwitch = ({ isLogin }: AuthSwitchProps) => {
	return (
		<p className="text-sm text-center mt-4">
			{isLogin ? (
				<>
					Don’t have an account?{" "}
					<Link to="/signup" className="text-blue-500 hover:underline">
						Sign up
					</Link>
				</>
			) : (
				<>
					Have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Log In
					</Link>
				</>
			)}
		</p>
	);
};

export default AuthSwitch;
