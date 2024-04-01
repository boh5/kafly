"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "nanoid"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { KafkaConnection } from "@/types/kafka"
import {
  getKafkaConnection,
  setKafkaConnection,
  updateKafkaConnection,
} from "@/lib/tauri-store/kafka-connection"
import { connectionUpdateSchema } from "@/lib/validations/connection"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface connectionManagementDialogProps extends ButtonProps {
  connection?: KafkaConnection
  setKafkaConnections: () => void
}

export function ConnectionManagementDialog({
  className,
  variant,
  connection,
  setKafkaConnections,
  ...props
}: connectionManagementDialogProps) {
  const isUpdate = !!connection

  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<z.infer<typeof connectionUpdateSchema>>({
    resolver: zodResolver(connectionUpdateSchema),
    defaultValues: connection,
  })

  const { fields, append } = useFieldArray({
    name: "servers",
    control: form.control,
  })

  function onSubmit(values: z.infer<typeof connectionUpdateSchema>) {
    console.log(values)
    setIsSaving(true)

    if (isUpdate) {
      updateKafkaConnection(connection.id, values).then(() => {
        setIsSaving(false)
        setOpen(false)
        setKafkaConnections()
      })
    } else {
      setKafkaConnection({
        id: nanoid(),
        ...values,
      }).then(() => {
        setIsSaving(false)
        setOpen(false)
        setKafkaConnections()
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={className} variant={variant} {...props}>
          {" "}
          {isUpdate ? "Edit" : "Create"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Update connection" : "Create connection"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update your connection details."
              : "Create a new connection."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-5rem)] py-6 pr-6 lg:py-8">
          <Form {...form}>
            <form
              className="flex flex-col space-y-4 p-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="connection name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Name of the connection. Unique.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel className="block">Servers</FormLabel>
                {fields.map((field, index) => (
                  <>
                    {index > 0 && <Separator />}
                    <div key={`${field.id}-host`} className="space-y-2 pl-4">
                      <FormField
                        control={form.control}
                        name={`servers.${index}.host`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex w-full flex-row items-center space-x-2">
                              <FormLabel>Host</FormLabel>
                              <FormControl>
                                <Input placeholder="localhost" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        key={`${field.id}-port`}
                        name={`servers.${index}.port`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex w-full flex-row items-center space-x-2">
                              <FormLabel>Port</FormLabel>
                              <FormControl>
                                <Input placeholder="9092" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ))}
                <Button
                  type="button"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ host: "localhost", port: 9092 })}
                >
                  Add Server
                </Button>
              </div>
              <FormField
                control={form.control}
                name="readonly"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Read only</FormLabel>
                      <FormDescription>
                        Enable read-only mode for this connection.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {isSaving && (
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                  )}
                  {isUpdate ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
