import { Store } from "tauri-plugin-store-api"

import { KafkaConnection } from "@/types/kafka"
import { AppSetting } from "@/config/app-config"

const store = new Store(AppSetting.connectionStoreFile)

export async function getKafkaConnections(): Promise<KafkaConnection[] | null> {
  return await store.get("connections")
}

export async function getKafkaConnection(
  id: string
): Promise<KafkaConnection | null> {
  const connections = await getKafkaConnections()
  return connections?.find((connection) => connection.id === id) || null
}

export async function setKafkaConnection(
  connection: KafkaConnection
): Promise<void> {
  let connections = await getKafkaConnections()
  if (connections) {
    connections.push(connection)
  } else {
    connections = [connection]
  }
  await store.set("connections", connections)
  await store.save()
}

export async function deleteKafkaConnection(id: string): Promise<void> {
  let connections = await getKafkaConnections()
  if (connections) {
    connections = connections.filter((connection) => connection.id !== id)
  }
  await store.set("connections", connections)
  await store.save()
}

export async function updateKafkaConnection(
  id: string,
  connection: Pick<KafkaConnection, "name" | "servers" | "readonly">
): Promise<void> {
  let connections = await getKafkaConnections()
  if (connections) {
    const index = connections.findIndex((connection) => connection.id === id)
    connections[index] = {
      ...connection,
      id,
    }
  }
  await store.set("connections", connections)
  await store.save()
}
