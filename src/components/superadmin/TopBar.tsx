"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  LogOutIcon,
  PersonStanding,
  Settings,
  TableConfig,
  User,
  XCircle,
} from "lucide-react";
import ToggleSidebarButton from "./ToggleSidebarButton";
import { Link } from "@/i18n/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { logOut } from "@/app/actions";

type AlertItem = {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
};

const TopBar = ({ children }: { children: React.ReactNode }) => {
  const alertItems: AlertItem[] = [
    {
      id: "1",
      title: "Yeni Duyuru",
      message: "Sistem güncellemesi yapılacaktır.",
      type: "info",
    },
    {
      id: "2",
      title: "Başarıyla Güncellendi",
      message: "Profil bilgileri başarıyla güncellendi.",
      type: "success",
    },
    {
      id: "3",
      title: "Hata Oluştu",
      message: "Lütfen tekrar deneyin.",
      type: "error",
    },
  ];
  const getAlertStyles = (type: AlertItem["type"]) => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle size={20} className="text-green-500" />,
          bgColor: "bg-green-100",
          titleColor: "text-green-800",
        };
      case "warning":
        return {
          icon: <AlertTriangle size={20} className="text-yellow-500" />,
          bgColor: "bg-yellow-100",
          titleColor: "text-yellow-800",
        };
      case "error":
        return {
          icon: <XCircle size={20} className="text-red-500" />,
          bgColor: "bg-red-100",
          titleColor: "text-red-800",
        };
      case "info":
      default:
        return {
          icon: <Info size={20} className="text-blue-500" />,
          bgColor: "bg-blue-100",
          titleColor: "text-blue-800",
        };
    }
  };

  const { userInfo } = useAuthContext();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className="w-full bg-white h-[52px] flex items-center justify-between px-4 shadow-sm border-b">
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
              href={"/superadmin/settings/configuration"}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <TableConfig size={15} className="text-gray-600" /> Configuration
              Settings
            </Link>
            <Link
              href={"/superadmin/settings/profile"}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <PersonStanding size={16} className="text-gray-600" /> Profile
              Settings
            </Link>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1 cursor-pointer text-gray-600">
              <Bell size={16} />
              Bildirimler
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72 sm:w-80 text-sm">
            {alertItems.length === 0 ? (
              <p className="text-gray-600">
                Henüz yeni bir duyuru bulunmamaktadır.
              </p>
            ) : (
              alertItems.map((item) => {
                const styles = getAlertStyles(item.type);
                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-2 mb-2 p-3 rounded-md shadow-sm border ${styles.bgColor}`}
                  >
                    {styles.icon}
                    <div className="flex flex-col">
                      <span className={`font-semibold ${styles.titleColor}`}>
                        {item.title}
                      </span>
                      <span className="text-gray-700 text-sm">
                        {item.message}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </PopoverContent>
        </Popover>
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
  );
};

export default TopBar;
