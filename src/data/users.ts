export const john = {
  id: 1,
  name: "John Doe",
  age: 30,
  email: "john@gmail.com",
  password: "123456",
  role: ["orders", "users", "products"],
  isActive: true,
};

export const jane = {
  id: 2,
  name: "Jane Doe",
  age: 28,
  email: "jane@gmail.com",
  password: "123456",
  role: ["orders", "products", "users", "shipping", "adds", "analytics"],
  isActive: true,
};

export const Arzuamber = {
  id: 2,
  name: "Arzuamber",
  age: 28,
  email: "jane@gmail.com",
  password: "123456",
  role: ["orders", "products", "users", "shipping", "adds", "analytics"],
  isActive: true,
};

export type User = typeof john;

export const users = { John: john, Jane: jane, Arzuamber: Arzuamber };
export const userList = Object.values(users).map((user) => user as User);
