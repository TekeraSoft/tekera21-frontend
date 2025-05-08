"use client";

import { useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { setUser } from "./UserSlice";

function StoreProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  console.log("storeProvider", user);
  useEffect(() => {
    if (user) {
      store.dispatch(setUser(user));
    }
  }, [user]);
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
