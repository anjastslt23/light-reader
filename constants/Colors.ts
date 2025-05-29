/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    text: '#22223b', // deep blue-gray for strong readability
    background: '#f8fafc', // neutral, clean, soft
    tint: '#2563eb', // modern blue accent
    icon: '#64748b', // neutral blue-gray
    tabIconDefault: '#64748b',
    tabIconSelected: '#2563eb',
    primary: '#2563eb', // blue accent
    primaryVariant: '#1d4ed8', // deeper blue
    secondary: '#60a5fa', // soft blue
    accent: '#a5b4fc', // subtle blue accent
    error: '#ef4444', // red
    success: '#22c55e', // green
    warning: '#facc15', // yellow
    info: '#2563eb', // blue
    surface: '#f1f5f9', // very light neutral
    surfaceVariant: '#e2e8f0', // lighter neutral
    border: '#e5e7eb', // neutral border
    modal: '#f8fafc',
    modalOverlay: 'rgba(100, 116, 139, 0.07)',
    badge: '#e0e7ef',
    shimmerBase: '#e2e8f0',
    shimmerHighlight: '#f1f5f9',
    gradient: ['#e0e7ef', '#c7d2fe', '#2563eb'], // subtle blue gradient
    gradientAccent: ['#2563eb', '#60a5fa', '#e0e7ef'],
    gradientToast: ['rgba(37, 99, 235, 0.10)', 'rgba(96, 165, 250, 0.10)'],
    gradientNetworkGood: ['rgba(34, 197, 94, 0.10)', 'rgba(96, 165, 250, 0.10)'],
    gradientNetworkBad: ['rgba(239, 68, 68, 0.10)', 'rgba(37, 99, 235, 0.10)'],
    skeleton: '#e2e8f0',
  },
  dark: {
    text: '#ECEDEE',
    background: '#16151d', // pure black for high contrast
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    primary: '#3b82f6',
    primaryVariant: '#1d4ed8',
    secondary: '#a78bfa',
    accent: '#f472b6',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#60a5fa',
    surface: '#0f172a',
    surfaceVariant: '#1e293b',
    border: '#334155',
    modal: '#1e293b',
    modalOverlay: 'rgba(0,0,0,0.7)',
    badge: '#0f172a',
    shimmerBase: '#23263a',
    shimmerHighlight: '#2d3147',
    gradient: ['#0f0f23', '#1a1a2e', '#16213e'],
    gradientAccent: ['#3b82f6', '#1d4ed8', '#1e40af'],
    gradientToast: ['rgba(59, 130, 246, 0.1)', 'rgba(147, 51, 234, 0.1)'],
    gradientNetworkGood: ['rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.05)'],
    gradientNetworkBad: ['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.05)'],
    skeleton: '#23263a',
  },
};
