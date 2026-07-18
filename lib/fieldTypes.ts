export type FieldType = | 'text' | 'textarea' | 'email' | 'phone' | 'select' | 'radio' | 'checkbox' |  'date'

export interface ValidationRules {
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number,
    pattern?: string
}

export interface FieldOption {
    id: string,
    field_id: string,
    label: string,
    value: string,
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

export interface FieldInputProps {
  field: Field
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

  'select': {
    label: 'Dropdown',
    icon: 'ChevronDown',
    defaultLabel: 'New select field',
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
    'text', 'textarea', 'email', 'phone', 'select', 'radio', 'checkbox', 'date'
]

