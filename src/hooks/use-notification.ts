import { INotification } from '@/types/NotificationTypes';
import { useState, useCallback } from 'react';



interface UseNotificationsReturn {
    notifications: INotification[];
    addNotification: (notification: Omit<INotification, 'id' | 'timestamp'>) => void;
    removeNotification: (id: number) => void;
    clearNotifications: () => void;
    markAsRead: (id: number) => void;
    unreadCount: number;
}

export const useNotifications = (): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const addNotification = useCallback((notificationData: Omit<INotification, 'id' | 'timestamp'>): void => {
        const newNotification: INotification = {
            ...notificationData,
            id: Date.now(),
            timestamp: new Date(),
            read: false
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
    }, []);

    const removeNotification = useCallback((id: number): void => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const clearNotifications = useCallback((): void => {
        setNotifications([]);
    }, []);

    const markAsRead = useCallback((id: number): void => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    return {
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        markAsRead,
        unreadCount
    };
};
