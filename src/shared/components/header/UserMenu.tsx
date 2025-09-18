import { authService } from "@modules/auth/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await authService.logout();
		setIsOpen(false);
		navigate("/login");
	};

	return (
		<div className="relative">
			<button
				type="button"
				className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md hover:bg-blue-600 transition"
				onClick={() => setIsOpen(!isOpen)}
			>
				U
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200">
					<button
						type="button"
						onClick={handleLogout}
						className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
