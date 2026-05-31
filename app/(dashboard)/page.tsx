'use client'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Card from '@/components/Card'
import { useState } from 'react'
import Link from 'next/link';

export default function DashboardPage() {
    const [loading, setLoading] = useState(false)
    const [isLive, setIsLive] = useState(false)
    const [responseAmount, setResponseAmount] = useState<number>(0)
    const [lastResponse, setLastResponse] = useState<number>(0)
    const router = useRouter()
    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
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
                                        <Card title='Contact form' isLive={isLive} responseAmount={responseAmount} lastResponse={lastResponse}>
                                        </Card>
                                        <Card title='Contact form 2' isLive={isLive} responseAmount={responseAmount} lastResponse={lastResponse}>
                                        </Card>
                                        <Card title='Contact form 3' isLive={isLive} responseAmount={responseAmount} lastResponse={lastResponse}>
                                        </Card>
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