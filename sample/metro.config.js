const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration for the Appica UI React Native demo.
 *
 * `@appica/ui-react-native` is pulled in as a local `file:` dependency — npm/yarn
 * symlinks it into node_modules from ../Appica-Native. The library ships
 * TypeScript *source* (package.json `main: src/index.ts`), so Metro must
 * transform it. By default Metro skips transforming node_modules, so we add an
 * allow-list (`@appica`) to `transformIgnorePatterns`. We also watch the library
 * folder so edits reload live.
 */
// The sample lives inside the library repo at <repo>/sample, so the library
// root is the parent directory of this folder.
const libPath = path.resolve(__dirname, '..');

const config = {
  watchFolders: [libPath],
  resolver: {
    // The library lives in a sibling folder (../Appica-Native) and has its own
    // node_modules (dev deps for typechecking). Force singleton packages to
    // resolve from THIS project so Metro only bundles one copy of React/RN and
    // the peer deps shared with the library.
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    extraNodeModules: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      '@react-native-clipboard/clipboard': path.resolve(__dirname, 'node_modules/@react-native-clipboard/clipboard'),
      '@react-native-community/slider': path.resolve(__dirname, 'node_modules/@react-native-community/slider'),
    },
    // Transform the TS library; leave prebuilt node_modules (react-native core,
    // @react-native/*, the community slider/clipboard) untouched.
    transformIgnorePatterns: [
      /node_modules\/(?!((@appica|react-native|@react-native)[/\\]).*)/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
