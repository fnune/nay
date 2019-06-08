declare module '*.scss'

/** Defined via webpack.DefinePlugin */
declare const MASKED_URL: string

declare module 'webextension-polyfill' {
  const browserNamespace: typeof browser
  export default browserNamespace
}
