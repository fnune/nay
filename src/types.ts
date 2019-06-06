declare global {
  interface Rule {
    match: string
    reason?: string
  }

  type SerializedRules = string

  interface NayStorage extends Storage {
    rules: SerializedRules
  }

}

export {}
