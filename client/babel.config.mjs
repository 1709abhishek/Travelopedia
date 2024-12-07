// export default {
//   presets: [
//     ['@babel/preset-env', { targets: { node: 'current' } }],
//     '@babel/preset-react',
//     '@babel/preset-typescript',
//   ],
// };

export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [

      'babel-plugin-transform-import-meta',
      {
        metaPropertyReplacement: {
          env: {
            VITE_API_APP_HOST: 'http://localhost:3000', // Replace with your desired value
          },
        },
      },
    ],
    "@babel/plugin-transform-runtime"
  ],
};
