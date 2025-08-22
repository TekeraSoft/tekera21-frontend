import { getUser } from "@/app/actions/server/auth.actions";


const SuperAdmin = async () => {
  const user = await getUser();
  return (
    <>
      
      <div className="container mx-auto p-4">
        Hoşgeldiniz {user?.nameSurname}
      </div>
    </>
  );
};

export default SuperAdmin;
