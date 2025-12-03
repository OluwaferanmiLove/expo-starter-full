# {{projectName}}

# Expo Starter Template

A feature-rich React Native Expo starter template with push notifications, NativeWind (TailwindCSS), navigation, state management, and more.

## 🚀 Features

- **Expo SDK 54** - Latest Expo framework
- **React Native 0.81** - Latest React Native
- **TypeScript** - Full TypeScript support with strict mode
- **NativeWind** - TailwindCSS for React Native styling
- **React Navigation** - Native stack navigation with auth flow
- **Zustand** - Lightweight state management
- **TanStack Query** - Powerful data fetching and caching
- **Expo Notifications** - Push notification support
- **ESLint & Prettier** - Code quality and formatting
- **Path Aliases** - Clean imports with `@/` prefix

## 📁 Project Structure

```
├── App.tsx                 # Application entry point
├── src/
│   ├── @types/            # TypeScript type definitions
│   ├── assets/            # Images, fonts, and other assets
│   ├── components/        # Reusable UI components
│   │   ├── home/          # Home-specific components
│   │   └── ui/            # Generic UI components
│   ├── hooks/             # Custom React hooks
│   ├── navigation/        # Navigation configuration
│   ├── screens/           # Screen components
│   ├── store/             # Zustand state stores
│   ├── theme/             # Theme configuration (colors, etc.)
│   └── utils/             # Utility functions
├── assets/                # App icons and splash screens
└── global.css             # Global TailwindCSS styles
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Yarn](https://yarnpkg.com/) (recommended), npm, or pnpm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)
- For iOS development: macOS with Xcode
- For Android development: Android Studio with Android SDK

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd starter-template
```

### 2. Install dependencies

We recommend using **Yarn** as the package manager:

```bash
# Using Yarn (recommended)
yarn install

# Using npm
npm install

# Using pnpm
pnpm install
```

## 🏃 Running the Project

### Start the development server

```bash
# Using Yarn (recommended)
yarn start

# Using npm
npm start
```

This will start the Expo development server. You'll see a QR code in the terminal.

### Run on specific platforms

```bash
# iOS Simulator (macOS only)
yarn ios
# or: npm run ios

# Android Emulator
yarn android
# or: npm run android

# Web Browser
yarn web
# or: npm run web
```

### Using Expo Go

1. Install the **Expo Go** app on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

## 📱 Development Builds

For features that require native code (like push notifications), you'll need a development build:

```bash
# Generate native projects
yarn prebuild
# or: npm run prebuild

# Then run on device/simulator
yarn ios
yarn android
```

## 🧹 Code Quality

### Linting

Check for code issues:

```bash
yarn lint
# or: npm run lint
```

### Formatting

Auto-fix and format code:

```bash
yarn format
# or: npm run format
```

## 📦 Key Dependencies

| Package | Description |
|---------|-------------|
| `expo` | Expo SDK framework |
| `nativewind` | TailwindCSS for React Native |
| `@react-navigation/native` | Navigation library |
| `zustand` | State management |
| `@tanstack/react-query` | Data fetching & caching |
| `expo-notifications` | Push notifications |
| `axios` | HTTP client |
| `react-native-reanimated` | Animations |
| `iconsax-react-native` | Icon library |

## 🔧 Configuration Files

- `app.json` - Expo configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - TailwindCSS configuration
- `babel.config.js` - Babel configuration
- `eslint.config.js` - ESLint rules
- `prettier.config.js` - Prettier formatting rules
- `metro.config.js` - Metro bundler configuration

## 🎨 Styling with NativeWind

This template uses NativeWind (TailwindCSS for React Native). Example usage:

```tsx
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold text-gray-900">
        Hello World!
      </Text>
    </View>
  );
}
```

## 🔐 Authentication

The template includes a pre-configured authentication flow:

- **Auth Store** (`src/store/authStore.ts`) - Zustand store for auth state
- **Auth Navigation** - Separate navigation stacks for authenticated/unauthenticated users
- **Screens**: Login, Signup, Home, Profile, Settings

To implement real authentication, update the `login` and `signup` methods in `authStore.ts`.

## 🔔 Push Notifications

Push notifications are pre-configured with `expo-notifications`. The setup hook is in `src/hooks/use-notification-setup.ts`.

For production use:
1. Configure push notification credentials in your Expo project
2. Handle notification tokens in your backend
3. Customize the notification handlers as needed

## 📝 Path Aliases

Import paths are simplified using the `@/` alias:

```tsx
// Instead of:
import { useAuthStore } from '../../../store/authStore';

// Use:
import { useAuthStore } from '@/store/authStore';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

Happy coding! 🎉
