import { authService } from "virtual:modules";
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
				className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			></button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden">
					<button
						type="button"
						onClick={handleLogout}
						className="block w-full text-left px-4 py-2 hover:bg-gray-100"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
