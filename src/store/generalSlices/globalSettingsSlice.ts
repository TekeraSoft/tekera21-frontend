// src/redux/slices/globalSettingsSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  logoUrl: string;
  tekeraAddress: string;
  tekeraPhone: string;
  tekeraEmail: string;
  socialLinks: {
    name: string;
    href: string;
    icon: string;
  }[];
}

const initialState: GlobalState = {
  logoUrl: "/1600w-bHiX_0QpJxE.webp",
  tekeraAddress:
    "Kışla Mahallesi, Cadde 40, Kayalar Apartmanı, No:8, Blok A, Kat: 4, Daire: 7, Muratpaşa, Türkiye ",
  tekeraPhone: "+90-534-260-8385",
  tekeraEmail: "info@tekera21.com",
  socialLinks: [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: "facebook", // sadece bir string
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: "instagram",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: "twitter",
    },
    {
      name: "Linkedin",
      href: "https://linkedin.com",
      icon: "linkedin",
    },
  ],
};

const globalSettingsSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
