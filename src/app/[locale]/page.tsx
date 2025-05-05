"use client";

import { decrement, increment } from "@/store/counterSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { value } = useSelector((state: RootState) => state.counter);
  const t = useTranslations();

  return (
    <div className="bg-primary w-screen h-screen">
      <div className="bg-secondary w-1/2 h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl text-white"> {t("HomePage.title")} </h1>
        <div className="mt-5">
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{value}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
