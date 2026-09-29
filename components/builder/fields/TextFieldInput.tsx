import { FieldInputProps } from "@/lib/fieldTypes";

export default function TextFieldInput({ field } : FieldInputProps) {
    return(
        <div>
            <input className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]" placeholder={field.placeholder ?? undefined}></input>
        </div>
    )
}