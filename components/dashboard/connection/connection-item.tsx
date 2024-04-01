import { KafkaConnection } from "@/types/kafka"
import { Skeleton } from "@/components/ui/skeleton"
import { ConnectionManagementDialog } from "@/components/dashboard/connection/connection-management-dialog"
import { ConnectionOperations } from "@/components/dashboard/connection/connection-operations"

interface ConnectionItemProps {
  connection: KafkaConnection
  setKafkaConnections: () => void
}

export function ConnectionItem({
  connection,
  setKafkaConnections,
}: ConnectionItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <h1>{connection.name}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <ConnectionManagementDialog
          className="size-8"
          connection={connection}
          setKafkaConnections={setKafkaConnections}
        />
        <ConnectionOperations
          connection={connection}
          setKafkaConnections={setKafkaConnections}
        />
      </div>
    </div>
  )
}

ConnectionItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
