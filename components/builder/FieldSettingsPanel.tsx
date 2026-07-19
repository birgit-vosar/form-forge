
import { FIELD_TYPE_CONFIG, FIELD_TYPES, FieldType } from '@/lib/fieldTypes';
import { Field } from '@/lib/fieldTypes';

interface FieldSettingsPanelProps {
    selectedField: Field | null | undefined
}


export default function FieldSettingsPanel({ selectedField }: FieldSettingsPanelProps) {
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
                <p className='text-md font-semibold font-sans px-4 pb-4'>Field properties</p>

                    <div className='flex flex-col w-full gap-2 px-4 py-3'>
                        <p className='uppercase font-sans font-semibold text-black/75 text-xs'>{selectedField.label}</p>
                        <input className="py-1 w-full px-2 border rounded-xs border-stone-300 bg-white" placeholder={selectedField.placeholder ?? undefined}></input>
                    </div>
            </div>
        </div>
    )
}
