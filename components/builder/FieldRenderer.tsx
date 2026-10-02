import { Field } from "@/lib/fieldTypes";
import TextFieldInput from "./fields/TextFieldInput";
import TextareaFieldInput from "./fields/TextareaFieldInput";
import EmailFieldInput from "./fields/EmailFieldInput";
import PhoneFieldInput from "./fields/PhoneFieldInput";
import DropdownFieldInput from "./fields/DropdownFieldInput";
import RadioFieldInput from "./fields/RadioFieldInput";
import CheckboxFieldInput from "./fields/CheckboxFieldInput";
import DateFieldInput from "./fields/DateFieldInput";

interface FieldRendererProps {
    field: Field,
    value: '' | string | number
}

const FIELD_COMPONENT_MAP = {
    text: TextFieldInput,
    textarea: TextareaFieldInput,
    email: EmailFieldInput,
    phone: PhoneFieldInput,
    dropdown: DropdownFieldInput,
    radio: RadioFieldInput,
    checkbox: CheckboxFieldInput,
    date: DateFieldInput
};

export default function FieldRenderer({ field, value }: FieldRendererProps) {
    const Component = FIELD_COMPONENT_MAP[field.type as keyof typeof FIELD_COMPONENT_MAP];
    console.log('this is the value that arrived to fieldRenderer:', value)

    if (!Component) {
        return (
            <div className="text-sm text-red-500">
                Unsupported field type: {field.type}
            </div>
        ); 
    }

    return <Component field={field} value={value}/>;
}