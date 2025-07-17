import { FunctionComponent, ReactElement } from 'react';
import { ChipProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { AccountStateProps } from './account';
import { MenuProps } from './menu';
import { RoleProps } from './role';
import { MemberProps } from './member';
import { SubjectProps } from './subject';
import { CommuneProps } from './commune';
import { DailyProps } from './daily';
import { UserProps } from './user';
import { VoucherProps } from './voucher';
import { LedgerProps } from './ledger';
import { DividendProps } from './dividend';
import { InvestmentProps } from './investment';
import { StockSharesProps } from './stock-shares';
import { CommunityProps } from './community';
import { AuthorizedProps } from './authorized';
export interface DefaultRootStateProps {
    account: AccountStateProps;
    menu: MenuProps;
    members: MemberProps;
    role: RoleProps;
    subject: SubjectProps;
    commune: CommuneProps;
    daily: DailyProps;
    user: UserProps;
    voucher: VoucherProps;
    ledger: LedgerProps;
    dividend: DividendProps;
    investment: InvestmentProps;
    stockshares: StockSharesProps;
    community: CommunityProps;
    authorized: AuthorizedProps;
}
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};
export interface GenericCardProps {
    title?: string;
    primary?: string | number | undefined;
    secondary?: string;
    content?: string;
    image?: string;
    dateTime?: string;
    iconPrimary?: OverrideIcon;
    color?: string;
    size?: string;
}
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';
export type NavItemTypeObject = {
    children?: NavItemType[];
    items?: NavItemType[];
    type?: string;
};
export type NavItemType = {
    id?: string;
    icon?: GenericCardProps['iconPrimary'] | string;
    target?: boolean;
    external?: string;
    url?: string | undefined;
    type?: string;
    title?: React.ReactNode | string;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    caption?: React.ReactNode | string;
    breadcrumbs?: boolean;
    disabled?: boolean;
    chip?: ChipProps;
};
export type OverrideIcon = (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
}) | React.ComponentClass<any> | FunctionComponent<any> | undefined;
export type GuardProps = {
    children: ReactElement | null;
};
//# sourceMappingURL=index.d.ts.map