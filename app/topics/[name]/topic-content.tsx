"use client"

import { useEffect } from "react"
import { invoke } from "@tauri-apps/api/tauri"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type TopicContentProps = {
  name: string
}

export function TopicContent({ name }: TopicContentProps) {
  useEffect(() => {
    invoke<string>("get_topics", { brokers: "localhost: 9092" }).then(
      (topics) => {
        console.log("topics", topics)
      }
    )
  }, [])

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="consumers">Consumers</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview</TabsContent>
      <TabsContent value="messages">Messages</TabsContent>
      <TabsContent value="consumers">Consumers</TabsContent>
    </Tabs>
  )
}
