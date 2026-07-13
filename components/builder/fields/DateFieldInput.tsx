import { FieldInputProps } from "@/lib/fieldTypes";


export default function DateFieldInput({ field } : FieldInputProps) {
    return(
        <div>
            <input type="date" className="py-1 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]" placeholder={field.placeholder ?? undefined}></input>
        </div>
    )
}