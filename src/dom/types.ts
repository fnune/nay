/** A utility interface to help filter links  */
export interface Link {
  link: HTMLAnchorElement
  rule: Rule | undefined
}

/** A refined `Link` for which a blocking rule exists */
export interface LinkWithMatchingRule extends Link {
  rule: Rule
}
