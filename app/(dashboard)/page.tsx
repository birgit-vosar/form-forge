'use client'
import Sidebar from '@/components/Sidebar'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import DeleteCard from '@/components/DeleteCard'
import { useRouter } from 'next/navigation'

type Form = {
    id: number,
    title: string,
    is_published: boolean,
    responses_amount: number,
    last_response: string
}

export default function DashboardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [deleteCardOpen, setDeleteCardOpen] = useState(false)
    const [formTitle, setFormTitle] = useState<string>('')
    const [formId, setFormId] = useState<number>(0)
    const [forms, setForms] = useState<Form[]>([])

    useEffect(() => {
        setLoading(true)
        const fetchForms = async () => {
            try {
                const res = await fetch('/api/forms');
                if (!res.ok) {
                    setError('Something went wrong with fetching the forms.')
                    return
                }
                const data = await res.json()
                setForms(data)
            } catch (err) {
                setError('Something went wrong with fetching the forms.')
            } finally {
                setLoading(false)
            }
        }
        fetchForms()
    }, [])

    async function createForm() {
        const res = await fetch('/api/forms', {
            method: 'POST'
        })

        if(!res.ok) {
            setError('Failed to create new form, please try again.')
        }
        const formId = res.json()
        console.log('this is client side res:', res)
        router.push(`/forms/${formId}/builder`)
    }

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
        const result = await fetch(`/api/forms/${formId}`, {
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
        setForms(prev => prev.filter(form => form.id !== formId))
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
                                <div className='bg-white flex-1 px-2 pb-2 border-b-1 pt-2 border-gray-300 flex justify-between items-center'>
                                    <div className='flex flex-row justify-between items-center px-4 py-1'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-mono text-md font-semibold'>Welcome to dashboard!</p>
                                            <p className='text-xs text-gray-600'>8 forms • 0 responses</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={createForm} className='cursor-pointer hover:bg-[#004E89] py-2 px-4 mr-4 border rounded-lg border-[#1A659E] bg-[#1A659E] text-white font-semibold font-sans tracking-wide text-sm'>
                                            + Create new form
                                        </button>
                                    </div>
                                </div>
                                <div className='flex-1 px-6'>
                                    <div className='bg-white flex flex-row justify-between items-center px-4 py-6 mt-2 border rounded-xl border-gray-300 text-sm'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-2 '>
                                                <p className='uppercase font-semibold text-xs'>about formforge</p>
                                            </div>
                                            <div className='w-3/4'>
                                                <p>A dynamic form builder where the <b>database defines the interface</b>. Forms are stored as configuration and rendered at runtime — no hardcoded fields. It demonstrates dynamic CRUD, nested state management, and a reusable field-renderer architecture.</p>
                                            </div>

                                            <div className='flex'>
                                                <div className='flex gap-3'>
                                                    <div className='border border-gray-300 rounded-xl py-1 px-2 text-xs w-fit h-fit text-gray-500 font-mono font-semibold'>
                                                        1
                                                    </div>
                                                    <div className='w-3/4'>
                                                        <p><b>Create</b> a new form or pick a template to scaffold fields automatically.</p>
                                                    </div>

                                                </div>
                                                <div className='flex gap-3'>
                                                    <div className='border border-gray-300 rounded-xl py-1 px-2 text-xs w-fit h-fit text-gray-500 font-mono font-semibold'>
                                                        2
                                                    </div>
                                                    <div className='w-3/4'>
                                                    <p><b>Build</b> in the editor: drag in fields, configure validation, reorder live.</p>
                                                    </div>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <div className='border border-gray-300 rounded-xl py-1 px-2 text-xs w-fit h-fit text-gray-500 font-mono font-semibold'>
                                                        3
                                                    </div>
                                                    <div className='w-3/4'>
                                                    <p><b>Submit & review</b> — every response is stored and browsable in Responses.</p>
                                                    </div>
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
                                        {loading === true ?
                                            (<div className='flex ml-8 mt-8'>
                                                <div className='min-w-8 min-h-8 w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin'></div>
                                            </div>)
                                            :
                                            (
                                                forms.map(form => <Card key={form.id} id={form.id} title={form.title} isLive={form.is_published} responseAmount={form.responses_amount}
                                                    lastResponse={form.last_response} onDelete={() => handleDelete({ id: form.id, title: form.title })} />)

                                            )
                                        }
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