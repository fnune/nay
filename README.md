# Nay!

[![Build Status](https://travis-ci.org/brainlessdeveloper/nay.svg?branch=master)](https://travis-ci.org/brainlessdeveloper/nay)

> A WebExtension for Firefox and Chrome.

Say "nay!" to URLs in your blacklist. Disable links to matching URLs, and remember why you did so.

![image](https://user-images.githubusercontent.com/16181067/62499349-a299ef80-b7e2-11e9-9f95-3e915f2c57a6.png)

Use this as a way to avoid clicking on links to websites you hate because of their use of dark patterns, GDPR pop-ups that are purposefully hard to complete, disregard for user privacy or any other kind of abuse.

The currently implemented functionality is basic:

- Adding a rule and a reason why it's been added.
- Prepending an angry emoji 😤 to the text content of matching links.
- Intercepting clicks on those links with a prompt for confirmation that displays the reason for the blockage.
- Showing how many links have been blocked in a tab.

## Install

<div style="display: flex;">
  <a href="https://addons.mozilla.org/en-US/firefox/addon/nay/">
    <img width="64" height="64" src="https://user-images.githubusercontent.com/16181067/64076344-facdef80-ccc3-11e9-99cc-713a66a17c4f.png" />
  </a>
  <a href="https://chrome.google.com/webstore/detail/nay/ebnlpahabbpbkpfcfdkcegkippoboocp">
    <img width="64" height="64" src="https://user-images.githubusercontent.com/16181067/65276293-b2b62600-db27-11e9-8a68-a427ca8dc082.png" />
  </a>
</div>

## Development

**Build and development scripts:**

| Script            | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `build`           | Makes a production build.                                                                                   |
| `build:extension` | Builds a ZIP in `./artifacts` file using [web-ext](https://github.com/mozilla/web-ext).                     |
| `build:release`   | Runs `build`, `build:extension` and `zip` sequentially.                                                     |
| `start:watch`     | Makes a development build and watches for changes.                                                          |
| `start:firefox`   | Opens Firefox with the extension and reloads on change using [web-ext](https://github.com/mozilla/web-ext). |
| `start`           | Runs `start:watch` and `start:firefox` in parallel.                                                         |
| `format`          | Runs [Prettier](https://github.com/prettier/prettier) in write mode.                                        |
| `lint:autofix`    | Runs [tslint](https://github.com/palantir/tslint) in autofix mode.                                          |
| `zip`             | Builds a ZIP file in `./artifacts` of the source for code review submissions.                               |

The first time you run `yarn`, `web-ext` will throw an exception because there's no build directory. Run `yarn build` first to fix this.

**Testing the extension:**

| Script           | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `lint`           | Runs [tslint](https://github.com/palantir/tslint).                   |
| `lint:extension` | Lints using [web-ext](https://github.com/mozilla/web-ext).           |
| `test`           | Runs the [Jest](https://github.com/facebook/jest) unit test suite.   |
| `test:format`    | Runs [Prettier](https://github.com/prettier/prettier) in check mode. |
| `typecheck`      | Compiles the project without emitting files.                         |
