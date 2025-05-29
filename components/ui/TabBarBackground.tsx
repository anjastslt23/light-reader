import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Use centralized palette for gradients and borders
  const gradientColors = isDark
    ? Colors.dark.gradient
    : Colors.light.gradient;

  const borderColors = isDark
    ? Colors.dark.gradientAccent
    : Colors.light.gradientAccent;

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={gradientColors as [string, string, string]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Top border accent */}
      <LinearGradient
        colors={borderColors as [string, string, string]}
        style={styles.topBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
});

export function useBottomTabOverflow() {
  return 0;
}
