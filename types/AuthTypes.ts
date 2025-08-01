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
    "MODERATOR" |
    "DEVELOPER" |
    "SUPPORT_AGENT" |
    "FINANCE_MANAGER" |
    "MARKETING_MANAGER" |
    "AUDITOR" |
    "SELLER" |
    "COMPANY_EMPLOYEE" |
    "CUSTOMER" |
    "COURIER"
export interface IUserPayload {
    phoneNumber: string;
    roles: TUserTypes[];
    nameSurname: string;
    email: string;
    sub: string;
    iat: number; // issued at (timestamp)
    exp: number; // expires at (timestamp)
};