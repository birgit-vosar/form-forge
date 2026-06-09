'use client'
import Sidebar from '@/components/Sidebar'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import DeleteCard from '@/components/DeleteCard'

type Form = {
    id: number,
    title: string,
    is_published: boolean,
    responses_amount: number,
    last_response: number
}

export default function DashboardPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [deleteCardOpen, setDeleteCardOpen] = useState(false)
    const [formTitle, setFormTitle] = useState<string>('')
    const [formId, setFormId] = useState<number>(0)
    const [forms, setForms] = useState<Form[]>([])

    useEffect(() => {
        const fetchForms = async () => {
            const res = await fetch('/api/forms');
            if(!res.ok) {
                setError('Something went wrong with fetching the forms.')
                return
            }
            const data = await res.json()
            setForms(data)
        }

        fetchForms();
    }, [])

    const handleDelete = ({ id, title }: { id: number, title: string }) => {
        setDeleteCardOpen(true)
        setFormTitle(title)
        setFormId(id)
        return
    }

    async function handleDeleteConfirm() {
        setLoading(true)
        setError('')
        console.log('Sending info to database, that form with this id:', formId, 'has to be deleted')
        const result = await fetch('/api/forms/${formId}', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formId)
        })
        if (!result.ok) {
            setError('Something went wrong with deleting the form, please try again.')
            setLoading(false)
            return
        }
        setFormTitle('')
        setFormId(0)
        setDeleteCardOpen(false)
        setLoading(false)
        return
    }

    const handleDeleteCancel = () => {
        setDeleteCardOpen(false)
        setFormTitle('')
        setFormId(0)
        setError('')
        return
    }

    return (
        <div className='flex flex-row min-h-screen'>
            <Sidebar />
            {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
            <div className={`flex-1 bg-stone-100 text-zinc-800 min-h-screen`}>
                <div className='flex flex-col min-h-screen'>
                    {/* main */}
                    <div className='grow flex flex-col lg:flex-row'>
                        <div className='flex-[4] bg-stone-100'>
                            <div className='flex flex-col gap-6'>
                                <div className='flex-1 px-2 pb-2 border-b-1 pt-2 border-gray-300'>
                                    <div className='flex flex-row justify-between items-center px-4 py-1'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-mono text-md font-semibold'>Welcome to dashboard!</p>
                                            <p className='text-xs text-gray-600'>8 forms • 0 responses</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-1 px-6'>
                                    <div className='bg-white flex flex-row justify-between items-center px-4 py-6 mt-2 border rounded-xl border-gray-300 text-sm'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-2 '>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-teal-900">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                                </svg>
                                                <p className='uppercase font-semibold text-xs text-teal-900'>about formforge</p>
                                            </div>
                                            <p>A dynamic form builder where the database defines the interface. Forms are stored as configuration and rendered at runtime — no hardcoded fields. It demonstrates dynamic CRUD, nested state management, and a reusable field-renderer architecture.</p>
                                            <div className='flex gap-2'>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='border border-[#b7e0d8] rounded-xl bg-teal-50 py-1 px-2 text-xs w-fit'>
                                                        1
                                                    </div>
                                                    <p><b>Create</b> a new form or pick a template to scaffold fields automatically.</p>
                                                </div>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='border border-[#b7e0d8] rounded-xl bg-teal-50 py-1 px-2 text-xs w-fit'>
                                                        2
                                                    </div>
                                                    <p><b>Build</b> in the editor: drag in fields, configure validation, reorder live.</p>
                                                </div>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='border border-[#b7e0d8] rounded-xl bg-teal-50 py-1 px-2 text-xs w-fit'>
                                                        3
                                                    </div>
                                                    <p><b>Submit & review</b> — every response is stored and browsable in Responses.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-4 px-6'>
                                    <input className="text-sm text-gray-600 bg-white space-y-2 px-6 py-3 border rounded-xl border-gray-300 focus:border-gray-200" placeholder='Search forms...' />
                                </div>

                                <div className='flex-3 px-6'>
                                    <div className='grid lg:grid-cols-3 grid-col-reverse gap-4'>
                                        {forms.map(form => <Card key={form.id} id={form.id} title={form.title} isLive={form.is_published} responseAmount={form.responses_amount}
                                            lastResponse={form.last_response} onDelete={() => handleDelete({ id: form.id, title: form.title })} />)}

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteCard error={error} formTitle={formTitle} cardOpen={deleteCardOpen} onCancel={() => handleDeleteCancel()} onConfirm={() => { handleDeleteConfirm() }} />
        </div>
    )
}