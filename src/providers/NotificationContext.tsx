import React, { createContext, useContext, useState } from 'react';

export interface INotification {
    open?: boolean;
    type?: 'error' | 'success' | 'info';
    message: string;
}
const NotificationContext = createContext<ReturnType<any>>(null);
export const useNotificationService = () => {
    const initState = {
        open: false,
        type: undefined,
        message: ''
    };
    const [notification, setNotification] = useState<INotification>(initState);

    const resetNotification = () => {
        setNotification(initState);
    };

    const onCloseCallback = (cb?: () => void) => {
        resetNotification();
        cb?.();
    };

    return {
        notification,
        setNotification,

        onCloseCallback
    };
};
export const NotificationProvider = ({ children }: any) => {
    const notificationConf = useNotificationService();
    return <NotificationContext.Provider value={notificationConf}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => useContext(NotificationContext);
