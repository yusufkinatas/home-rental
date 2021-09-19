module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            types: './types.tsx',
            store: './store.ts',
            '@components': './components',
            '@constants': './constants',
            '@hooks': './hooks',
            '@services': './services',
            '@screens': './screens',
            '@utils': './utils',
            '@contexts': './contexts',
            '@slices': './slices'
          }
        }
      ],
      'module:react-native-dotenv'
    ]
  };
};
