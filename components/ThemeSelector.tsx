import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { ThemeMode, useTheme } from '@/contexts/ThemeContext';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

interface ThemeSelectorProps {
    isDark: boolean;
}

export function ThemeSelector({ isDark }: ThemeSelectorProps) {
    const { themeMode, setThemeMode } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const themeOptions: { mode: ThemeMode; label: string; icon: string; description: string }[] = [
        {
            mode: 'light',
            label: 'Light',
            icon: 'sun.max.fill',
            description: 'Always use light theme'
        },
        {
            mode: 'dark',
            label: 'Dark',
            icon: 'moon.fill',
            description: 'Always use dark theme'
        },
        {
            mode: 'auto',
            label: 'Auto',
            icon: 'gearshape.fill',
            description: 'Follow system preference'
        }
    ];

    const getCurrentThemeLabel = () => {
        const currentOption = themeOptions.find(option => option.mode === themeMode);
        return currentOption?.label || 'Auto';
    };

    const getCurrentThemeIcon = () => {
        const currentOption = themeOptions.find(option => option.mode === themeMode);
        return currentOption?.icon || 'gearshape.fill';
    };

    const handleThemeChange = (mode: ThemeMode) => {
        setThemeMode(mode);
        setModalVisible(false);

        // Show confirmation toast
        Alert.alert(
            'Theme Changed',
            `Theme set to ${themeOptions.find(opt => opt.mode === mode)?.label}`,
            [{ text: 'OK' }]
        );
    };

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.selectorButton,
                    {
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        borderColor: 'rgba(255, 255, 255, 0.05)'
                    }
                ]}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
            >
                <View style={styles.selectorContent}>
                    <View style={styles.leftContent}>
                        <View style={[styles.iconContainer, { backgroundColor: isDark ? Colors.dark.primary : Colors.light.primaryVariant }]}>
                            <IconSymbol name={getCurrentThemeIcon() as any} size={20} color={Colors.light.background} />
                        </View>
                        <View style={styles.textContainer}>
                            <ThemedText style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                                Theme
                            </ThemedText>
                            <ThemedText style={[styles.subtitle, { color: isDark ? Colors.dark.icon : Colors.light.icon }]}>
                                Current: {getCurrentThemeLabel()}
                            </ThemedText>
                        </View>
                    </View>
                    <IconSymbol
                        name="chevron.right"
                        size={16}
                        color={isDark ? Colors.dark.icon : Colors.light.icon}
                    />
                </View>
            </TouchableOpacity>

            {/* Theme Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[
                        styles.modalContent,
                        { backgroundColor: isDark ? Colors.dark.surfaceVariant : Colors.light.modal }
                    ]}>
                        <View style={styles.modalHeader}>
                            <ThemedText style={[styles.modalTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                                Select Theme
                            </ThemedText>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <IconSymbol
                                    name="xmark"
                                    size={20}
                                    color={isDark ? Colors.dark.icon : Colors.light.icon}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.optionsContainer}>
                            {themeOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.mode}
                                    style={[
                                        styles.optionButton,
                                        {
                                            backgroundColor: themeMode === option.mode
                                                ? (isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)')
                                                : 'transparent',
                                            borderColor: themeMode === option.mode
                                                ? (isDark ? Colors.dark.primary : Colors.light.primaryVariant)
                                                : 'rgba(255, 255, 255, 0.05)'
                                        }
                                    ]}
                                    onPress={() => handleThemeChange(option.mode)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.optionContent}>
                                        <View style={[
                                            styles.optionIconContainer,
                                            {
                                                backgroundColor: themeMode === option.mode
                                                    ? (isDark ? Colors.dark.primary : Colors.light.primaryVariant)
                                                    : (isDark ? Colors.dark.surface : Colors.light.surfaceVariant)
                                            }
                                        ]}>
                                            <IconSymbol
                                                name={option.icon as any}
                                                size={18}
                                                color={themeMode === option.mode ? Colors.light.background : (isDark ? Colors.dark.icon : Colors.light.icon)}
                                            />
                                        </View>
                                        <View style={styles.optionTextContainer}>
                                            <ThemedText style={[
                                                styles.optionTitle,
                                                {
                                                    color: themeMode === option.mode
                                                        ? (isDark ? Colors.dark.info : Colors.light.primaryVariant)
                                                        : (isDark ? Colors.dark.text : Colors.light.text)
                                                }
                                            ]}>
                                                {option.label}
                                            </ThemedText>
                                            <ThemedText style={[
                                                styles.optionDescription,
                                                { color: isDark ? Colors.dark.icon : Colors.light.icon }
                                            ]}>
                                                {option.description}
                                            </ThemedText>
                                        </View>
                                        {themeMode === option.mode && (
                                            <IconSymbol
                                                name="checkmark.circle.fill"
                                                size={20}
                                                color={isDark ? Colors.dark.primary : Colors.light.primaryVariant}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    selectorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderRadius: 16,
        borderWidth: 1,
    },
    selectorContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    optionButton: {
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    optionIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    optionDescription: {
        fontSize: 13,
        opacity: 0.8,
    },
});
