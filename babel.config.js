module.exports = api => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
	// https://browserl.ist/?q=last+4+Chrome+version%2C+last+2+Firefox+version
        targets: 'last 4 Chrome version, last 2 Firefox version',
        useBuiltIns: 'entry',
        corejs: 2,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ]
  const plugins = [
    '@babel/plugin-proposal-class-properties',
  ]

  return {
    presets,
    plugins,
  }
}
