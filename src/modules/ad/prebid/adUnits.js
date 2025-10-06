export const adUnits = [
	{
		code: "ad-slot-adtelligent",
		mediaTypes: { banner: { sizes: [[300, 600]] } },
		bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
	},
	{
		code: "ad-slot-bidmatic",
		mediaTypes: { banner: { sizes: [[300, 250]] } },
		bids: [{ bidder: "bidmatic", params: { source: "886409" } }],
	},
	{
		code: "ad-slot-khlynin",
		mediaTypes: { banner: { sizes: [[349, 109]] } },
		bids: [
			{
				bidder: "khlyninAdapter",
				params: {
					placementId: "67890",
					size: [349, 109],
				},
			},
		],
	},
];
