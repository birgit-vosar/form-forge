import { FieldInputProps } from "@/lib/fieldTypes";

export default function PhoneFieldInput({ field, value, onChange }: FieldInputProps) {

    return (
        <div>
            <input className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]"
                placeholder={field.placeholder ?? undefined}
                 value={value ?? ''}
                onChange={(e) => {onChange?.(field.id, e.target.value)}}
            ></input>
        </div>
    )
}