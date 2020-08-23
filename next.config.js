const withLess = require('@zeit/next-less');
// const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './assets/antd.less'), 'utf8')
// );

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    // modifyVars: themeVariables,
  },
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    const builtInLoader = config.module.rules.find((rule) => {
      if (rule.oneOf) {
        return (
          rule.oneOf.find((deepRule) => {
            if (deepRule.test && deepRule.test.toString().includes('/a^/')) {
              return true;
            }
            return false;
          }) !== undefined
        );
      }
      return false;
    });

    if (typeof builtInLoader !== 'undefined') {
      config.module.rules.push({
        oneOf: [
          ...builtInLoader.oneOf.filter((rule) => {
            return (rule.test && rule.test.toString().includes('/a^/')) !== true;
          }),
        ],
      });
    }

    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  env: {
    'SOCKET': 'http://localhost:5000',
    'API_URL': 'http://localhost:8080/',
    'MEDIA_SERVER': 'http://local.nms:8000/',
    'WEB_2_HLS': 'http://localhost:5001/'
  }
});