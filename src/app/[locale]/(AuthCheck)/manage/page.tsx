import { redirect } from "next/navigation";

const SuperAdmin = async () => {
  redirect("/manage/dashboard");
};

export default SuperAdmin;
