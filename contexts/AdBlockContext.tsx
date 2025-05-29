import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AdBlockContextType {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    blockedCount: number;
    incrementBlockedCount: () => void;
    resetBlockedCount: () => void;
}

const AdBlockContext = createContext<AdBlockContextType | undefined>(undefined);

interface AdBlockProviderProps {
    children: ReactNode;
}

export const AdBlockProvider: React.FC<AdBlockProviderProps> = ({ children }) => {
    const [enabled, setEnabled] = useState(true); // Default enabled for better protection
    const [blockedCount, setBlockedCount] = useState(0);

    useEffect(() => {
        loadAdBlockSettings();
    }, []);

    const loadAdBlockSettings = async () => {
        try {
            const savedEnabled = await AsyncStorage.getItem('adblock_enabled');
            if (savedEnabled !== null) {
                setEnabled(JSON.parse(savedEnabled));
            }
        } catch (error) {
            console.error('Error loading adblock settings:', error);
        }
    };

    const handleSetEnabled = async (newEnabled: boolean) => {
        setEnabled(newEnabled);
        try {
            await AsyncStorage.setItem('adblock_enabled', JSON.stringify(newEnabled));
        } catch (error) {
            console.error('Error saving adblock settings:', error);
        }
    };

    const incrementBlockedCount = () => {
        setBlockedCount(prev => prev + 1);
    };

    const resetBlockedCount = () => {
        setBlockedCount(0);
    };

    return (
        <AdBlockContext.Provider value={{
            enabled,
            setEnabled: handleSetEnabled,
            blockedCount,
            incrementBlockedCount,
            resetBlockedCount,
        }}>
            {children}
        </AdBlockContext.Provider>
    );
};

export const useAdBlock = () => {
    const context = useContext(AdBlockContext);
    if (context === undefined) {
        throw new Error('useAdBlock must be used within an AdBlockProvider');
    }
    return context;
};
