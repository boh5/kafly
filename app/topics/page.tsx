"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { invoke } from "@tauri-apps/api/tauri"

import { Topic } from "@/types/topic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopicsTable } from "@/app/topics/topics-table"

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[] | null>(null)

  useEffect(() => {
    invoke<Topic[]>("get_topics", { brokers: "localhost: 9092" }).then(
      (topics) => {
        console.log("topics", topics)
        setTopics(topics)
      }
    )
  }, [])

  return <TopicsTable topics={topics || []} />
}
