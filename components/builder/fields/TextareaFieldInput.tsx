import { Field } from "@/lib/fieldTypes";

interface TextareaFieldInputProps {
    field: Field
}

export default function TextareaFieldInput({ field } : TextareaFieldInputProps) {
    return(
        <div>
            <textarea className="py-1 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]">{field.placeholder}</textarea>
        </div>
    )
}