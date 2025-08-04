interface ISellerRegister {
  name: string;
  categoryId: string[];
  email: string;
  gsmNumber: string;
  alternativePhoneNumber: string;
  supportPhoneNumber: string;
  shippingCompanyId: string[];
  taxNumber: string;
  logo?: string;
  taxOffice: string;
  merisNumber: string;
  registrationDate: string; // ISO format (Date string)
  contactPersonNumber: string;
  contactPersonTitle: string;
  address: Address[];
  bankAccount: BankAccount[];
}

interface Address {
  city: string;
  street: string;
  postalCode: string;
  buildNo: string;
  doorNumber: string;
  detailAddress: string;
  country: string;
}

interface BankAccount {
  iban: string;
  accountName: string;
  bankName: string;
  isActive: boolean;
}
