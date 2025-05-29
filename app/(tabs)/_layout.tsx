import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { isDark } = useTheme();

  // Use palette for all tab bar colors
  const tabBarActiveTintColor = isDark ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected;
  const tabBarInactiveTintColor = isDark ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault;
  const tabBarBackgroundColor = isDark ? Colors.dark.surface : Colors.light.surface;
  const shadowOpacity = isDark ? 0.3 : 0.08;
  const shadowColor = isDark ? Colors.dark.border : Colors.light.border;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: tabBarBackgroundColor,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: shadowColor,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: shadowOpacity,
          shadowRadius: 12,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 34 : 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backdropFilter: 'blur(20px)',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reader',
          tabBarIcon: ({ color, focused }) => {
            const iconSize = focused ? 26 : 24;
            return (
              <IconSymbol
                size={iconSize}
                name="globe"
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => {
            const iconSize = focused ? 26 : 24;
            return (
              <IconSymbol
                size={iconSize}
                name="gearshape.fill"
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
