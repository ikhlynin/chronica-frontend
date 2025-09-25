export interface AdUnit {
	code: string;
	sizes: number[][];
	bidder: string;
	params: Record<string, string | number>;
}

export const adUnits: AdUnit[] = [
	{
		code: "ad-slot-1",
		sizes: [[300, 600]],
		bidder: "adtelligent",
		params: { aid: 350975 },
	},
];
