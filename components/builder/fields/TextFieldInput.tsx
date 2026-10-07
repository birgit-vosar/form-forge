import { FieldInputProps } from "@/lib/fieldTypes";
import { useState } from "react";

export default function TextFieldInput({ field, value, onChange } : FieldInputProps) {
    console.log('this is the value that arrived to TextFieldInput: ', value)
    const [newPh, setNewPh] = useState<string>('')
    return(
        <div>
            <input className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]" 
             placeholder={newPh === '' ? (field.placeholder ?? undefined): newPh} value={value ?? ''} onChange={(e) => {setNewPh(e.target.value), onChange?.(field.id, e.target.value)}}>
            </input>
        </div>
    )
}