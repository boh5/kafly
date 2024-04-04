"use client"

import { notFound, useSearchParams } from "next/navigation"
import { invoke } from "@tauri-apps/api/tauri"

import { KafkaConnection } from "@/types/kafka"
import { TauriResponse, Topic } from "@/types/topic"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TopicContent } from "@/app/topics/detail/topic-content"

export default function TopicDetailPage() {
  const params = useSearchParams()

  const topic_name = params.get("topic_name")
  if (!topic_name) {
    notFound()
  }

  return (
    <DashboardShell>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/topics">Topics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{topic_name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TopicContent name={topic_name} />
    </DashboardShell>
  )
}
