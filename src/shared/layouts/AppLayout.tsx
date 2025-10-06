import { Outlet } from "react-router-dom";
import { AdSlot } from "../../modules/ad/AdSlot";
import Header from "../components/header/Header";

const AppLayout: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 flex gap-6 p-6">
				<div className="hidden lg:flex flex-col items-center gap-4">
					<AdSlot code="ad-slot-adtelligent" />
					<AdSlot code="ad-slot-bidmatic" />
					<AdSlot code="ad-slot-khlynin" />
				</div>
				<div className="w-4/6">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default AppLayout;
