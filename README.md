# Dark Apps

A modern, privacy-focused web reader built with [Expo](https://expo.dev) and React Native. This app is designed for reading web content with advanced ad blocking, persistent custom root URL, and a beautiful dark/light UI.

---

## 🚀 Features

- **Customizable Root URL**: Set and persist your preferred website as the main reader.
- **Advanced AdBlock**: Blocks popups, floating ads, and external app/browser redirects.
- **Dark & Light Mode**: Follows system theme or manual selection.
- **Data Compression**: Optional mode to reduce data usage.
- **Persistent Settings**: All preferences saved with AsyncStorage.
- **Modern UI**: Responsive, touch-friendly, and beautiful.

---

## 📱 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the app**
   ```bash
   npx expo start
   ```
3. **Open on device/emulator**
   - Scan QR code with Expo Go (Android/iOS)
   - Or use Android/iOS simulator

---

## ⚙️ Project Structure

- `app/` — Source code (screens, navigation)
- `components/` — UI components
- `contexts/` — Context providers (Theme, AdBlock, URL, etc)
- `utils/adblockScript.ts` — Advanced adblock logic for WebView
- `assets/` — Images and fonts

---

## 🛡️ Permissions

- **Internet**: Required for WebView browsing.
- No unnecessary permissions requested.

---

## 📝 Scripts

- `npm run reset-project` — Reset to a blank starter

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [Expo Router](https://expo.github.io/router/docs)

---

## 👤 Author & License

- Developed by SLT Developer
- MIT License
