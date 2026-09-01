# EduLink Eswatini — Android App Prototype

This project packages the existing EduLink React/Vite prototype as a real Android application using Capacitor.

## Prototype characteristics
- Real Android APK target
- Demo/local data only
- Existing role-based dashboards retained
- Local browser storage used by the prototype
- No paid server required for the prototype
- Backend/synchronization can be added later

## Build locally
```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

APK output:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Build on GitHub
Push the project to GitHub and run **Actions → Build EduLink Android APK**. The workflow uploads the debug APK as an artifact.

## Demo accounts
All demo accounts use password:
`demo123`

Examples:
- parent@demo.sz
- teacher@demo.sz
- accountant@demo.sz
- secretary@demo.sz
- principal@demo.sz
- deputy@demo.sz
- admin@demo.sz

## Important
This is a presentation prototype. It is not a production system and must not be used with real student information until proper authentication, encryption, backend authorization, secure document storage, audit logging, backups and privacy controls are implemented.
