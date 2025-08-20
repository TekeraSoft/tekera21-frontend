"use client";

import NotificationBanner from "@/components/notification/NotificationBanner";
import { useNotifications } from "@/hooks/use-notification";
import { useNotificationSound } from "@/hooks/use-notification-sound";
import { cn } from "@/lib/utils";
import { INotification } from "@/types/NotificationTypes";
import { Client } from "@stomp/stompjs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SockJS from "sockjs-client";
import { useAuthContext } from "./AuthContext";

interface INotificationContext {
  isAudioEnabled: boolean;
  playSound: () => void;
  initializeAudio: () => Promise<boolean>;
  notifications: INotification[];
  addNotification: (
    notification: Omit<INotification, "id" | "timestamp">
  ) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
  markAsRead: (id: number) => void;
  unreadCount: number;
}

export const NotificationContext = createContext<INotificationContext>({
  isAudioEnabled: false,
  playSound: () => {},
  initializeAudio: async () => false,
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
  clearNotifications: () => {},
  markAsRead: () => {},
  unreadCount: 0,
});

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useAuthContext();
  const { isAudioEnabled, playSound, initializeAudio } = useNotificationSound();
  const {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    markAsRead,
    unreadCount,
  } = useNotifications();

  const [isEnablingAudio, setIsEnablingAudio] = useState<boolean>(false);

  const enableNotifications = useCallback(async (): Promise<void> => {
    setIsEnablingAudio(true);

    try {
      await initializeAudio();

      // Browser bildirim izni iste
      if ("Notification" in window && Notification.permission === "default") {
        await Notification.requestPermission();
      }

      setIsEnablingAudio(false);
    } catch (error) {
      console.error("Bildirimler aktif edilemedi:", error);
    } finally {
      setIsEnablingAudio(false);
    }
  }, [initializeAudio]);

  useEffect(() => {
    const wsUri = process.env.NEXT_PUBLIC_SOCKET_URI;
    if (!userInfo || !wsUri || !isAudioEnabled) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUri),

      reconnectDelay: 5000, // otomatik reconnect (ms)
      debug: function (str) {
        // console.log(str);
      },
    });

    client.activate();

    client.onConnect = (frame) => {
      client.subscribe(
        `/topic/sellerOrders/${userInfo.sellerId}`,
        (message) => {
          playSound();

          const newOrder = JSON.parse(message.body);

          addNotification({
            type: "order",
            title: "Yeni Sipariş",
            message: `Yeni sipariş alındı.`,
            ...newOrder,
          });
        }
      );
    };

    return () => {
      client.deactivate();
    };
  }, [userInfo, isAudioEnabled]);

  return (
    <NotificationContext.Provider
      value={{
        isAudioEnabled,
        playSound,
        initializeAudio,
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        markAsRead,
        unreadCount,
      }}
    >
      {!isAudioEnabled && (
        <NotificationBanner
          show={!isAudioEnabled}
          onEnable={enableNotifications}
          isLoading={isEnablingAudio}
        />
      )}
      <div className={cn(!isAudioEnabled ? "mt-[70px]" : "")}>{children}</div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
