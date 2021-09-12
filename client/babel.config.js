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
            '@components': './components',
            '@constants': './constants',
            '@hooks': './hooks',
            '@services': './services',
            '@screens': './screens',
            '@utils': './utils',
            '@contexts': './contexts'
          }
        }
      ],
      'module:react-native-dotenv'
    ]
  };
};
