export type RestaurantProps = {
	error: object | string | null;
	restaurantMembers: any[];
	flows: any[];
	restaurantRules: {
		memberAmount: string;
		societyAmount: string;
		eightyAmount: string;
		lowAmount: string;
		tempAmount: string;
		overAmount: string;
		qrCode: string;
		rulesId?: number;
	};
	templateArr: TemplateItem[];
	deviceArr: any[];
	memberInfo: any;
	transactionFlowTotal: any;
	total: number;
};

export interface TemplateItem {
	infoId: number;
	name: string;
	capturejpg: string;
}
