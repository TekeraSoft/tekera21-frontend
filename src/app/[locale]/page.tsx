"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  // const dispatch = useDispatch<AppDispatch>();

  const t = useTranslations();

  return (
    <div className="bg-primary w-screen h-screen">
      <div className="bg-secondary w-1/2 h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl text-white"> {t("HomePage.title")} </h1>
      </div>
    </div>
  );
}
