import { FieldInputProps, isValidPhone } from "@/lib/fieldTypes";
import { useState } from "react";

export default function PhoneFieldInput({ field, value }: FieldInputProps) {
    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState<string>('')

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
                placeholder={field.placeholder ?? undefined}
                value={value}
                onChange={(e) => setIsValid(e.target.value)}
                onBlur={handleBlur}
            ></input>
            <p className='text-[#d70000] font-sans text-sm mt-1'>{error ? (`${error}`) : ''}</p>
        </div>
    )
}