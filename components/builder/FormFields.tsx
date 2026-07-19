import { Field } from "@/lib/fieldTypes"
import FieldRenderer from "./FieldRenderer"

interface FormFieldsType {
    fields: Field[],
    selectedFieldId: number | null,
    onDelete: (fieldId: number) => void,
    onSelect: (fieldId: number) => void,
}

export default function FormFields({ fields, selectedFieldId, onDelete, onSelect }: FormFieldsType) {

    if (fields.length === 0) {
        return (
            <div className='border-2 px-2 py-6 mt-2 rounded border-[#84c9b1] border-dashed'>
                <label className='text-[#1d7e5b] font-mono text-xs'>Click a field type on the left to get started.</label>
            </div>
        )
    }
    return (
        <div>
            {
                fields.map((field) => (
                    <div className={`flex flex-col gap-1 mb-4 py-4 px-2 border-2 rounded-md bg-[#9ed4c9] hover:border-[#6ca692] active:scale-99 active:shadow-sm active:shadow-[#6ca692]/50 ${field.id === selectedFieldId ? 'border-[#6ca692]' : 'border-[#84c9b1]'}`} key={field.id} onClick={() => onSelect(field.id)}>
                        <div className="flex justify-between">
                            <label className='text-black font-mono text-md font-semibold mb-1'>{field.label}</label>
                            <button onClick={() => onDelete(field.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4 mb-2 text-gray-800/75 cursor-pointer hover:text-teal-800 hover:scale-115">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg></button>
                        </div>
                        <FieldRenderer field={field} />
                    </div>
                ))
            }
        </div>

    )
}