import { FieldInputProps } from "@/lib/fieldTypes";

export default function DropdownFieldInput({ field }: FieldInputProps) {
    return (
        <div>
            <select className="py-1 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9] text-sm">
                {field.options?.map((option) => {
                    const optionId = `option-${option.id}`
                    return (
                        <option id={optionId} value={option.value ?? ''}>{option.label ?? '-- Please choose an option --'}</option>
                    )
                })}
            </select>
        </div>
    )
}