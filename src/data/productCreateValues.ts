// Örnek kategoriler
export const categories = [
  { id: "1", name: "Giyim" },
  { id: "2", name: "Ayakkabı" },
  { id: "3", name: "Aksesuar" },
  { id: "4", name: "Elektronik" },
  { id: "5", name: "Ev & Yaşam" },
];

// Örnek alt kategoriler
export const subcategories = {
  "1": [
    { id: "101", name: "Tişört" },
    { id: "102", name: "Gömlek" },
    { id: "103", name: "Pantolon" },
    { id: "104", name: "Elbise" },
    { id: "105", name: "Ceket" },
  ],
  "2": [
    { id: "201", name: "Spor Ayakkabı" },
    { id: "202", name: "Bot" },
    { id: "203", name: "Sandalet" },
  ],
  "3": [
    { id: "301", name: "Çanta" },
    { id: "302", name: "Saat" },
    { id: "303", name: "Takı" },
  ],
  "4": [
    { id: "401", name: "Telefon" },
    { id: "402", name: "Bilgisayar" },
    { id: "403", name: "Tablet" },
  ],
  "5": [
    { id: "501", name: "Mobilya" },
    { id: "502", name: "Mutfak" },
    { id: "503", name: "Dekorasyon" },
  ],
};

// Örnek bedenler
export const sizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "Tek Beden",
];

// Örnek renkler
export const colorOptions = [
  { name: "Siyah", value: "#000000" },
  { name: "Beyaz", value: "#FFFFFF" },
  { name: "Kırmızı", value: "#FF0000" },
  { name: "Mavi", value: "#0000FF" },
  { name: "Yeşil", value: "#008000" },
  { name: "Sarı", value: "#FFFF00" },
  { name: "Mor", value: "#800080" },
  { name: "Turuncu", value: "#FFA500" },
  { name: "Gri", value: "#808080" },
  { name: "Pembe", value: "#FFC0CB" },
];
