
import { z } from 'zod'

export interface Form {
    id: number,
    user_id: number,
    title: string,
    topic: string,
    description: string,
    footer_note: string,
    is_published: boolean,
}

export const publishSchema = z.object({ published: z.boolean() })

export const titleSchema = z.object({ title: z.string().min(1).max(50) })
export const descriptionSchema = z.object({ description: z.string().min(0).max(1000) })
export const footerNoteSchema = z.object({ footerNote: z.string().min(0).max(1000) })
export const topicSchema = z.object({ topic: z.string().min(1).max(100) })