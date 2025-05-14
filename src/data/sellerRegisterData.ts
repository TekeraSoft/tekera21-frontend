export const sellerRegisterUserData = {
  id: "12345",
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "+90 555 123 4567",
  registrationDate: "10.04.2023",
  status: "verified",
  company: {
    name: "Teknoloji A.Ş.",
    logo: "/placeholder.svg?height=100&width=100",
    taxId: "1234567890",
    address: "Levent, İstanbul, Türkiye",
    industry: "Yazılım ve Teknoloji",
  },
  documents: [
    {
      id: "doc-1",
      name: "Kimlik Belgesi",
      type: "identity",
      uploadDate: "05.04.2023",
      status: "verified",
      fileUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "doc-2",
      name: "Vergi Levhası",
      type: "tax",
      uploadDate: "06.04.2023",
      status: "verified",
      fileUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "doc-3",
      name: "İmza Sirküleri",
      type: "signature",
      uploadDate: "07.04.2023",
      status: "pending",
      fileUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "doc-4",
      name: "Ticaret Sicil Gazetesi",
      type: "commercial",
      uploadDate: "08.04.2023",
      status: "verified",
      fileUrl: "/placeholder.svg?height=300&width=400",
    },
  ],
};

export type typeUserData = typeof sellerRegisterUserData;
