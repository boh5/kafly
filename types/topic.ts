export interface Topic {
  name: string
  partitions_count: number
  messages_count: number
}

export interface TauriResponse<T> {
  data: T | null
  error: string | null
}
