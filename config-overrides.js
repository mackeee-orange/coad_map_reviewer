const { override, fixBabelImports, addLessLoader } = require('customize-cra')

const myOverrides = config => {
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
        oneOf: [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
          ...rule.oneOf
        ]
      }
    }

    return rule
  })
  return config
}

const configs = override(
  myOverrides,
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
  }),
)


module.exports = configs
