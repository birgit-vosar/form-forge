
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Field } from "@/lib/fieldTypes"
import FieldRenderer from "./FieldRenderer"

interface SortableFieldRowProps {
    field: Field,
    selectedFieldId: number | null,
    onDelete: (fieldId: number) => void,
    onSelect: (fieldId: number) => void,
}

export default function SortableFieldRow({ field, selectedFieldId, onSelect, onDelete }: SortableFieldRowProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return ( 
        <div ref={setNodeRef} style={style}
             className={`flex flex-col gap-1 mb-4 py-4 px-2 border-2 rounded-md bg-[#9ed4c9] hover:border-[#6ca692] active:scale-99 active:shadow-sm active:shadow-[#6ca692]/50 
            ${field.id === selectedFieldId ? 'border-[#6ca692]' : 'border-[#84c9b1]'}`} 
            key={field.id} onClick={() => onSelect(field.id)}>
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <span {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing mr-1 text-gray-800/50 hover:text-teal-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-4">
                            <circle cx="8" cy="6" r="1.5" />
                            <circle cx="8" cy="12" r="1.5" />
                            <circle cx="8" cy="18" r="1.5" />
                            <circle cx="16" cy="6" r="1.5" />
                            <circle cx="16" cy="12" r="1.5" />
                            <circle cx="16" cy="18" r="1.5" />
                        </svg>
                    </span>
                    <label className='text-black font-mono text-md font-semibold mb-1'>{field.label}</label>
                    {field.required === true ? (<p className="font-mono text-md font-semibold">*</p>) : ('')}
                </div>
                <button onClick={() => onDelete(field.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4 mb-2 text-gray-800/75 cursor-pointer hover:text-teal-800 hover:scale-115">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg></button>
            </div>
            <FieldRenderer field={field} />
        </div>
    )
}