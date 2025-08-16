export interface IUser {
    email?: string;
    firstName: string;
    gender: string;
    id: string;
    lastLoginDate: string;
    lastName: string;
    roles: TUserRoles[];
}



export type TUserRoles = "SUPER_ADMIN" |
    "ADMIN" |
    "AUDITOR" |
    "FINANCE_MANAGER" |
    "MARKETING_MANAGER" |
    "MODERATOR" |
    "DEVELOPER" |
    "SELLER_SUPPORT" |

    "SELLER" |
    "SELLER_EMPLOYEE" |
    "SELLER_MARKETING_MANAGER" |
    "SELLER_FINANCE_MANAGER" |
    "CUSTOMER" |
    "COURIER"