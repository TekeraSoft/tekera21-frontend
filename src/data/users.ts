export const john = {
  name: "John Doe",
  age: 30,
  email: "john@gmail.com",
  password: "123456",
  role: "admin",
  isActive: true,
};

export const jane = {
  name: "Jane Doe",
  age: 28,
  email: "jane@gmail.com",
  password: "123456",
  role: "superadmin",
  isActive: true,
};
export type User = typeof john;

export const users = { John: john, Jane: jane };
export const userList = Object.values(users).map((user) => user as User);
export const userListWithId: User[] = userList.map((user, index) => ({
  id: index + 1,
  ...user,
}));
