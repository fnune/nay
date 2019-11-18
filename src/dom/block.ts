/**
 * @file Block all links found on the page once.
 */

import { block } from './utils'

block(Array.from(document.getElementsByTagName('a')))
