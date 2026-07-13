import { FieldInputProps } from "@/lib/fieldTypes";

export default function TextareaFieldInput({ field } : FieldInputProps) {
    return(
        <div>
            <textarea className="py-1 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]">{field.placeholder}</textarea>
        </div>
    )
}