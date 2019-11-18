# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Support SPAs by blocking links incrementally via `MutationObserver`.
- If the user is already on an origin they want to block, we don't want to block all internal links. Nay! now avoids this by excluding rules that match the current origin.

## [0.2.1] - 2019-09-16

### Fixed

- Compatibility with Chrome restored in preparation for a Chrome release.

## [0.2.0] - 2019-09-16

### Added

- Showing how many links have been blocked in a tab.

## [0.1.0] - 2019-08-10

### Added

Basic functionality:

- Adding a rule and a reason why it's been added.
- Prepending a 😤 to the text content of matching links.
- Incercepting clicks on those links with a prompt for confirmation that displays the reason for blockage.
