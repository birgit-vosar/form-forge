import { FieldInputProps } from "@/lib/fieldTypes";

export default function TextareaFieldInput({ field, value } : FieldInputProps) {
    return(
        <div>
            <textarea className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]" 
            placeholder={field.placeholder ?? undefined}
            value={(e) => {e.target.value}}></textarea>
        </div>
    )
}