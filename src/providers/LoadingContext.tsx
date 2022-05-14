import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<ReturnType<any>>(null);
export const useLoadingService = () => {
    const [loading, setLoading] = useState(false);
    return {
        loading,
        setLoading
    };
};
export const LoadingProvider = ({ children }: any) => {
    const loading = useLoadingService();
    return <LoadingContext.Provider value={loading}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => useContext(LoadingContext);
