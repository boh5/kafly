"use client"

import { useEffect, useState } from "react"

import { KafkaConnection } from "@/types/kafka"
import { getKafkaConnections } from "@/lib/tauri-store/kafka-connection"
import DashboardConnectionsContent from "@/app/(dashboard)/connections/connection-content"

export default function DashboardConnectionsPage() {
  const [connections, setConnections] = useState<KafkaConnection[] | null>(null)

  function setKafkaConnections() {
    getKafkaConnections().then((data) => {
      console.log("data", data)
      setConnections(data)
    })
  }

  useEffect(() => {
    setKafkaConnections()
  }, [])

  console.log("connections", connections)

  return (
    <DashboardConnectionsContent
      connections={connections}
      setKafkaConnections={setKafkaConnections}
    />
  )
}
