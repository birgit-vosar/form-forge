'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import FormFields from "@/components/builder/FormFields"
import { Field } from "@/lib/fieldTypes"
import FieldRenderer from "@/components/builder/FieldRenderer"

interface FormData {
    id: number
    title: string
    description: string | null
    fields: Field[]
}

export default function FormsPage() {
    const { formId } = useParams()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState<FormData | null>(null)

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await fetch(`/api/public/forms/${formId}`)
                if (!res.ok) {
                    setError('Something went wrong with fetching the forms.')
                    return
                }

                const data = await res.json()
                console.log(data)
                setForm(data)
            } catch (err) {
                setError('Something went wrong with fetching the forms.')
            } finally {
                setLoading(false)
            }
        }

        fetchForms()
    }, [])



    return (
        <div className='flex flex-row h-screen overflow-hidden'>
            {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
            <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 h-full`}>
                <div className='flex-1 flex flex-col overflow-hidden'>
                    {/* main */}
                    <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
                        <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                            <div className='flex-1 flex flex-col overflow-hidden'>
                                <div className='bg-white px-2 pb-2 border-b-1 pt-2 border-gray-300 flex justify-between items-center'>
                                    <div className='flex flex-row justify-between px-4 py-1'>
                                        <div className='flex flex-row gap-3 items-center'>
                                            <p className='font-mono text-md font-semibold'>{form?.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-1 flex flex-row justify-between overflow-hidden'>
                                    <div className='flex-1 self-start flex flex-col'>
                                        <div className={error ? 'block flex bg-red-500/20 flex-1 max-h-10 border-b-2 border-red-300 py-2 px-4' : 'hidden'}>
                                            <p className='text-red-400 font-sans text-sm'>{error}</p>
                                        </div>
                                        <div className='bg-[#B7E0D8] flex-1 flex flex-row mx-6 md:mx-40 lg:mx-70 xl:mx-100 2xl:mx-120 px-4 py-6 my-6 border rounded-xl border-[#8ed0b8] text-sm shadow-lg'>

                                            <div className='flex-1 flex flex-col gap-4 '>
                                                <div className='px-2 mb-2 pt-2 flex justify-between items-center'>
                                                    <div className='pb-6 flex flex-row justify-between py-1 border-b-2  border-[#6ca692] w-full'>
                                                            <p className='font-mono text-xl font-semibold'>{form?.title}</p>
                                                    </div>
                                                </div>
                                                {
                                                    form?.fields.map((field) => (
                                                        <div className={`flex flex-col gap-1 px-2 active:scale-99 active:shadow-sm active:shadow-[#6ca692]/50 `}
                                                            key={field.id}>
                                                            <div className="flex justify-between">
                                                                <div className="flex gap-1 items-center">
                                                                    <label className='text-black font-mono text-md font-semibold mb-1'>{field.label}</label>
                                                                    {field.required === true ? (<p className="font-mono text-md font-semibold">*</p>) : ('')}
                                                                </div>
                                                            </div>
                                                            <FieldRenderer field={field} />
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}