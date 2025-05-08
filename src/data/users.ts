import { z } from "zod";

export const john = {
  id: 1,
  name: "john",
  age: 30,
  email: "john@gmail.com",
  password: "123456",
  role: ["orders", "users", "products"],
  isActive: true,
};

export const jane = {
  id: 2,
  name: "jane",
  age: 28,
  email: "jane@gmail.com",
  password: "123456",
  role: [
    "orders",
    "products",
    "users",
    "shipping",
    "analytics",
    "customers",
    "seller",
    "sellerSuperAdmin",
    "user",
  ],
  isActive: true,
};

export const ken = {
  id: 4,
  name: "ken",
  age: 28,
  email: "ken@gmail.com",
  password: "123456",
  role: [
    "orders",
    "products",
    "users",
    "shipping",
    "analytics",
    "customers",
    "superadmin",
  ],
  isActive: true,
};

export const Arzuamber = {
  id: 3,
  name: "Arzuamber",
  age: 28,
  email: "jane@gmail.com",
  password: "123456",
  role: ["orders", "products", "users", "shipping", "adds", "analytics"],
  isActive: true,
};

export type User = typeof john;

export const customers = [
  {
    id: "CUST-001",
    name: "John Smith",
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "New York, USA",
    orders: 12,
    spent: "$1,248.50",
    status: "Active",
    lastOrder: "May 4, 2023",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "London, UK",
    orders: 8,
    spent: "$945.20",
    status: "Active",
    lastOrder: "May 2, 2023",
  },
  {
    id: "CUST-003",
    name: "Michael Brown",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Toronto, Canada",
    orders: 5,
    spent: "$532.00",
    status: "Active",
    lastOrder: "April 28, 2023",
  },
  {
    id: "CUST-004",
    name: "Emily Davis",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Sydney, Australia",
    orders: 3,
    spent: "$165.25",
    status: "Inactive",
    lastOrder: "March 15, 2023",
  },
  {
    id: "CUST-005",
    name: "Robert Wilson",
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Berlin, Germany",
    orders: 7,
    spent: "$819.99",
    status: "Active",
    lastOrder: "April 30, 2023",
  },
  {
    id: "CUST-006",
    name: "Jennifer Taylor",
    firstName: "Jennifer",
    lastName: "Taylor",
    email: "jennifer@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Paris, France",
    orders: 4,
    spent: "$349.95",
    status: "Active",
    lastOrder: "April 25, 2023",
  },
  {
    id: "CUST-007",
    name: "David Miller",
    firstName: "David",
    lastName: "Miller",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Chicago, USA",
    orders: 6,
    spent: "$578.50",
    status: "Active",
    lastOrder: "May 1, 2023",
  },
  {
    id: "CUST-008",
    name: "Lisa Anderson",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Madrid, Spain",
    orders: 2,
    spent: "$134.99",
    status: "Inactive",
    lastOrder: "February 12, 2023",
  },
  {
    id: "CUST-009",
    name: "James Wilson",
    firstName: "James",
    lastName: "Wilson",
    email: "james@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Tokyo, Japan",
    orders: 9,
    spent: "$925.00",
    status: "Active",
    lastOrder: "April 29, 2023",
  },
  {
    id: "CUST-010",
    name: "Patricia Moore",
    firstName: "Patricia",
    lastName: "Moore",
    email: "patricia@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Rome, Italy",
    orders: 1,
    spent: "$59.99",
    status: "Active",
    lastOrder: "April 20, 2023",
  },
];

export const users = { John: john, Jane: jane, Arzuamber: Arzuamber, ken: ken };
export const userList = Object.values(users).map((user) => user as User);

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  postalCode: z.string().min(5, {
    message: "Postal code must be at least 5 characters.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select a date of birth.",
  }),
  customerRole: z.string({
    required_error: "Please select a customer type.",
  }),
  notes: z.string().optional(),
});
