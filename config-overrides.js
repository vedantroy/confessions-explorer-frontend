const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const path = require('path')
const { override, fixBabelImports } = require('customize-cra');


module.exports = override(
    // Only use icons in icons.js instead of using every icon.
    fixBabelImports('import', {
        libraryName: 'antd',
        style: 'css',
    }),
    function(config, env) {
        const alias = config.resolve.alias || {};
        alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './src/icons.js');
        config.resolve.alias = alias;
        return config;
    },
    // Use day.js instead of moment.js in ant design
    function(config, env) {
        config.plugins.push(new AntdDayjsWebpackPlugin())
        return config
    }
);