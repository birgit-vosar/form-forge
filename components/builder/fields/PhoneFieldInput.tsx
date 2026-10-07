import { FieldInputProps, isValidPhone } from "@/lib/fieldTypes";
import { useState } from "react";

export default function PhoneFieldInput({ field, value, onChange }: FieldInputProps) {
    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState<string>('')
    const [newPh, setNewPh] = useState<string>('')

    function handleBlur() {
        if (!isValid) {
            setError('')
            return
        }

        if (!isValidPhone(isValid)) {
            setError('Please enter a valid phone number')
            return
        }

        setError('')
    }

    return (
        <div>
            <input className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]"
                placeholder={newPh === '' ? (field.placeholder ?? undefined): newPh}
                 value={value ?? ''}
                onChange={(e) => {setIsValid(e.target.value), setNewPh(e.target.value), onChange?.(field.id, e.target.value)}}
                onBlur={handleBlur}
            ></input>
            <p className='text-[#d70000] font-sans text-sm mt-1'>{error ? (`${error}`) : ''}</p>
        </div>
    )
}