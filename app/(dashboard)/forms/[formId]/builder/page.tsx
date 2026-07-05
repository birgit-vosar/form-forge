'use client'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'

type Form = {
    title: string
}

export default function DashboardPage() {
    const { formId } = useParams()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string>('')
    const [form, setForm] = useState<Form | null>(null)

    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)
    const isMounted = useRef(false)
    const [title, setTitle] = useState('')

    useEffect(() => {
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


    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }

        if (debounceRef.current) { clearTimeout(debounceRef.current) }
        debounceRef.current = setTimeout(async () => {
            try {
                setSaving(true)
                setError('')
                const res = await fetch(`/api/forms/${formId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title })
                })

                if (!res.ok) {
                    if (res.status === 400) {
                        setError('Title format is incorrect.')
                        console.log('error:', 400)
                    } else {
                        setError('Something went wrong saving the form — please try again.')
                        console.log('error:', 500)
                    }
                }
                
            } catch (err) {
                setError('Something went wrong with saving the form.')
            } finally {
                setSaving(false)
            }
        }, 800)
    }, [title])

    if (loading) return (<div className='flex flex-row h-screen overflow-hidden'>
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
                                        <p className='font-mono text-md font-semibold'>Loading...</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
    if (!form) return (<div className='flex flex-row h-screen overflow-hidden'>
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
                                        <p className='font-mono text-md font-semibold'>Form not found</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

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
                                            <p className='font-mono text-md font-semibold'>{title ? title : form.title}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center mr-4'>
                                        <button className='cursor-pointer hover:bg-gray-100 py-2 px-4 mr-4 border rounded-lg border-gray-300 font-semibold font-sans tracking-wide text-sm'>
                                            Responses
                                        </button>
                                        {saving === true ? <p className='animate-pulse cursor-default font-sans text-sm text-gray-400'>Saving...</p> : (<div className='flex items-center gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-400 size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                            </svg>
                                            <p className='cursor-default font-sans text-sm text-gray-400'>Auto-saved</p>
                                        </div>)}

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
                                    <div className='flex-1 self-start flex flex-col'>
                                        <div className={error ? 'block flex bg-red-500/20 flex-1 max-h-10 border-b-2 border-red-300 py-2 px-4' : 'hidden'}>
                                            <p className='text-red-400 font-sans text-sm'>{error}</p>
                                        </div>
                                        <div className='bg-white flex-1 flex flex-row mx-6 px-4 py-6 my-6 border rounded-xl border-gray-300 text-sm'>
                                            <div className='flex-1 flex flex-col gap-4'>
                                                <textarea rows={1} className='text-black font-mono text-lg font-semibold placeholder:font-mono placeholder:text-md
                                            placeholder:font-semibold placeholder:text-black focus:outline-none resize-none break-words whitespace-pre-wrap w-full' placeholder={title ? title : form.title} 
                                            defaultValue={form.title} maxLength={50}
                                                    onChange={(e) => { e.target.value === '' ? setTitle(`${form.title}`) : setTitle(e.target.value) }}>
                                                </textarea>
                                                <div className='flex flex-col gap-1'>
                                                <label className='text-slate-800 font-mono text-md font-semibold'>This is a label</label>
                                                <textarea className='p-2 rounded outline outline-border-md outline-slate-800/20' placeholder='Add a description...'>
                                                </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-white flex-1 flex flex-row justify-between pt-6 px-4 border-l border-gray-300 text-sm 2xl:min-w-40 max-w-100'>
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