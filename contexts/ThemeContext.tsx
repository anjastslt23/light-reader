import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
    themeMode: ThemeMode;
    currentScheme: ColorSchemeName;
    setThemeMode: (mode: ThemeMode) => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@light_reader_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
    const [currentScheme, setCurrentScheme] = useState<ColorSchemeName>(
        Appearance.getColorScheme()
    );

    // Load saved theme preference
    useEffect(() => {
        loadThemePreference();
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setCurrentScheme(colorScheme);
        });

        return () => subscription?.remove();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
                setThemeMode(savedTheme as ThemeMode);
            }
        } catch (error) {
            console.error('Failed to load theme preference:', error);
        }
    };

    const handleSetThemeMode = async (mode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
            setThemeMode(mode);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    };

    // Calculate effective theme
    const getEffectiveTheme = (): ColorSchemeName => {
        if (themeMode === 'auto') {
            return currentScheme;
        }
        return themeMode;
    };

    const effectiveTheme = getEffectiveTheme();
    const isDark = effectiveTheme === 'dark';

    const value: ThemeContextType = {
        themeMode,
        currentScheme: effectiveTheme,
        setThemeMode: handleSetThemeMode,
        isDark,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
