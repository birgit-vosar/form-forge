import { FieldInputProps } from "@/lib/fieldTypes";

export default function DropdownFieldInput({ field, onChange, value }: FieldInputProps) {
    return (
        <div>
            <select 
            value={value} 
            className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9] text-sm"
            onChange={(e) => onChange?.(field.id, e.target.value)}>
                <option value="" disabled>-- Please choose an option --</option>
                {field.options?.map((option) => {
                    const optionId = `option-${option.id}`
                    return (
                        <option id={optionId} key={optionId} value={option.label}>{option.label}</option>
                    )
                })}
            </select>
        </div>
    )
}