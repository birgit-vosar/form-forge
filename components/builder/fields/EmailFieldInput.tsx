import { FieldInputProps, isValidEmail } from "@/lib/fieldTypes";
import { useState } from "react";

export default function EmailFieldInput({ field, value }: FieldInputProps) {
    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState<string>('')

    function handleBlur() {
        if (!isValid) {
            setError('')
            return
        }

        if (!isValidEmail(isValid)) {
            setError('Please enter a valid email address')
            return
        }

        setError('')
    }

    return (
        <div>
            <input className="py-2 w-full px-2 border rounded-sm border-[#8ed0b8] bg-[#dbf1e9]" 
            placeholder={field.placeholder ?? undefined}
            onChange={(e) => setIsValid(e.target.value)}
            onBlur={handleBlur}></input>
            <p className='text-[#d70000] font-sans text-sm mt-1'>{error ? (`${error}`) : ''}</p>
        </div>
    )
}