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
    id: string,
    form_id: string,
    type: FieldType,
    label: string,
    placeholder: string | null,
    required: boolean,
    order_index: number,
    validation_rules: ValidationRules,
    options?: FieldOption[]
}

interface FieldTypeConfig {
    label: string,
    icon: string,
    defaultLabel: string,
    hasOptions: boolean,
    defaultValidation: ValidationRules
}

export const FIELD_TYPE_CONFIG: Record<FieldType, FieldTypeConfig> = {
    'text' : {
        label: 'Short Text',
        icon: 'type',
        defaultLabel: 'New text field',
        hasOptions: false,
        defaultValidation: {}
    },
    'textarea' : {
        label: 'Long Text',
        icon: 'text-align-start',
        defaultLabel: 'New textarea field',
        hasOptions: false,
        defaultValidation: {}
    },
    'email' : {
        label: 'Long Text',
        icon: 'text-align-start',
        defaultLabel: 'New email field',
        hasOptions: false,
        defaultValidation: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }
    },
    'phone' : {
        label: 'Phone Number',
        icon: 'phone-call',
        defaultLabel: 'New phone field',
        hasOptions: false,
        defaultValidation: { pattern: "^\\d{7,15}$" }
    },
    'select' : {
        label: 'Dropdown',
        icon: 'chevron-down',
        defaultLabel: 'New select field',
        hasOptions: true,
        defaultValidation: {}
    },
    'radio' : {
        label: 'Radio Group',
        icon: 'circle-dot',
        defaultLabel: 'New radio field',
        hasOptions: true,
        defaultValidation: {}
    },
    'checkbox' : {
        label: 'Checkbox',
        icon: 'circle-check-big',
        defaultLabel: 'New checkbox field',
        hasOptions: true,
        defaultValidation: {}
    },
    'date' : {
        label: 'Date',
        icon: 'calendar',
        defaultLabel: 'New date field',
        hasOptions: false,
        defaultValidation: {}
    }
}

export const FIELD_TYPES: FieldType[] = [
    'text', 'textarea', 'email', 'phone', 'select', 'radio', 'checkbox', 'date'
]

