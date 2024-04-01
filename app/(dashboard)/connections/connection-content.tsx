"use client"

import { KafkaConnection } from "@/types/kafka"
import { ConnectionItem } from "@/components/dashboard/connection/connection-item"
import { ConnectionManagementDialog } from "@/components/dashboard/connection/connection-management-dialog"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeading } from "@/components/dashboard/heading"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

interface DashboardConnectionsContentProps {
  connections?: KafkaConnection[] | null
  setKafkaConnections: () => void
}

export default function DashboardConnectionsContent({
  connections,
  setKafkaConnections,
}: DashboardConnectionsContentProps) {
  return (
    <DashboardShell>
      <DashboardHeading
        heading="Connections"
        text="Create and manage connections."
      >
        <ConnectionManagementDialog setKafkaConnections={setKafkaConnections} />
      </DashboardHeading>
      <div>
        {connections?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {connections.map((connection) => (
              <ConnectionItem
                key={connection.id}
                connection={connection}
                setKafkaConnections={setKafkaConnections}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No connection created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any connections yet. Create one.
            </EmptyPlaceholder.Description>
            <ConnectionManagementDialog
              variant="outline"
              setKafkaConnections={setKafkaConnections}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
