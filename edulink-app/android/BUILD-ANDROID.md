# EduLink Eswatini Android Project

This Android project is based on the supplied EduLink React/Vite prototype. The original source is retained under `edulink-source/` and the web project remains at the repository root.

## Recommended build

1. Install Node.js 20+ and Android Studio.
2. From the project root run `npm install`.
3. Run `npm run cap:add` if the Capacitor Android project needs regeneration, or open the existing `android/` folder in Android Studio.
4. For the React prototype build, run `npm run build` and `npx cap sync android`.
5. In Android Studio choose **Build > Build APK(s)**.

The final debug APK will normally be under `android/app/build/outputs/apk/debug/`.
