export const companies = {
  Arzuamber: {
    id: 1110123,
    name: "ARZUAMBER MODA", // Mağaza adı
    email: "arzuamber@gmail.com", // Genel iletişim e-postası
    logo: "https://arzuamber.com/_next/image?url=%2Fimages%2Flogo%2Ffooterlogo.png&w=256&q=75",
    gsmNumber: "+90 532 532 3232", // Cep telefonu
    alternativePhoneNumber: "+90 212 652 5322", // Alternatif telefon
    supportPhoneNumber: "+90 850 546 7569", // Destek hattı
    score: 9.65, // Mağaza puanı
    isActive: true,
    follower: 58, // Takipçi sayısı
    operationStatus: "Normal", // Operasyon durumu
    taxNumber: "1234567890", // Vergi numarası
    taxOffice: "İstanbul Vergi Dairesi", // Vergi dairesi
    registrationDate: "2022-06-15T10:30:00", // kayıt tarihi
    merisNumber: "MERIS-456789", // MERİS numarası
    kepAddress: "arzuamber@hs01.kep.tr", // KEP (Kayıtlı Elektronik Posta) adresi
    companyType: "Limited Şirketi", // Şirket türü
    companyTitle: "Arzuamber Moda Sanayi ve Ticaret Limited Şirketi", // Şirket unvanı

    // Şirket sahibi bilgileri
    companyOwner: {
      nationalId: "12345678901", // TC Kimlik No
      nationality: "T.C.", // Vatandaşlık
      birthDate: "1985-03-22", // Doğum tarihi
      fullName: "Ali Poosteeny", // Ad Soyad
      birthPlace: "İstanbul", // Doğum yeri
      email: "arzuamber-owner@gmail.com", // Sahip mail adresi
      address: "Kadıköy, İstanbul, Türkiye", // Sahip adresi
    },

    // Siparişler
    totalOrders: 3500,
    todaysOrders: 0,
    cancelledOrders: 150,
    pendingOrders: 25,

    // Ürünler
    totalProducts: 240,
    approvedProducts: 230,
    pendingApprovalProducts: 5,
    rejectedProducts: 5,

    // Adresler
    address: [
      {
        city: "İstanbul",
        street: "Cumhuriyet Mah. İnönü Cad.",
        postalCode: "34387",
        buildNo: "12A",
        doorNumber: "5",
        detailAddress: "3. Kat, Daire 5, Tekera Plaza",
        country: "Türkiye",
      },
    ],
    billingAddress: {
      // Fatura adresi
      city: "İstanbul",
      street: "Fatura Mah. Vergi Cad.",
      postalCode: "34000",
      buildNo: "34",
      doorNumber: "8",
      detailAddress: "Fatura Plaza, Kat 2",
      country: "Türkiye",
    },
    shippingAddress: {
      // Sevkiyat adresi
      city: "İstanbul",
      street: "Sevkiyat Mah. Teslimat Cad.",
      postalCode: "34010",
      buildNo: "56",
      doorNumber: "2",
      detailAddress: "Depo Bölümü, Zemin Kat",
      country: "Türkiye",
    },
    returnAddress: {
      // İade adresi
      city: "İstanbul",
      street: "İade Mah. İade Cad.",
      postalCode: "34020",
      buildNo: "78",
      doorNumber: "1",
      detailAddress: "İade Merkezi, Giriş Kat",
      country: "Türkiye",
    },

    bankAccounts: [
      {
        iban: "TR730006200000123456789012", // IBAN numarası
        accountName: "Arzuamber Moda Sanayi ve Ticaret Ltd. Şti.",
        bankName: "Ziraat Bankası",
        isActive: true,
      },
      {
        iban: "TR520011100000000000123456",
        accountName: "Arzuamber Moda Sanayi ve Ticaret Ltd. Şti.",
        bankName: "Garanti BBVA",
        isActive: false,
      },
    ],

    identityDocumentPaths: [
      "https://cdn.tekera.com/docs/vergi-levhasi.pdf", // Vergi levhası
      "https://cdn.tekera.com/docs/ticaret-sicil.pdf", // Ticaret sicil gazetesi
    ],

    // Güvenlik ve entegrasyon bilgileri
    mailTwoFactorEnabled: true,
    twoFactorEnabled: true,
    apiKey: "ARZUAMBER-API-KEY-123456", // API anahtarı
    apiSecretKey: "ARZUAMBER-SECRET-KEY-987654", // API gizli anahtarı
    token: "ARZUAMBER-TOKEN-ABCDEF", // Kimlik doğrulama token'ı
    integrationReferenceCode: "ARZUAMBER-ENTEGRE-REF-2025", // Entegrasyon referans kodu

    // Görseller
    bannerImage: "/placeholders/store-banner-1.jpg",
    storePreviewImage: "/placeholders/store-preview-1.jpg",

    // Onay durumu
    isVerified: true,
    verificationStatus: "VERIFIED",

    // İletişim tercihleri
    communicationPreferences: {
      marketing: {
        sms: true, // Pazarlama SMS iletişimi
        email: true, // Pazarlama e-posta iletişimi
        phone: true, // Pazarlama telefon iletişimi
      },
      operational: {
        sms: true, // Operasyonel SMS
        email: true, // Operasyonel e-posta
        phone: true, // Operasyonel telefon
      },
      order: {
        sms: true, // Sipariş bilgilendirme SMS
        email: true, // Sipariş bilgilendirme e-posta
        phone: true, // Sipariş bilgilendirme telefon
      },
    },
  },

  ModaNova: {
    id: 2220345,
    name: "MODA NOVA",
    email: "modanova@gmail.com",
    logo: "/logos/modanova.png",
    score: 9.25,
    isActive: true,
    follower: 1500,
    operationStatus: "Normal",

    totalOrders: 1200,
    todaysOrders: 8,
    cancelledOrders: 40,
    pendingOrders: 10,

    totalProducts: 95,
    approvedProducts: 85,
    pendingApprovalProducts: 8,
    rejectedProducts: 2,

    bannerImage: "/placeholders/store-banner-2.jpg",
    storePreviewImage: "/placeholders/store-preview-2.jpg",
  },

  TekstilKing: {
    id: 3330567,
    name: "TEKSTİL KING",
    email: "king@tekstil.com",
    logo: "/logos/tekstilking.png",
    score: 8.75,
    isActive: false,
    follower: 25,
    operationStatus: "Normal",

    totalOrders: 180,
    todaysOrders: 0,
    cancelledOrders: 15,
    pendingOrders: 3,

    totalProducts: 20,
    approvedProducts: 18,
    pendingApprovalProducts: 1,
    rejectedProducts: 1,

    bannerImage: "/placeholders/store-banner-3.jpg",
    storePreviewImage: "/placeholders/store-preview-3.jpg",
  },
};
