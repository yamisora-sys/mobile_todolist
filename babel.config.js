module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@config': './src/config',
            '@hooks': './src/hooks',
            '@styles': './src/styles',
            '@redux': './src/redux',
            '@pages': './src/pages',
            '@api': './src/api',
            '@img': './src/img',
          },
        },
      ],
    ],
  };
};
