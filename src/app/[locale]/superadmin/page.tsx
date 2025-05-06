import { redirect } from "next/navigation";

const SuperAdmin = async () => {
  redirect("/superadmin/dashboard");
};

export default SuperAdmin;
