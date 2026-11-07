import { useState } from "react"

interface FormSettingsPanelProps {
    onUpdateForm: (topic: string) => void,
    formId: number
    topic: string
}




export default function FormSettingsPanel({ onUpdateForm, formId, topic }: FormSettingsPanelProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    return (
        <div className='bg-[#eeeeee] flex flex-row pb-4 text-sm '>
            <div className='flex-1 flex flex-col h-full w-5/6 min-w-40 xl:min-w-60'>
                <div className='mx-4 flex flex-row gap-2 align-center items-center pb-2'>
                    <button type="button" aria-expanded={isOpen} onClick={() => setIsOpen(prev => !prev)}
                        className=' flex flex-row gap-2 items-center cursor-pointer text-left'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-gray-400 size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    <p className='uppercase text-black/75 text-md font-semibold font-sans'>Form properties</p>
                    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                            className={`ml-auto size-4 text-black/75 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <div className={isOpen ? '' : 'hidden'}>
                    <div className='flex flex-col w-5/6 gap-2 mx-4 my-3'>
                        <p className='uppercase font-sans font-semibold text-black/75 text-sm'>Topic</p>
                        <input onChange={(e) => { onUpdateForm(e.target.value) }} className="py-2 w-full px-2 border rounded-xs border-stone-300 focus:outline-stone-500 bg-white"
                            placeholder='Enter the topic of this form' value={topic}></input>
                    </div>
                    <div className='flex flex-row w-5/6 gap-1 mx-4 my-3'>
                        <p className='uppercase font-sans font-semibold text-black/75 text-sm'>Form id: </p>
                        <p className='font-sans text-black/75 text-sm'>{formId}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
