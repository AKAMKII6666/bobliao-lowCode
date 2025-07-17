// ==============================|| MENU TYPES  ||============================== //

export type MealProps = {
	error: object | string | null;
	seatInfo: SeatInfoItem | null;
	seats: SeatItem[];
	allSeats: SeatFullItem[];
	isLoadingAllSeatsData: boolean;
	reservationArr: ReservationItem[];
	invitationInfo: InvitationInfoItem | null;
	total: number;
	mealArr: MealItem[];
	allMeal: MealItem[];
	setMealArr: any[];
	reservationList: any[];
	reservationList_total: number;
	allSetMealArr: SetMealItem[];
	templateArr: TemplateItem[];
	tableStatistics: TableStatistics;
};

export interface TemplateItem {
	label: string;
	value: string;
	templateCover: string;
	isWrite: string;
	writeLabel: string;
}

export interface InvitationInfoItem {
	remark: string;
	invitationId: number;
	welcomeMessage: string;
	closingMessage: string;
	prompt: string;
	address: string;
	topImages?: string;
	bottomImages?: string;
	isShowHotel?: string;
}

export interface SeatInfoItem {
	createBy: string;
	createById: number;
	createTime: string;
	updateBy: string;
	updateById: number;
	updateTime: string;
	remark: string | null;
	tableId: number;
	tableNumber: string;
	tableName: string;
	tableType: string;
	capacity: number;
	status: string;
}

export interface SeatItem {
	/* 餐位容量 */
	capacity: number;
	/* 餐位名称 */
	tableName: string;
	tableNumber?: string;
	/* 餐位类型 */
	tableType: string;
	/* 餐位id */
	tableId?: number;
	/* 状态 */
	status: string;
	/* 说明 */
	remark?: string;
	/* 创建时间 */
	createTime?: string;
	/* 附件 */
	annexs?: string;
}

/* 邀请项目 */
export interface ReservationItem {
	//电话号码
	phone: string;
	/* 预约开始时间 */
	startTime: string;
	/* 预约结束时间 */
	endTime: string;
	/* 多少人 */
	numberOfPeople: number;
	/* 桌号 */
	tableId: number | null;
	/* 连桌桌号 1,2,3,4,5,6 */
	tableIds: string | null;
	/* 连桌桌桌名 xx,xx,xx,xx */
	tableNames: string | null;
	/* 预定类型 0:单桌 1:连桌 */
	resType: string;
	/* 联系人 */
	contact: string;
	depositInfo: string;
	/* 预定日期 */
	reservationDate: string;
	/* 预定id */
	reservationId?: number;
	/* 备注 */
	remark?: string;
	/* 预定类型 0:午餐 1:晚餐 */
	reservationType: string;
	/* 销售id */
	saleId: number;
	/* 使用的邀请函的id */
	invitationId: number | string;
	/* 邀请函的备注 */
	invitationRemark?: string;
	packageId?: number;
	reservDishes: any[];
}

export interface SeatFullItem {
	capacity: number;
	tableName: string;
	tableNumber?: string;
	tableType: string;
	tableId?: number;
	status: string;
	remark?: string;
	createTime?: string;
	reservations: ReservationItem[];
}

export interface QuerySeatParams {
	tableType: string;
	pageNum: number;
	pageSize: number;
	"params[beginTime]": string;
	"params[endTime]": string;
	"params[startNum]": number;
	"params[endNum]": number;
}

export interface MealItem {
	dishCode: string;
	name: string;
	price: string | number;
	annexs: string;
	dishId: number;
}

export interface QueryMealParams {
	name?: string;
	pageNum?: number;
	pageSize?: number;
	"params[beginTime]"?: string;
	"params[endTime]"?: string;
}

export interface MealInfoItem {
	name: string;
	price: string | number;
	annexs: string;
	dishId?: number;
}

export interface PackageDishItem {
	dishId: number | string;
	name?: string;
	num: number;
}

export interface SetMealItem {
	packageCode?: string;
	packageId?: number;
	packageDishes: PackageDishItem[];
	name: string;
	price: string | number;
	annexs: string;
}

export interface TableStatistics {
	totalReservation: number;
	yesterdayReservation: number;
	todayReservation: number;
	monthReservation: number;
}
