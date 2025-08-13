import { IShippingCompany } from "./ShippingCompanies";

export type TVerification = "PENDING" | "CANCELLED" | "REJECTED" | "VERIFIED" | "NONE"


export interface ICategory {
    id: string;
    name: string;
    image: string;
}

export interface IAddress {
    city: string;
    street: string;
    postalCode: string;
    buildNo: string;
    doorNumber: string;
    detailAddress: string;
    country: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBankAccount {
    iban: string;
    accountName: string;
    bankName: string;
    isActive: boolean;
}

export interface ISellerUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: "MALE" | "FEMALE"; // Enum olarak genişletilebilir
    birthDate: string; // ISO tarih stringi
}


export interface IIdentityDocument {
    documentTitle: "IDENTITY_DOCUMENT_COPY"
    | "TAX_CERTIFICATE"
    | "SIGNATURE_CIRCULAR"
    | "COMMERCIAL_REGISTER_GAZETTE"
    | "PTS"
    | "MINISTRY_OF_AGRICULTURE_PERMITS"
    | "CE_CERTIFICATE"
    | "GUARANTEE_DOCUMENT"
    documentPath: string;
    verificationStatus: TVerification; // varsayılan 3 durum
}


// -----



interface Supervisor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: "MALE" | "FEMALE";
    birthDate: string;
}

export interface ISellerInfo {
    id: string;
    name: string;
    slug: string;
    categories: ICategory[]; // tipini biliyorsan değiştirebilirsin
    logo: string;
    email: string;
    gsmNumber: string;
    alternativePhoneNumber: string;
    supportPhoneNumber: string;
    taxNumber: string;
    taxOffice: string;
    merisNumber: string;
    registrationDate: string; // ISO datetime
    contactPersonNumber: string;
    contactPersonTitle: string;
    address: IAddress[]; // tipini biliyorsan değiştir
    shippingCompanies: IShippingCompany[];
    bankAccounts: IBankAccount[];
    sellerDocument: IIdentityDocument[];
    rate: number;
    verificationStatus: TVerification; // sistemdeki enum değerlerine göre ekleyebilirsin
}

export interface INewSellerRegisterData {
    sellerUser: ISellerUser;
    supervisor: Supervisor;
    seller: ISellerInfo;
}
