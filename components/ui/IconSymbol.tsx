// Fallback for using Ionicons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Create our icon type based on the mapping keys
type IconSymbolName =
  | 'house.fill'
  | 'paperplane.fill'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right'
  | 'chevron.left'
  | 'gearshape.fill'
  | 'moon.fill'
  | 'sun.max.fill'
  | 'bell.fill'
  | 'arrow.clockwise'
  | 'speedometer'
  | 'trash.fill'
  | 'info.circle.fill'
  | 'globe'
  | 'magnifyingglass'
  | 'arrow.right'
  | 'xmark'
  | 'wifi'
  | 'wifi.slash'
  | 'antenna.radiowaves.left.and.right'
  | 'checkmark.circle.fill'
  | 'arrow.down.circle'
  | 'arrow.down'
  | 'shield.fill'
  | 'shield';

/**
 * Add your SF Symbols to Ionicons mappings here.
 * - see Ionicons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
export const MAPPING: Record<IconSymbolName, ComponentProps<typeof Ionicons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code-slash',
  'chevron.right': 'chevron-forward',
  'chevron.left': 'chevron-back',
  'gearshape.fill': 'settings',
  'moon.fill': 'moon',
  'sun.max.fill': 'sunny',
  'bell.fill': 'notifications',
  'arrow.clockwise': 'refresh',
  'speedometer': 'speedometer',
  'trash.fill': 'trash',
  'info.circle.fill': 'information-circle',
  'globe': 'globe',
  'magnifyingglass': 'search',
  'arrow.right': 'arrow-forward',
  'xmark': 'close',
  'wifi': 'wifi',
  'wifi.slash': 'wifi',
  'antenna.radiowaves.left.and.right': 'cellular',
  'checkmark.circle.fill': 'checkmark-circle',
  'arrow.down.circle': 'arrow-down-circle',
  'arrow.down': 'arrow-down',
  'shield.fill': 'shield',
  'shield': 'shield-outline',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Ionicons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Ionicons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <Ionicons color={color} size={size} name={MAPPING[name]} style={style} />;
}
