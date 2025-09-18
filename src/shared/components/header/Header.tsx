import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = () => {
	const navigate = useNavigate();
	return (
		<header className="flex justify-between items-center px-6 py-4 bg-gray-200 shadow-md sticky top-0 z-50">
			<button
				type="button"
				onClick={() => navigate("/")}
				className="text-2xl font-bold text-blue-500 cursor-pointer tracking-tight"
			>
				<h1>CHRONICA</h1>
			</button>

			<div className="flex items-center gap-4">
				<UserMenu />
			</div>
		</header>
	);
};

export default Header;
