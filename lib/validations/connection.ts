import { z } from "zod"

export const connectionUpdateSchema = z.object({
  name: z.string().min(1),
  servers: z
    .array(
      z.object({
        host: z.string().min(1),
        port: z.number().min(1).max(65536),
      })
    )
    .min(1),
  readonly: z.boolean().default(false),
})
