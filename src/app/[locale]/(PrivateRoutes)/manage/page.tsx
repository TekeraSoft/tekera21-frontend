import { getUser } from "@/app/actions/server/auth.actions";
import TopBar from "@/components/manage/TopBar";

const SuperAdmin = async () => {
  const user = await getUser();
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <div className="container mx-auto p-4">
        Hoşgeldiniz {user?.nameSurname}
      </div>
    </>
  );
};

export default SuperAdmin;
