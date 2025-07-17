export type CommunityProps = {
    error: object | string | null;
    communitys: CommunityItem[];
    total: number;
};
export interface CommunityItem {
    createBy?: string;
    createById?: number;
    createTime: string;
    updateBy?: string;
    updateById?: number;
    updateTime?: string;
    remark?: string;
    status: string;
    communityId: number;
    township: string;
    village: string;
    name: string;
}
//# sourceMappingURL=community.d.ts.map