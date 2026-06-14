'use client'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Form = {
    title:string
}

export default function DashboardPage() {
    const { formId } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [form, setForm] = useState<Form | null>({})

    useEffect(() => {
        setLoading(true)
        const fetchForms = async () => {
            try {
                const res = await fetch(`/api/forms/${formId}`);
                if (!res.ok) {
                    setError('Something went wrong with fetching the forms.')
                    return
                }
                const data = await res.json()
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
            <Sidebar />
            {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
            <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 h-full`}>
                <div className='flex-1 flex flex-col overflow-hidden'>
                    {/* main */}
                    <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
                        <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                            <div className='flex-1 flex flex-col overflow-hidden'>
                                <div className='bg-white px-2 pb-2 border-b-1 pt-2 border-gray-300 flex justify-between items-center'>
                                    <div className='flex flex-row justify-between px-4 py-1'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-mono text-md font-semibold'>{form.title}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='cursor-pointer hover:bg-[#004E89] py-2 px-4 mr-4 border rounded-lg border-[#1A659E] bg-[#1A659E] text-white font-semibold font-sans tracking-wide text-sm'>
                                            + Create new form
                                        </button>
                                    </div>
                                </div>
                                <div className='flex-1 flex flex-row justify-between overflow-hidden'>
                                    <div className='bg-white flex flex-row pt-6 px-4 border-r border-gray-300 text-sm h-full'>
                                        <div className='flex-1 flex flex-col gap-4 h-full min-w-40'>
                                            <div className='flex-1 flex gap-2'>
                                                <p className='uppercase text-xs font-sans'>field types</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white flex-1 self-start flex flex-row mx-6 px-4 py-6 my-6 border rounded-xl border-gray-300 text-sm'>
                                        <div className='flex-1 flex flex-col gap-4'>
                                            <div className='flex gap-2 '>
                                                <p className='font-semibold font-sans'>{form.title}</p>
                                            </div>
                                            <textarea placeholder='Add a description...'>
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className='bg-white flex-1 flex flex-row justify-between pt-6 px-4 border-l border-gray-300 text-sm min-w-40'>
                                            <div className='flex gap-2 '>
                                                <p className='font-semibold font-sans'>No field selected</p>
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