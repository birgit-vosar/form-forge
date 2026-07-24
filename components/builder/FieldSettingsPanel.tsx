
import { Field, FieldUpdateProps } from '@/lib/fieldTypes';
import { useState } from 'react';

interface FieldSettingsPanelProps {
    selectedField: Field | null | undefined,
    onUpdate: (props: FieldUpdateProps) => void
}




export default function FieldSettingsPanel({ selectedField, onUpdate }: FieldSettingsPanelProps) {
    const [required, setRequired] = useState(false);
    if (!selectedField) {
        return (
            <div className='bg-[#eeeeee] flex flex-row pt-6  text-sm h-full'>
                <div className='flex-1 flex flex-col h-full min-w-40 xl:min-w-60'>
                    <p className='text-md font-semibold font-sans px-4 pb-4'>Field properties</p>
                    <p className='font-sans text-gray-500 px-4 py-3'>No field selected</p>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#eeeeee] flex flex-row pt-6  text-sm h-full'>
            <div className='flex-1 flex flex-col h-full w-full min-w-40 xl:min-w-60'>
                <p className='uppercase text-md font-semibold font-sans px-4 pb-4'>Field properties</p>
                <div className='flex flex-col w-full gap-2 mx-4 my-3'>
                    <p className='uppercase font-sans font-semibold text-black/75 text-xs'>Type</p>
                    <input readOnly className="pointer-events-none py-1 w-full px-2 border rounded-xs border-stone-400 bg-[#eeeeee]" placeholder={selectedField.type}></input>
                </div>
                <div className='flex flex-col w-full gap-2 mx-4 my-3'>
                    <p className='uppercase font-sans font-semibold text-black/75 text-xs'>Label</p>
                    <input onChange={(e) => {onUpdate({fieldId: selectedField.id, update: e.target.value})}} className="py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white" placeholder={selectedField.label}></input>
                </div>
                <div className='flex flex-col w-full gap-2 mx-4 my-3'>
                    <p className='uppercase font-sans font-semibold text-black/75 text-xs'>Placeholder text</p>
                    <textarea className="py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white" placeholder={selectedField.placeholder ?? undefined}></textarea>
                </div>
                <div className='flex justify-between items-center w-full gap-2 mx-4 my-3 px-2 py-3 border rounded-xs border-stone-300 bg-white'>
                    <p className='uppercase font-sans font-semibold text-black/75 text-xs'>Required:</p>
                    <button
                        type="button"
                        onClick={() => setRequired(!required)}
                        className={`relative h-5 w-10 rounded-full transition-colors ${required ? "bg-[#9ed4c9]" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${required ? "translate-x-5" : ""
                                }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
