
import { Field, FieldUpdateProps, OptionsUpdateProps, FIELD_TYPE_CONFIG } from '@/lib/fieldTypes';
import OptionsListEditor from './OptionsListEditor';
import { useState } from 'react';

interface FieldSettingsPanelProps {
    selectedField: Field | null | undefined,
    onUpdate: (props: FieldUpdateProps) => void,
    addOption: (props: number) => void,
    deleteOption: (optionId: number, fieldId: number) => void
    updateOption: (props: OptionsUpdateProps) => void
}




export default function FieldSettingsPanel({ selectedField, onUpdate, addOption, deleteOption, updateOption }: FieldSettingsPanelProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    if (!selectedField) {
        return (
            <div className='bg-[#eeeeee] flex flex-row pt-1  text-sm h-full'>
                <div className='flex-1 flex flex-col h-full min-w-40 xl:min-w-60'>
                    <div className='mx-4 flex flex-row gap-2 align-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-gray-400 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                        </svg>
                        <p className='uppercase text-black/75 text-md font-semibold font-sans'>Field properties </p><p className='font-sans text-gray-500'>(No field selected)</p>
                    </div>
                </div>
            </div>

            
        )
    }

    const fieldConfig = FIELD_TYPE_CONFIG[selectedField.type]

    return (
        <div className='bg-[#eeeeee] flex flex-row pt-4  text-sm h-full'>
            <div className='flex-1 flex flex-col h-full w-5/6 min-w-40 xl:min-w-60'>
                <div className='mx-4 flex flex-row gap-2 align-center items-center pb-2'>
                    <button type="button" aria-expanded={isOpen} onClick={() => setIsOpen(prev => !prev)}
                        className='flex flex-row gap-2 items-center cursor-pointer text-left'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-gray-400 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                        </svg>

                        <p className='uppercase text-black/75 text-md font-semibold font-sans'>Field properties</p>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                            className={`ml-1 size-4 text-black/75 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <div className={`${isOpen ? '' : 'hidden'} w-5/6`}>
                    <div className='flex flex-row  w-full gap-6 mx-4 my-3'>
                        <div className='flex flex-row gap-2'>
                            <p className='font-sans font-semibold text-black/75 text-sm'>Required:</p>
                            <button
                                type="button"
                                onClick={() => { !selectedField.required; onUpdate({ fieldId: selectedField.id, update: { required: !selectedField.required } }) }}
                                className={`cursor-pointer relative h-5 w-10 rounded-full transition-colors ${selectedField.required === true ? "bg-[#9ed4c9]" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${selectedField.required === true ? "translate-x-5" : ""
                                        }`}
                                />
                            </button>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <p className='font-sans font-semibold text-black/75 text-sm'>Type:</p>
                            <p className='capitalize font-sans text-black/75 text-sm'>{selectedField.type}</p>
                        </div>

                    </div>
                    <div className='flex flex-col w-full gap-2 mx-4 my-3'>
                        <p className='font-sans font-semibold text-black/75 text-sm'>Label</p>
                        <input onChange={(e) => { onUpdate({ fieldId: selectedField.id, update: { label: e.target.value } }) }} className="font-sans text-sm text-gray-600 py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white"
                            placeholder='Enter a label...' value={selectedField.label}></input>
                    </div>
                    <div className='flex flex-col w-full gap-2 mx-4 my-3'>
                        <p className='font-sans font-semibold text-black/75 text-sm'>Name</p>
                        <input onChange={(e) => { onUpdate({ fieldId: selectedField.id, update: { name: e.target.value } }) }} className="font-sans text-sm text-gray-600 py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white"
                            placeholder='Enter a unique name for each field' value={selectedField.name}></input>
                    </div>
                    {fieldConfig.hasPlaceholder && (<div className='flex flex-col w-full gap-2 mx-4 my-3'>
                        <p className='font-sans font-semibold text-black/75 text-sm'>Placeholder text</p>
                        <textarea onChange={(e) => { onUpdate({ fieldId: selectedField.id, update: { placeholder: e.target.value } }) }}
                            className="font-sans text-sm text-gray-600 py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white"
                            placeholder='Enter a placeholder...' value={selectedField.placeholder ?? undefined}></textarea>
                    </div>)
                    }
                    {fieldConfig.hasOptions && (<OptionsListEditor fieldId={selectedField.id} fieldOptions={selectedField.options ?? []} addOption={() => addOption(selectedField.id)}
                        deleteOption={deleteOption} updateOption={updateOption} />)
                    }
                </div>

            </div>
        </div>
    )
}
