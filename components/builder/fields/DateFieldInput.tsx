import { FieldInputProps } from "@/lib/fieldTypes";
import { useRef } from "react";


export default function DateFieldInput({ field, value, onChange } : FieldInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    function openCalendar() {
        try {
            inputRef.current?.showPicker()
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div>
            <input 
            ref={inputRef}
            type="date" 
            className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]" 
            placeholder={field.placeholder ?? undefined} 
            value={value ?? ''}
            onClick={openCalendar}
            onChange={(e) => onChange?.(field.id, e.target.value)}
            ></input>
        </div>
    )
}