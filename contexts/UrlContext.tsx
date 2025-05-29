import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UrlContextType {
    url: string;
    setUrl: (url: string) => void;
}

const DEFAULT_URL = 'https://komikcast02.com';
const URL_STORAGE_KEY = '@light_reader_url';

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [url, setUrlState] = useState<string>(DEFAULT_URL);

    useEffect(() => {
        (async () => {
            try {
                const savedUrl = await AsyncStorage.getItem(URL_STORAGE_KEY);
                if (savedUrl) setUrlState(savedUrl);
            } catch {
                // fallback to default
            }
        })();
    }, []);

    const setUrl = async (newUrl: string) => {
        // Tambahkan https:// jika user hanya mengetik domain
        let formattedUrl = newUrl.trim();
        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = 'https://' + formattedUrl;
        }
        setUrlState(formattedUrl);
        try {
            await AsyncStorage.setItem(URL_STORAGE_KEY, formattedUrl);
        } catch {
            // handle error
        }
    };

    return (
        <UrlContext.Provider value={{ url, setUrl }}>
            {children}
        </UrlContext.Provider>
    );
};

export const useUrl = () => {
    const ctx = useContext(UrlContext);
    if (!ctx) throw new Error('useUrl must be used within a UrlProvider');
    return ctx;
};
