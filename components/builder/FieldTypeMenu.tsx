import {
    Type,
    AlignLeft,
    Mail,
    Phone,
    ChevronDown,
    CircleDot,
    CircleCheckBig,
    Calendar,
} from 'lucide-react';

import { LucideIcon } from 'lucide-react';
import { FIELD_TYPE_CONFIG, FIELD_TYPES, FieldType } from '@/lib/fieldTypes';

const ICON_MAP: Record<string, LucideIcon> = {
    Type,
    AlignLeft,
    Mail,
    Phone,
    ChevronDown,
    CircleDot,
    CircleCheckBig,
    Calendar,
};

interface FieldTypeMenuProps {
    onAddField: (type: FieldType) => void;
}


export default function FieldTypeMenu({ onAddField }: FieldTypeMenuProps) {
    return (
        <div className='bg-[#eeeeee] flex flex-row pt-6 border-r border-gray-300 text-sm h-full'>
            <div className='flex-1 flex flex-col h-full min-w-40 xl:min-w-60'>
                <p className='uppercase text-sm font-semibold font-sans px-4 pb-4 border-b-1 border-stone-300'>field types</p>
                {FIELD_TYPES.map((type) => {
                    const config = FIELD_TYPE_CONFIG[type]
                    const Icon = ICON_MAP[config.icon]

                    return (
                        <button onClick={() => onAddField(type)} key={type} className='cursor-pointer hover:border-y-1 hover:border-stone-200'>
                            <div className='flex gap-2 items-center hover:bg-stone-50/75 border-b-1 border-stone-300  px-4 py-3'>
                                <Icon className='w-5 h-5 ' />
                                <p className='font-sans font-semibold'>{config.label}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
