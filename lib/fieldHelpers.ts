import { FieldOption } from "./fieldTypes"
import { z } from 'zod'

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_SHAPE_REGEX = /^[+]?[\d\s\-().]{7,20}$/

export function isValidPhone( value: string ): boolean {
  if (!PHONE_SHAPE_REGEX.test(value)) return false
  const digitsOnly = value.replace(/\D/g, "")
  return digitsOnly.length >= 7 && digitsOnly.length <= 15
}

export function isValidEmail( value: string ): boolean {
  return EMAIL_REGEX.test(value)
}

export function getOptionValue(option: FieldOption) {
    return option.value || option.label
}

export const fieldNameDraftSchema = z.object({
    name: z
        .string()
        .max(50, 'Name can be at most 50 characters.')
        .regex(/^[a-z0-9_]*$/, 'Name can only contain lowercase letters, numbers and underscores.')
})