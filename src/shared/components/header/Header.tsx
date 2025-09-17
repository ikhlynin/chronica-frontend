import UserMenu from "./UserMenu";

const Header = () => {
	return (
		<header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
			<h1>CHRONICA</h1>
			<UserMenu />
		</header>
	);
};

export default Header;
