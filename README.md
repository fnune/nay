# Nay!

[![Build Status](https://travis-ci.org/brainlessdeveloper/nay.svg?branch=master)](https://travis-ci.org/brainlessdeveloper/nay)

> An upcoming WebExtension for Firefox and Chrome.

Say "nay!" to URLs in your blacklist. Disable links to matching URLs, and remember why you did so.

![image](https://user-images.githubusercontent.com/16181067/62499349-a299ef80-b7e2-11e9-9f95-3e915f2c57a6.png)

## Development

**Build and development scripts:**

| Script          | Description                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `build`         | Makes a production build.                                                                                   |
| `start:watch`   | Makes a development build and watches for changes.                                                          |
| `start:firefox` | Opens Firefox with the extension and reloads on change using [web-ext](https://github.com/mozilla/web-ext). |
| `start`         | Runs `start:watch` and `start:firefox` in parallel.                                                         |
| `format`        | Runs [Prettier](https://github.com/prettier/prettier) in write mode.                                        |
| `lint:autofix`  | Runs [tslint](https://github.com/palantir/tslint) in autofix mode.                                          |

The first time you run `yarn`, `web-ext` will throw an exception because there's no build directory. Run `yarn build` first to fix this.

**Testing the extension:**

| Script        | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| `lint`        | Runs [tslint](https://github.com/palantir/tslint).                   |
| `test`        | Runs the [Jest](https://github.com/facebook/jest) unit test suite.   |
| `test:format` | Runs [Prettier](https://github.com/prettier/prettier) in check mode. |
| `typecheck`   | Compiles the project without emitting files.                         |
