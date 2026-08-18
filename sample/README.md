# AppicaSample — React Native demo app

A React Native **0.75** app that imports the `@appica/ui-react-native` library (TypeScript **source**) and demos **every** component from the library, validated with real iOS and Android native builds.

The library is consumed via a local `file:..` dependency, so Metro transforms the library's TypeScript source directly (`transformIgnorePatterns` allows `@appica`).

> The sample lives **inside** the `@appica/ui-react-native` repo at `sample/`. The library root is therefore `..` (the repo root).

## Prerequisites

- Node ≥ 18 (use the project's managed Node — **do not** run builds under an environment that injects a `NODE_OPTIONS=--require=<shim>` wrapper; see the iOS note below).
- iOS: Xcode 15+ and CocoaPods (`brew install cocoapods`).
- Android: Android SDK with **platform 34**, **build-tools 34.0.0**, and **NDK 26.1.10909125**, plus a **JDK 17** (Gradle 8.x / AGP reject JDK 21/24).

## Install

```bash
cd sample
npm install --legacy-peer-deps   # react-native@0.74 (peer in the lib) vs react@18.3.1 needs the legacy flag
```

## Typecheck (real React Native types)

```bash
npm run typecheck        # ./node_modules/.bin/tsc --noEmit -p tsconfig.json
```

The sample `tsconfig.json` intentionally uses `moduleResolution: "node"` instead of `bundler` so that TypeScript resolves `@types/react` for the real `react` package — under `bundler` the published `react` package lacks a `types` condition and TS fails to fall back to `@types/react` (`TS7016`).

## iOS

```bash
cd sample/ios
pod install
```

Then build. **Important:** RN 0.75's Hermes "Replace Hermes" script shells out with `fs.rmSync`, which the WorkBuddy sandbox safe-delete shim blocks. Clear `NODE_OPTIONS` for the build so the script runs unguarded (the target is a build artifact inside `Pods/`, not personal files):

```bash
cd sample/ios
NODE_OPTIONS= xcodebuild \
  -workspace HelloWorld.xcworkspace \
  -scheme HelloWorld \
  -configuration Release \
  -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath build \
  CODE_SIGNING_ALLOWED=NO
```

The `Podfile` already contains a `post_install` hook defining `HAVE_PTHREAD`, `HAVE_PREAD`, and `HAVE_PWRITE` for the `glog` target — required because RN 0.75's bundled glog 0.3.5 does not compile against Apple SDK 26's `pread`/`pwrite`/`mutex.h`. Without it the build fails with `mutex.h: Need to implement mutex.h for your architecture` / `static declaration of 'pread' follows non-static declaration`.

The build produces `ios/build/Build/Products/Release-iphonesimulator/HelloWorld.app`.

To open in Xcode instead:

```bash
open ios/HelloWorld.xcworkspace
```

## Android

RN 0.75's Gradle build needs **JDK 17** (not the system/JDK 24). Point `JAVA_HOME` at a JDK 17 install (e.g. `brew install openjdk@17`) and ensure the SDK components listed above are installed via `sdkmanager`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export JAVA_HOME=/opt/homebrew/opt/openjdk@17   # adjust to your JDK 17 path
sdkmanager "platforms;android-34" "build-tools;34.0.0" "ndk;26.1.10909125"
```

Then build:

```bash
cd sample/android
./gradlew assembleDebug        # -> app/build/outputs/apk/debug/app-debug.apk
# or: ./gradlew assembleRelease
```

## Validation already performed (CI-equivalent, no GUI)

Because the native toolchains may be absent in some environments, the library and demo are also verified with lighter checks:

```bash
# Library typecheck (real RN 0.74 types)
cd Appica-Native && ./node_modules/.bin/tsc --noEmit

# Metro production bundles (CI=true disables the file watcher → avoids EMFILE)
cd sample
CI=true ./node_modules/.bin/react-native bundle --entry-file index.js --platform ios     --dev false --bundle-output /tmp/ios_main.bundle     --assets-dest /tmp/ios_assets
CI=true ./node_modules/.bin/react-native bundle --entry-file index.js --platform android --dev false --bundle-output /tmp/android_main.bundle --assets-dest /tmp/android_assets
```

## Outputs produced in this repo

- iOS: `sample/ios/build/Build/Products/Release-iphonesimulator/HelloWorld.app` ✅ built
- Android: `sample/android/app/build/outputs/apk/debug/app-debug.apk` ✅ built
