module.exports = api => {
  const isTest = api.env('test')
  api.cache(true)
  if (isTest) {
    return {
      presets: ['@babel/preset-env', '@babel/preset-react'],

      env: {
        test: {
          presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
        }
      }
    }
  }

  return {
    presets: ['next/babel']
  }
}
