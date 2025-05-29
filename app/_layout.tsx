import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AdBlockProvider } from '@/contexts/AdBlockContext';
import { DataCompressionProvider } from '@/contexts/DataCompressionContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { UrlProvider } from '@/contexts/UrlContext';

function RootNavigator() {
  const { isDark } = useTheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <DataCompressionProvider>
          <AdBlockProvider>
            <UrlProvider>
              <RootNavigator />
            </UrlProvider>
          </AdBlockProvider>
        </DataCompressionProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
