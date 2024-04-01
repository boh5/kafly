"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { KafkaConnection } from "@/types/kafka"
import { getKafkaConnections } from "@/lib/tauri-store/kafka-connection"
import {
  getChosenConnectionId,
  setChosenConnectionId,
} from "@/lib/tauri-store/settings"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function ConnectionCombobox() {
  const [connections, setConnections] = useState<KafkaConnection[] | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedConnection, setSelectedConnection] =
    useState<KafkaConnection | null>(null)

  useEffect(() => {
    getKafkaConnections().then((data) => {
      console.log("setConnections", data)
      setConnections(data)
    })
  }, [])

  useEffect(() => {
    getChosenConnectionId().then((connectionId) => {
      console.log("connectionId", connectionId)
      setSelectedConnection(
        connections?.find((connection) => connection.id === connectionId) ||
          null
      )
    })
  }, [connections])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedConnection
            ? selectedConnection.name
            : "Select connection..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search connection..." />
          <CommandList>
            <CommandEmpty>No connection found.</CommandEmpty>
            <CommandGroup>
              {connections?.length
                ? connections.map((connection) => (
                    <CommandItem
                      key={connection.id}
                      value={connection.name}
                      onSelect={(currentValue) => {
                        setChosenConnectionId(connection.id).then(() => {
                          setSelectedConnection(connection)
                          setOpen(false)
                        })
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          selectedConnection?.id === connection.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {connection.name}
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
