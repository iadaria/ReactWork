module.exports = {
    preset: 'react-native',
    "moduleDirectories": [
        "node_modules",
        "src"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        "node_modules/(?!(react-native"
        + "|react-navigation-tabs"
        + "|react-native-splash-screen"
        + "|react-native-screens"
        + "|react-native-reanimated"
        + "|react-native-firebase"
        + ")/)",
    ],
    "setupFiles": [
        "./__tests__/setup.js"
    ]
};