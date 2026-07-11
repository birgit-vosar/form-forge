import { Field } from "@/lib/fieldTypes";

interface TextFieldInputProps {
    field: Field
}

export default function TextFieldInput({ field } : TextFieldInputProps) {
    return(
        <div>
            <input className="py-1 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]" placeholder={field.placeholder ?? undefined}></input>
        </div>
    )
}