import { Field } from "@/lib/fieldTypes"
import FieldRenderer from "./FieldRenderer"

interface FormFieldsType {
    fields: Field[]
}

export default function FormFields({ fields } : FormFieldsType) {

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
                <div className='flex flex-col gap-1 mb-4 py-4 px-2 border-2 rounded-md border-[#84c9b1] bg-[#9ed4c9]' key={field.id}>
                    <label className='text-black font-mono text-md font-semibold mb-1'>{field.label}</label>
                    <FieldRenderer field={field}/>
                </div>
            ))
        }
        </div>

    )
}