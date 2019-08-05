declare module '*.scss'

/** Defined via webpack.DefinePlugin */
declare const NAY_CLASS: string

declare module 'webextension-polyfill' {
  const browserNamespace: typeof browser
  export default browserNamespace
}
