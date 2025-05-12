import { createContext, useContext, useState } from "react";
import LoadingSpinner from './LoadingSpinner';

export const LoadingContext = createContext();

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(prev => {
            setIsLoading(false);
            return false;
        });
    };

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {isLoading && <LoadingSpinner />}
            {children}
        </LoadingContext.Provider>
    );
};