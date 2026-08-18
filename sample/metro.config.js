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
    // The library lives in a sibling folder (../Appica-Native) and its own
    // node_modules doesn't contain react-native / react / the community
    // packages (they're peers, resolved from THIS project). Teach Metro to look
    // here so the library's imports resolve to the single shared copy.
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    // Transform the TS library; leave prebuilt node_modules (react-native core,
    // @react-native/*, the community slider/clipboard) untouched.
    transformIgnorePatterns: [
      /node_modules\/(?!((@appica|react-native|@react-native)[/\\]).*)/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
