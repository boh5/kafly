"use client"

import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"

import { KafkaConnection } from "@/types/kafka"
import { TauriResponse, Topic } from "@/types/topic"
import { getKafkaConnections } from "@/lib/tauri-store/kafka-connection"
import { getChosenConnectionId } from "@/lib/tauri-store/settings"
import { TopicsTable } from "@/app/topics/topics-table"

export default function TopicsPage() {
  const [topicsResp, setTopicsResp] = useState<TauriResponse<Topic[]> | null>(
    null
  )
  const [connections, setConnections] = useState<KafkaConnection[] | null>(null)
  useEffect(() => {
    getKafkaConnections().then((data) => {
      console.log("setConnections", data)
      setConnections(data)
    })
  }, [])

  const [selectedConnection, setSelectedConnection] =
    useState<KafkaConnection | null>(null)
  useEffect(() => {
    getChosenConnectionId().then((connectionId) => {
      console.log("connectionId", connectionId)
      setSelectedConnection(
        connections?.find((connection) => connection.id === connectionId) ||
          null
      )
    })
  }, [connections])

  useEffect(() => {
    if (!selectedConnection) return
    invoke<TauriResponse<Topic[]>>("get_topics", {
      brokers: `${selectedConnection?.servers[0].host}:${selectedConnection?.servers[0].port}`,
    }).then((resp) => {
      console.log("resp", resp)
      setTopicsResp(resp)
    })
  }, [selectedConnection])

  return (
    <div>
      {topicsResp ? (
        topicsResp.data ? (
          topicsResp.data.length ? (
            <TopicsTable data={topicsResp.data} />
          ) : (
            <span>topics empty</span>
          )
        ) : (
          <span>Error: {topicsResp?.error}</span>
        )
      ) : null}
    </div>
  )
}
