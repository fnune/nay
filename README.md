# Nay!

[![Build Status](https://travis-ci.org/brainlessdeveloper/nay.svg?branch=master)](https://travis-ci.org/brainlessdeveloper/nay)

> A WebExtension for Firefox.

Say "nay!" to URLs in your blacklist. Disable links to matching URLs, and remember why you did so.

![image](https://user-images.githubusercontent.com/16181067/62499349-a299ef80-b7e2-11e9-9f95-3e915f2c57a6.png)

## Install

<div style="display: flex;">
  <a href="https://addons.mozilla.org/en-US/firefox/addon/nay/">
    <img width="64" height="64" src="https://user-images.githubusercontent.com/16181067/64076344-facdef80-ccc3-11e9-99cc-713a66a17c4f.png" />
  </a>
</div>

## Development

**Build and development scripts:**

| Script            | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `build`           | Makes a production build.                                                                                   |
| `build:extension` | Builds a ZIP file using [web-ext](https://github.com/mozilla/web-ext).                                      |
| `start:watch`     | Makes a development build and watches for changes.                                                          |
| `start:firefox`   | Opens Firefox with the extension and reloads on change using [web-ext](https://github.com/mozilla/web-ext). |
| `start`           | Runs `start:watch` and `start:firefox` in parallel.                                                         |
| `format`          | Runs [Prettier](https://github.com/prettier/prettier) in write mode.                                        |
| `lint:autofix`    | Runs [tslint](https://github.com/palantir/tslint) in autofix mode.                                          |

The first time you run `yarn`, `web-ext` will throw an exception because there's no build directory. Run `yarn build` first to fix this.

**Testing the extension:**

| Script           | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `lint`           | Runs [tslint](https://github.com/palantir/tslint).                   |
| `lint:extension` | Lints using [web-ext](https://github.com/mozilla/web-ext).           |
| `test`           | Runs the [Jest](https://github.com/facebook/jest) unit test suite.   |
| `test:format`    | Runs [Prettier](https://github.com/prettier/prettier) in check mode. |
| `typecheck`      | Compiles the project without emitting files.                         |
