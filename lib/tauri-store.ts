import { Store } from "tauri-plugin-store-api"

import { KafkaConnection } from "@/types/kafka"
import { kafkaSetting } from "@/config/kafka"

export async function getKafkaConnections(): Promise<KafkaConnection[] | null> {
  const store = new Store(kafkaSetting.file)
  return await store.get("connections")
}

export async function setKafkaConnections(
  connections: KafkaConnection[]
): Promise<void> {
  const store = new Store(kafkaSetting.file)
  await store.set("connections", connections)
  await store.save()
}
