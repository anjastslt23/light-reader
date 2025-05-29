import { ThemedText } from '@/components/ThemedText';
import { ThemeSelector } from '@/components/ThemeSelector';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useAdBlock } from '@/contexts/AdBlockContext';
import { useDataCompression } from '@/contexts/DataCompressionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useUrl } from '@/contexts/UrlContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StatusBar, StyleSheet, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const { enabled: dataCompression, setEnabled: setDataCompression } = useDataCompression();
    const { enabled: adBlock, setEnabled: setAdBlock } = useAdBlock();
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const { isDark } = useTheme();
    const insets = useSafeAreaInsets();
    const { url, setUrl } = useUrl();
    const [urlInput, setUrlInput] = useState(url);
    const router = useRouter();
    const [urlError, setUrlError] = useState<string | null>(null);

    const gradientColors = Colors[isDark ? 'dark' : 'light'].gradient;

    const handleClearCache = () => {
        Alert.alert(
            'Clear Cache',
            'Are you sure you want to clear all cached data?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert('Success', 'Cache cleared successfully!');
                    }
                }
            ]);
    };

    const handleAbout = () => {
        setAboutModalVisible(true);
    };

    const handleUrlSave = () => {
        // Basic validation, allow user to enter domain only
        let input = urlInput.trim();
        if (!/^https?:\/\//i.test(input)) {
            input = 'https://' + input;
        }
        try {
            new URL(input); // Only for validation
            setUrl(input);
            setUrlError(null);
            // Switch to reader tab
            router.replace('/');
        } catch {
            setUrlError('Please enter a valid domain or URL');
        }
    };

    interface SettingItemProps {
        icon: Parameters<typeof IconSymbol>[0]['name'];
        title: string;
        subtitle?: string;
        rightComponent?: React.ReactNode;
        onPress?: () => void;
    }

    const SettingItem = ({ icon, title, subtitle, rightComponent, onPress }: SettingItemProps) => (
        <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.settingItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: isDark ? Colors.dark.primary : Colors.light.primaryVariant }]}>
                    <IconSymbol name={icon} size={20} color={Colors.light.background} />
                </View>
                <View style={styles.settingTextContainer}>
                    <ThemedText style={[styles.settingTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                        {title}
                    </ThemedText>
                    {subtitle && (
                        <ThemedText style={[styles.settingSubtitle, { color: isDark ? Colors.dark.icon : Colors.light.icon }]}>
                            {subtitle}
                        </ThemedText>
                    )}
                </View>
            </View>
            {rightComponent}
        </TouchableOpacity>
    );

    const AboutModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={aboutModalVisible}
            onRequestClose={() => setAboutModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContainer, { backgroundColor: Colors[isDark ? 'dark' : 'light'].modal }]}>
                    <LinearGradient
                        colors={Colors[isDark ? 'dark' : 'light'].gradientAccent as [string, string, string]}
                        style={styles.modalHeader}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <IconSymbol name="info.circle.fill" size={32} color={Colors.light.background} />
                        <ThemedText style={styles.modalTitle}>Web Reader</ThemedText>
                    </LinearGradient>

                    <View style={styles.modalContent}>
                        <View style={styles.versionSection}>
                            <ThemedText style={[styles.versionLabel, { color: isDark ? Colors.dark.icon : Colors.light.icon }]}>
                                Version
                            </ThemedText>
                            <ThemedText style={[styles.versionText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                                1.0.0
                            </ThemedText>
                        </View>

                        {/* Developer Information */}
                        <View style={styles.developerSection}>
                            <ThemedText style={[styles.versionLabel, { color: isDark ? Colors.dark.icon : Colors.light.icon }]}>
                                Developed by
                            </ThemedText>
                            <ThemedText style={[styles.versionText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                                SLT Developer
                            </ThemedText>
                        </View>

                        <View style={[styles.divider, { backgroundColor: Colors[isDark ? 'dark' : 'light'].border }]} />

                        <View style={styles.techSection}>
                            <ThemedText style={[styles.techLabel, { color: isDark ? Colors.dark.icon : Colors.light.icon }]}>
                                Built with
                            </ThemedText>
                            <View style={styles.techStack}>
                                <View style={[styles.techBadge, { backgroundColor: isDark ? Colors.dark.badge : Colors.light.badge }]}>
                                    <ThemedText style={[styles.techText, { color: isDark ? Colors.dark.info : Colors.light.info }]}>
                                        React Native
                                    </ThemedText>
                                </View>
                                <View style={[styles.techBadge, { backgroundColor: isDark ? Colors.dark.badge : Colors.light.badge }]}>
                                    <ThemedText style={[styles.techText, { color: isDark ? Colors.dark.info : Colors.light.info }]}>
                                        Expo
                                    </ThemedText>
                                </View>
                                <View style={[styles.techBadge, { backgroundColor: isDark ? Colors.dark.badge : Colors.light.badge }]}>
                                    <ThemedText style={[styles.techText, { color: isDark ? Colors.dark.info : Colors.light.info }]}>
                                        TypeScript
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[styles.closeButton, { backgroundColor: isDark ? Colors.dark.primary : Colors.light.primaryVariant }]}
                            onPress={() => setAboutModalVisible(false)}
                            activeOpacity={0.8}
                        >
                            <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

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

            <AboutModal />

            {/* Modern Header */}
            <LinearGradient
                colors={gradientColors as [string, string, string]}
                style={styles.headerContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[styles.headerContent, { paddingTop: insets.top + 25 }]}>
                    <View style={styles.titleSection}>
                        <IconSymbol
                            name="gearshape.fill"
                            size={24}
                            color={isDark ? Colors.dark.info : Colors.light.primary}
                            style={styles.titleIcon}
                        />
                        <ThemedText style={[styles.headerTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                            Settings
                        </ThemedText>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Appearance Section */}
                <View style={[styles.section, { marginTop: 25 }]}>
                    <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.info : Colors.light.primary }]}>
                        Appearance
                    </ThemedText>
                    <ThemeSelector isDark={isDark} />
                </View>

                {/* Browser Section */}
                <View style={styles.section}>
                    <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.info : Colors.light.primary }]}>Browser</ThemedText>

                    {/* URL Input */}
                    <View style={{ marginBottom: 16 }}>
                        <ThemedText style={{ fontSize: 14, fontWeight: '600', marginBottom: 6, color: isDark ? Colors.dark.text : Colors.light.text }}>Root URL</ThemedText>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconSymbol name="globe" size={18} color={isDark ? Colors.dark.icon : Colors.light.icon} style={{ marginRight: 8 }} />
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    value={urlInput}
                                    onChangeText={setUrlInput}
                                    style={{
                                        width: '100%',
                                        padding: 8,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: isDark ? '#444' : '#ccc',
                                        backgroundColor: isDark ? '#222' : '#fff',
                                        color: isDark ? '#fff' : '#222',
                                        fontSize: 14,
                                    }}
                                    placeholder="Enter root URL (e.g. komikcast02.com)"
                                    placeholderTextColor={isDark ? '#888' : '#aaa'}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                            <TouchableOpacity onPress={handleUrlSave} style={{ marginLeft: 8, padding: 8, borderRadius: 8, backgroundColor: isDark ? Colors.dark.primary : Colors.light.primary }}>
                                <ThemedText style={{ color: '#fff', fontWeight: '600' }}>Save</ThemedText>
                            </TouchableOpacity>
                        </View>
                        {urlError && <ThemedText style={{ color: Colors.dark.error, marginTop: 4 }}>{urlError}</ThemedText>}
                    </View>

                    <SettingItem
                        icon="bell.fill"
                        title="Notifications"
                        subtitle="Enable push notifications"
                        rightComponent={
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                                thumbColor={notifications ? '#ffffff' : '#ffffff'}
                            />
                        }
                    />
                    <SettingItem
                        icon="speedometer"
                        title="Data Compression"
                        subtitle="Reduce data usage"
                        rightComponent={
                            <Switch
                                value={dataCompression}
                                onValueChange={setDataCompression}
                                trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                                thumbColor={dataCompression ? '#ffffff' : '#ffffff'}
                            />
                        }
                    />
                    <SettingItem
                        icon="shield.fill"
                        title="AdBlock"
                        subtitle="Block ads and protect privacy"
                        rightComponent={
                            <Switch
                                value={adBlock}
                                onValueChange={setAdBlock}
                                trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                                thumbColor={adBlock ? '#ffffff' : '#ffffff'}
                            />
                        }
                    />
                </View>

                {/* Data Section */}
                <View style={styles.section}>
                    <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.info : Colors.light.primary }]}>
                        Data
                    </ThemedText>

                    <SettingItem
                        icon="trash.fill"
                        title="Clear Cache"
                        subtitle="Free up storage space"
                        onPress={handleClearCache}
                        rightComponent={
                            <IconSymbol
                                name="chevron.right"
                                size={16}
                                color={isDark ? '#9ca3af' : '#6b7280'}
                            />
                        }
                    />
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <ThemedText style={[styles.sectionTitle, { color: isDark ? Colors.dark.info : Colors.light.primary }]}>
                        About
                    </ThemedText>

                    <SettingItem
                        icon="info.circle.fill"
                        title="About Web Reader"
                        subtitle="Version & info"
                        onPress={handleAbout}
                        rightComponent={
                            <IconSymbol
                                name="chevron.right"
                                size={16}
                                color={isDark ? '#9ca3af' : '#6b7280'}
                            />
                        }
                    />
                </View>

                {/* Footer Space */}
                <View style={styles.footer} />
            </ScrollView>
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
    },
    titleIcon: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    section: {
        marginTop: 30,
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        letterSpacing: 0.3,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    settingItemLeft: {
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
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 14,
        opacity: 0.8,
    },
    footer: {
        height: 50,
        marginTop: 15,
    },
    // About Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 350,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 20,
    },
    modalHeader: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ffffff',
        marginTop: 8,
        letterSpacing: 0.5,
    },
    modalContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    versionSection: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    versionLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        opacity: 0.8,
    },
    versionText: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 1,
    },
    developerSection: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    developerLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        opacity: 0.8,
    },
    developerText: {
        fontSize: 20,
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        marginVertical: 15,
        opacity: 0.3,
    },
    descriptionSection: {
        paddingVertical: 15,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        opacity: 0.9,
    },
    techSection: {
        paddingVertical: 15,
    },
    techLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 12,
        textAlign: 'center',
        opacity: 0.8,
    },
    techStack: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    techBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    techText: {
        fontSize: 13,
        fontWeight: '600',
    },
    closeButton: {
        marginTop: 25,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
