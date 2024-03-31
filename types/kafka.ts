export interface KafkaBootstrapServer {
  host: string
  port: string
}

export interface KafkaConnection {
  name: string
  servers: KafkaBootstrapServer[]
  readonly: boolean
}

export interface KafkaSettings {
  file: string
}
