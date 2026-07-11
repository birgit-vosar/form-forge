import { Field } from "@/lib/fieldTypes";
import TextFieldInput from "./fields/TextFieldInput";
import TextareaFieldInput from "./fields/TextareaFieldInput";

interface FieldRendererProps {
    field: Field
}

const FIELD_COMPONENT_MAP = {
    text: TextFieldInput,
    textarea: TextareaFieldInput
};

export default function FieldRenderer({ field }: FieldRendererProps) {
    const Component = FIELD_COMPONENT_MAP[field.type]
    return(
        <Component field={field} />
    )
}