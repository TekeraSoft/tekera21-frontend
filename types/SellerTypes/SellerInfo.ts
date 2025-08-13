import { IShippingCompany } from "./ShippingCompanies";

export type TVerification = "PENDING" | "CANCELLED" | "REJECTED" | "VERIFIED" | "NONE"

export interface ISellerInfo {
    verificationStatus: TVerification;
    id: string;
    name: string;
    slug: string;
    categories: ICategory[];
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
    identityDocumentPaths: IIdentityDocument[];
    rate: number;
}

export interface ICompany {
    id: string;
    name: string;
    slug: string;
    categories: ICategory[];
    logo: string;
    email: string;
    gsmNumber: string;
    alternativePhoneNumber: string;
    supportPhoneNumber: string;
    taxNumber: string;
    taxOffice: string;
    merisNumber: string;
    registrationDate: string;
    contactPersonNumber: string;
    contactPersonTitle: string;
    address: IAddress[];
    shippingCompanies: IShippingCompany[];
    bankAccounts: IBankAccount[];
    identityDocumentPaths: IIdentityDocument[];
    rate: number;
    verificationStatus: TVerification; // Enum
}

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

export interface ISellerContent {
    sellerUser: ISellerUser;
    seller: ICompany;
    sellerDocuments: IIdentityDocument[];
    sellerExtraDocument: any[]; // Henüz içerik yok, tanımlandığında detaylandırılabilir
    esignature: boolean;
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

interface SellerUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: "MALE" | "FEMALE"; // başka gender yoksa enum gibi kısıtlı tutabilirsin
    birthDate: string; // ISO tarih formatı
}

interface Supervisor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: "MALE" | "FEMALE";
    birthDate: string;
}

interface Seller {
    id: string;
    name: string;
    slug: string;
    categories: any[]; // tipini biliyorsan değiştirebilirsin
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
    address: any[]; // tipini biliyorsan değiştir
    shippingCompanies: any[];
    bankAccounts: any[];
    sellerDocument: any[];
    rate: number;
    verificationStatus: TVerification; // sistemdeki enum değerlerine göre ekleyebilirsin
}

export interface INewSellerRegisterData {
    sellerUser: SellerUser;
    supervisor: Supervisor;
    seller: Seller;
}
