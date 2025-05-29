import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import SkeletonWebView from '@/components/ui/SkeletonWebView';
import { Colors } from '@/constants/Colors';
import { useAdBlock } from '@/contexts/AdBlockContext';
import { useDataCompression } from '@/contexts/DataCompressionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useUrl } from '@/contexts/UrlContext';
import { ADBLOCK_SCRIPT } from '@/utils/adblockScript';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// Helper: get root domain (e.g. komikcast02.com from www.komikcast02.com)
function getRootDomain(hostname: string) {
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    return parts.slice(-2).join('.');
  }
  return hostname;
}

export default function HomeScreen() {
  const { url } = useUrl();
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<{
    isConnected: boolean;
    type: string;
  }>({ isConnected: true, type: 'unknown' });
  const [networkToastVisible, setNetworkToastVisible] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { enabled: dataCompressionEnabled } = useDataCompression();
  const { enabled: adBlockEnabled, incrementBlockedCount } = useAdBlock();

  // Toast animation
  const toastAnimatedValue = useRef(new Animated.Value(-100)).current;
  const networkToastAnimatedValue = useRef(new Animated.Value(-100)).current;
  const dotAnimations = useRef([
    new Animated.Value(0.4),
    new Animated.Value(0.4),
    new Animated.Value(0.4),
  ]).current;

  // Network monitoring
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkStatus(prevStatus => {
        const newStatus = {
          isConnected: state.isConnected ?? false,
          type: state.type || 'unknown',
        };
        // Show network status toast when connection or type changes
        if (
          prevStatus.isConnected !== newStatus.isConnected ||
          prevStatus.type !== newStatus.type
        ) {
          setNetworkToastVisible(true);
          Animated.timing(networkToastAnimatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            Animated.timing(networkToastAnimatedValue, {
              toValue: -100,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setNetworkToastVisible(false);
            });
          }, 3000);
        }
        return newStatus;
      });
    });
    return () => unsubscribe();
  }, [networkToastAnimatedValue]);

  // Loading toast: show when loading, hide when not loading
  useEffect(() => {
    if (loading) {
      Animated.timing(toastAnimatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
      // Start pulsing animation for dots
      const createPulseAnimation = (animatedValue: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 400,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0.4,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );
      };
      createPulseAnimation(dotAnimations[0], 0).start();
      createPulseAnimation(dotAnimations[1], 120).start();
      createPulseAnimation(dotAnimations[2], 240).start();
    } else {
      Animated.timing(toastAnimatedValue, {
        toValue: -100,
        duration: 150,
        useNativeDriver: true,
      }).start();
      dotAnimations.forEach(anim => anim.stopAnimation());
    }
  }, [loading, toastAnimatedValue, dotAnimations]);

  const handleError = () => {
    Alert.alert(
      'Connection Error',
      'Unable to load the website. Please check your internet connection.',
      [{ text: 'OK' }]
    );
  };

  const handleGoBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const handleReload = () => {
    if (webViewRef.current) {
      if (loading) {
        webViewRef.current.stopLoading();
      } else {
        webViewRef.current.reload();
      }
    }
  };

  const getNetworkIcon = () => {
    if (!networkStatus.isConnected) return 'wifi.slash';
    return networkStatus.type === 'cellular' ? 'antenna.radiowaves.left.and.right' : 'wifi';
  };

  const getNetworkColor = () => {
    if (!networkStatus.isConnected) return Colors[isDark ? 'dark' : 'light'].error;
    return networkStatus.type === 'cellular'
      ? Colors[isDark ? 'dark' : 'light'].warning
      : Colors[isDark ? 'dark' : 'light'].success;
  };

  // Use theme-aware, soft, non-contrasting colors for header
  const gradientColors = isDark
    ? Colors.dark.gradient
    : Colors.light.gradient;

  return (
    <View style={[styles.container, {
      backgroundColor: Colors[isDark ? 'dark' : 'light'].background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={Colors[isDark ? 'dark' : 'light'].background}
      />

      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={gradientColors as [string, string, string]}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={[styles.headerContent, { paddingTop: insets.top + 10 }]}>
          {/* URL Display - Read Only */}
          <View
            style={[
              styles.urlDisplayContainer,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }
            ]}
          >
            <IconSymbol
              name="globe"
              size={20}
              color={isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'}
              style={styles.urlIcon}
            />
            <ThemedText
              style={[
                styles.urlText,
                {
                  color: isDark ? Colors.dark.text : Colors.light.icon, // gray text
                }
              ]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {pageTitle || url}
            </ThemedText>
          </View>

          {/* Control Buttons and Network Indicator */}
          <View style={styles.controlsContainer}>
            {/* Back Button */}
            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : Colors.light.surface,
                  opacity: canGoBack ? 1 : 0.5,
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : Colors.light.border,
                }
              ]}
              onPress={handleGoBack}
              disabled={!canGoBack}
            >
              <IconSymbol
                name="chevron.left"
                size={20}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
            </TouchableOpacity>

            {/* Refresh/Cancel Button (moved next to Back) */}
            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : Colors.light.surface,
                  marginLeft: 8,
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : Colors.light.border,
                }
              ]}
              onPress={handleReload}
            >
              <IconSymbol
                name={loading ? 'xmark' : 'arrow.clockwise'}
                size={20}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
            </TouchableOpacity>

            {/* Empty center for spacing */}
            <View style={{ flex: 1 }} />

            {/* Data Compression Indicator */}
            <View
              style={[
                styles.dataCompressionIndicator,
                {
                  backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : Colors.light.surfaceVariant,
                  borderColor: dataCompressionEnabled ? Colors[isDark ? 'dark' : 'light'].success : Colors[isDark ? 'dark' : 'light'].border,
                  marginRight: 6
                }
              ]}
            >
              <IconSymbol
                name={dataCompressionEnabled ? 'arrow.down.circle' : 'arrow.down'}
                size={18}
                color={dataCompressionEnabled ? Colors[isDark ? 'dark' : 'light'].success : Colors[isDark ? 'dark' : 'light'].icon}
              />
              <ThemedText
                style={[
                  styles.dataCompressionText,
                  { color: dataCompressionEnabled ? Colors[isDark ? 'dark' : 'light'].success : Colors[isDark ? 'dark' : 'light'].icon }
                ]}
              >
                {dataCompressionEnabled ? 'ON' : 'OFF'}
              </ThemedText>
            </View>

            <View
              style={[
                styles.adBlockIndicator,
                {
                  backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : Colors.light.surfaceVariant,
                  borderColor: adBlockEnabled ? Colors[isDark ? 'dark' : 'light'].primary : Colors[isDark ? 'dark' : 'light'].border,
                  marginRight: 6
                }
              ]}
            >
              <IconSymbol
                name={adBlockEnabled ? 'shield.fill' : 'shield'}
                size={18}
                color={adBlockEnabled ? Colors[isDark ? 'dark' : 'light'].primary : Colors[isDark ? 'dark' : 'light'].icon}
              />
              <ThemedText
                style={[
                  styles.adBlockText,
                  { color: adBlockEnabled ? Colors[isDark ? 'dark' : 'light'].primary : Colors[isDark ? 'dark' : 'light'].icon }
                ]}
              >
                {adBlockEnabled ? 'ON' : 'OFF'}
              </ThemedText>
            </View>

            {/* Network Indicator */}
            <View
              style={[
                styles.networkIndicator,
                {
                  backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : Colors.light.surfaceVariant,
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : Colors.light.border,
                }
              ]}
            >
              <IconSymbol
                name={getNetworkIcon()}
                size={18}
                color={getNetworkColor()}
              />
              <ThemedText
                style={[
                  styles.networkText,
                  {
                    color: getNetworkColor(),
                  }
                ]}
              >
                {networkStatus.isConnected
                  ? networkStatus.type.toUpperCase()
                  : 'OFFLINE'}
              </ThemedText>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Network Status Toast */}
      {networkToastVisible && (
        <Animated.View
          style={[
            styles.networkToastContainer,
            {
              transform: [{ translateY: networkToastAnimatedValue }],
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              top: insets.top + 80,
            }
          ]}
        >
          <LinearGradient
            colors={(networkStatus.isConnected ? Colors[isDark ? 'dark' : 'light'].gradientNetworkGood : Colors[isDark ? 'dark' : 'light'].gradientNetworkBad) as [string, string]}
            style={styles.networkToastGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.networkToastContent}>
              <IconSymbol
                name={getNetworkIcon()}
                size={20}
                color={getNetworkColor()}
              />
              <ThemedText style={[styles.networkToastText, { color: Colors[isDark ? 'dark' : 'light'].surfaceVariant }]}>
                {networkStatus.isConnected
                  ? `Connected via ${networkStatus.type.toUpperCase()}`
                  : 'Network disconnected'}
              </ThemedText>
            </View>
          </LinearGradient>
        </Animated.View>
      )}

      {/* WebView with modern styling */}
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onLoadProgress={({ nativeEvent }) => {
            if (nativeEvent.progress < 1) setLoading(true);
            else setLoading(false);
          }}
          onError={handleError}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
          onMessage={(event) => {
            // Handle messages from injected JavaScript
            try {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.type === 'adBlocked') {
                incrementBlockedCount();
              } else if (data.type === 'pageTitle') {
                setPageTitle(data.title);
              }
            } catch {
              // Ignore parsing errors
            }
          }}
          onShouldStartLoadWithRequest={(request) => {
            try {
              const currentDomain = new URL(url).hostname;
              const requestDomain = new URL(request.url).hostname;
              const rootCurrent = getRootDomain(currentDomain);
              const rootRequest = getRootDomain(requestDomain);
              if (rootRequest === rootCurrent) {
                return true;
              }
              console.log('Blocked navigation to external domain:', request.url);
              incrementBlockedCount();
              return false;
            } catch {
              return true;
            }
          }}
          injectedJavaScript={adBlockEnabled ? ADBLOCK_SCRIPT : undefined}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          userAgent={dataCompressionEnabled
            ? 'Mozilla/5.0 (Linux; Android 12; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.199 Mobile Safari/537.36 Lite'
            : 'Mozilla/5.0 (Linux; Android 12; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.199 Mobile Safari/537.36'}
        />
        {loading && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <SkeletonWebView />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  urlDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  urlIcon: {
    marginRight: 12,
    opacity: 0.7,
  },
  urlText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    opacity: 0.8,
    letterSpacing: 0.3,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dataCompressionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 6, // jarak antar indikator
  },
  dataCompressionText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  adBlockIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 6, // jarak antar indikator
  },
  adBlockText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  networkIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  networkText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  networkToastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 999,
    borderRadius: 16,
  },
  networkToastGradient: {
    borderRadius: 16,
    padding: 1,
  },
  networkToastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  networkToastText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 1000,
    borderRadius: 16,
  },
  toastGradient: {
    borderRadius: 16,
    padding: 1,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    opacity: 0.8,
  },
  toastText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
    letterSpacing: 0.3,
  },
  webviewContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    marginTop: 8,
    marginHorizontal: 8,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
