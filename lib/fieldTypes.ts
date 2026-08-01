export type FieldType = | 'text' | 'textarea' | 'email' | 'phone' | 'dropdown' | 'radio' | 'checkbox' |  'date'

export interface ValidationRules {
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number,
    pattern?: string
}

export interface FieldOption {
    id: number,
    field_id: number,
    label: string,
    value: string | null,
    order_index: number
}

export interface Field {
    id: number,
    form_id: number,
    type: FieldType,
    label: string,
    placeholder: string | null,
    required: boolean,
    order_index: number,
    validation_rules: ValidationRules | null,
    options?: FieldOption[]
}

export interface NewField {
    type: FieldType,
    label: string,
    placeholder: string | null,
    required: boolean,
    order_index: number,
    validation_rules: ValidationRules | null,
    options?: FieldOption[]
}

export interface FieldInputProps {
  field: Field
}

export interface FieldUpdateProps {
  fieldId: number,
  update: Partial<Pick<Field, 'label' | 'placeholder' | 'required'>>
}

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

interface FieldTypeConfig {
    label: string,
    icon: string,
    defaultLabel: string,
    hasOptions: boolean,
    defaultValidation: ValidationRules
}

export const FIELD_TYPE_CONFIG: Record<FieldType, FieldTypeConfig> = {
  'text': {
    label: 'Short Text',
    icon: 'Type',
    defaultLabel: 'New text field',
    hasOptions: false,
    defaultValidation: {},
  },

  'textarea': {
    label: 'Long Text',
    icon: 'AlignLeft',
    defaultLabel: 'New textarea field',
    hasOptions: false,
    defaultValidation: {},
  },

  'email': {
    label: 'Email',
    icon: 'Mail',
    defaultLabel: 'New email field',
    hasOptions: false,
    defaultValidation: {
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
  },

  'phone': {
    label: 'Phone Number',
    icon: 'Phone',
    defaultLabel: 'New phone field',
    hasOptions: false,
    defaultValidation: {
      pattern: '^\\d{7,15}$',
    },
  },

  'dropdown': {
    label: 'Dropdown',
    icon: 'ChevronDown',
    defaultLabel: 'New dropdown field',
    hasOptions: true,
    defaultValidation: {},
  },

  'radio': {
    label: 'Radio Group',
    icon: 'CircleDot',
    defaultLabel: 'New radio field',
    hasOptions: true,
    defaultValidation: {},
  },

  'checkbox': {
    label: 'Checkbox',
    icon: 'CircleCheckBig',
    defaultLabel: 'New checkbox field',
    hasOptions: true,
    defaultValidation: {},
  },

  'date': {
    label: 'Date',
    icon: 'Calendar',
    defaultLabel: 'New date field',
    hasOptions: false,
    defaultValidation: {},
  },
};

export const FIELD_TYPES: FieldType[] = [
    'text', 'textarea', 'email', 'phone', 'dropdown', 'radio', 'checkbox', 'date'
]

