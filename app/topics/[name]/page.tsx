import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ConnectionItem } from "@/components/dashboard/connection/connection-item"
import { ConnectionManagementDialog } from "@/components/dashboard/connection/connection-management-dialog"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { TopicContent } from "@/app/topics/[name]/topic-content"

export function generateStaticParams() {
  return [
    {
      name: "1",
    },
  ]
}

export type TopicDetailPageProps = {
  params: {
    name: string
  }
}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  return (
    <DashboardShell>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/topics">Topics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TopicContent name={params.name} />
    </DashboardShell>
  )
}
