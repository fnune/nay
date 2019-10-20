declare global {
  interface Rule {
    id: Uuid
    match: string
    reason?: string
  }

  type SerializedRules = string
  type Uuid = string

  interface NayStorage extends Storage {
    rules: SerializedRules
  }

  /**
   * Message sent from a content script to the browser runtime
   * with the amount of links currently being blocked.
   */
  interface NotifyBlockedMessage {
    amount: number
  }

  /** https://fnune.com/typescript/2019/01/30/typescript-series-1-record-is-usually-not-the-best-choice */
  type Dictionary<K extends keyof any, T> = Partial<Record<K, T>>
}

export {}
