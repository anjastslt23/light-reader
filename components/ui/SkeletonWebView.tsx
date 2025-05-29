import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

// Simple shimmer animation for skeleton
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function SkeletonWebView() {
    const { isDark } = useTheme();
    const shimmerBase = Colors[isDark ? 'dark' : 'light'].shimmerBase;
    const shimmerHighlight = Colors[isDark ? 'dark' : 'light'].shimmerHighlight;
    const skeleton = Colors[isDark ? 'dark' : 'light'].skeleton;

    // Animation value
    const translateX = React.useRef(new Animated.Value(-300)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: 300,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, [translateX]);

    return (
        <View style={[styles.container, { backgroundColor: skeleton }]}>
            <View style={styles.skeletonBlock}>
                <AnimatedLinearGradient
                    colors={[shimmerBase, shimmerHighlight, shimmerBase]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.shimmer,
                        {
                            // Make shimmer wider than block for full sweep
                            width: '200%',
                            left: '-50%',
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeletonBlock: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 0,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginBottom: 0,
    },
    shimmer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 0,
    },
    skeletonLine: {
        display: 'none', // Hide lines for full overlay effect
    },
    skeletonLineShort: {
        display: 'none',
    },
});
