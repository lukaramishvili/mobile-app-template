module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
    ],
    plugins:[
      // ALWAYS put reanimated last
      '@babel/plugin-proposal-export-namespace-from',
      [
        'react-native-reanimated/plugin', {
          relativeSourceLocation: true,
        },
      ]
    ],
  };
};
