export interface AccountProfile {
  id: string;
  firstName?: string;
  job?: string;
  lastName?: string;
  progress?: number;
  role: string;
  roles: any[];
  admin?: boolean;
  avatar?: string;
  createBy?: string;
  email?: string;
  nickName?: string;
  phonenumber: string;
  orgName: string;
  remark?: string;
  status?: string;
  sex?: string;
  workNo?: string;
  userName: string;
  userId: number;
}

export interface AccountStateProps {
  accoutProfile: AccountProfile | null | undefined;
  error: object | string | null;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  firstLanding: boolean;
  isInitialized?: boolean;
  account?: AccountProfile | null | undefined;
  menus: any[];
  closureUser: string[];
  detectionRole: (roles: string[]) => boolean;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
  updata: () => Promise<void>;
  login: (
    username: string,
    password: string,
    uuid: string,
    code: string
  ) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;

  updateProfile: VoidFunction;
};

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  firstLanding: boolean;
  account?: AccountProfile | null | undefined;
  closureUser: string[];
  menus: any[];
}
