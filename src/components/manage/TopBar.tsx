"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  LogOutIcon,
  PersonStanding,
  Settings,
  TableConfig,
  User,
} from "lucide-react";
import ToggleSidebarButton from "./ToggleSidebarButton";
import { Link } from "@/i18n/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { logOut } from "@/app/actions/server/auth.actions";
import { cn } from "@/lib/utils";
import Notifications from "../notification/Notifications";
import { useNotificationContext } from "@/context/NotificationContext";

const TopBar = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAuthContext();

  const { isAudioEnabled } = useNotificationContext();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <>
      <div
        className={cn(
          "w-full bg-white h-[52px] flex items-center justify-between px-4 shadow-sm border-b"
        )}
      >
        <ToggleSidebarButton />
        {children}
        <div className="pr-2 ml-auto flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer text-gray-600">
                <Settings size={15} className="text-gray-600" />
                Ayarlar
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 sm:w-60 text-sm">
              <Link
                href={"/manage/settings/configuration"}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <TableConfig size={15} className="text-gray-600" />{" "}
                Configuration Settings
              </Link>
              <Link
                href={"/manage/settings/profile"}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <PersonStanding size={16} className="text-gray-600" /> Profile
                Settings
              </Link>
            </PopoverContent>
          </Popover>

          {isAudioEnabled && <Notifications />}

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer text-gray-600">
                <User size={16} />
                {userInfo?.nameSurname}
              </div>
            </PopoverTrigger>
            <PopoverContent className="text-sm p-2">
              <Button
                onClick={handleLogout}
                variant={"ghost"}
                className="flex m-0 items-center gap-1 cursor-pointer text-gray-600"
              >
                <LogOutIcon size={15} className="text-gray-600" />
                Çıkış yap
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default TopBar;
