"use client";

import { createContext, useContext, useState } from "react";

interface IDialogContext {
  dialogStatus: { isOpen: boolean; value: string };
  setDialogStatus: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; value: string }>
  >;
}

export const DialogContext = createContext<IDialogContext>({
  dialogStatus: { isOpen: false, value: "" },
  setDialogStatus: () => {},
});

export const useDialogContext = () => {
  return useContext(DialogContext);
};

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogStatus, setDialogStatus] = useState({
    isOpen: false,
    value: "",
  });
  return (
    <DialogContext.Provider
      value={{
        dialogStatus,
        setDialogStatus,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
