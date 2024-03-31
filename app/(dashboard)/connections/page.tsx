"use client"

import { useEffect, useState } from "react"

import { KafkaConnection } from "@/types/kafka"
import { getKafkaConnections } from "@/lib/tauri-store"
import DashboardConnectionsContent from "@/app/(dashboard)/connections/connection-content"

export default function DashboardConnectionsPage() {
  const [connections, setConnections] = useState<KafkaConnection[] | null>(null)

  useEffect(() => {
    getKafkaConnections().then((data) => {
      setConnections(data)
    })
  }, [])

  console.log("connections", connections)

  return <DashboardConnectionsContent connections={connections} />
}
