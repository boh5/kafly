export interface KafkaBootstrapServer {
  host: string
  port: number
}

export interface KafkaConnection {
  id: string
  name: string
  servers: KafkaBootstrapServer[]
  readonly: boolean
}

export interface KafkaSettings {
  file: string
}
