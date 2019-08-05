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
}

export {}
