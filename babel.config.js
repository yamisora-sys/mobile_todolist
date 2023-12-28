module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",{
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true
        }
      ],
      'babel-plugin-react-native-classname-to-style',
      [
        'babel-plugin-react-native-platform-specific-extensions', {extensions: ['css', 'scss', 'sass']}
      ],
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
            '@css': './src/css',
            '@context': './src/context',
            '@services': './src/services',
            '@animations': './src/animations',
          },
        },
      ],
    ],
  };
};
