interface AdSlotProps {
	code: string;
}

export const AdSlot = ({ code }: AdSlotProps) => {
	return (
		<iframe
			title={code}
			id={code}
			style={{ border: 0 }}
			className="border-0 block max-w-full max-h-full"
			scrolling="no"
		/>
	);
};
