import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export const reorderFieldsSchema = z.object({
    fieldOrder: z.array(
        z.object({
            id: z.number(),
            order_index: z.number(),
        })
    )
})