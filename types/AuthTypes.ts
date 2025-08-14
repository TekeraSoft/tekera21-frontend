export interface ISignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    gsmNumber: string;
    password: string;
    gender: "MALE" | "FEMALE",
    birthDate: string
}

export interface ILogin {
    email: string,
    password: string
}

export type TUserTypes = "SUPER_ADMIN" |
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


export interface IUserPayload {
    phoneNumber: string;
    roles: TUserTypes[];
    nameSurname: string;
    sellerId: string;
    userId: string;
    email: string;
    sub: string;
    iat: number; // issued at (timestamp)
    exp: number; // expires at (timestamp)
};