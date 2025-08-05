import { IShippingCompany } from "./ShippingCompanies";

export type TVerification = "PENDING" | "CANCELLED" | "REJECTED" | "VERIFIED" | "NONE"

export interface ISellerInfo {
    status: TVerification
    id: string;
    name: string;
    slug: string;
    categories: Category[];
    logo: string;
    email: string;
    gsmNumber: string;
    alternativePhoneNumber: string;
    shippingCompanies: IShippingCompany[]
    supportPhoneNumber: string;
    taxNumber: string;
    taxOffice: string;
    merisNumber: string;
    registrationDate: string; // ISO string
    contactPersonNumber: string;
    contactPersonTitle: string;
    address: Address[];
    bankAccounts: BankAccount[];
    identityDocumentPaths: IdentityDocument[];
    rate: number;
}

export interface ICompany {
    id: string
    name: string
    email: string
    logo: string;
    categories: Category[];
    gsmNumber: string
    taxNumber: string
    taxOffice: string
    merisNumber: string;
    registrationDate: string
    contactPersonTitle: string
    shippingCompanies: IShippingCompany[]
    bankAccounts: BankAccount[];
    address: Address[];
    verificationStatus: TVerification
    identityDocumentPaths: {
        documentTitle: string
        documentPath: string
        verificationStatus: TVerification
    }[]
}

export interface Category {
    id: string;
    name: string;
    image: string;
}

export interface Address {
    id: string;
    city: string;
    street: string;
    postalCode: string;
    buildNo: string;
    doorNumber: string;
    detailAddress: string;
    country: string;
    createdAt: string;
    updatedAt: string;
}

export interface BankAccount {
    iban: string;
    accountName: string;
    bankName: string;
    isActive: boolean;
}

export interface IdentityDocument {
    documentTitle: "IDENTITY_NUMBER"
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
