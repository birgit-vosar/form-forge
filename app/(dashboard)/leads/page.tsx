'use client'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'


export default function LeadsPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState('')
    const [resError, setResError] = useState('')

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/forms/leads`)
                const data = await res.json()
                if (res.status === 404) {
                    setResError(data)
                    return
                }
                if (res.status === 500) {
                    setError(data)
                    return
                }

                console.log('this is leads page console: ', data)
            } catch (err) {
                setError('Something went wrong with loading the page.')
            } finally {
                setLoading(false)
            }
        }
        fetchForms()
    }, [])

    return (
        <div className='flex flex-row min-h-screen'>
            <Sidebar />
            {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
            <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 min-h-screen`}>
                <div className='flex-1 flex flex-col min-h-screen'>
                    {/* main */}
                    <div className='flex-1 flex flex-col lg:flex-row min-h-screen'>
                        <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                            <div className='flex-1 flex flex-col min-h-screen'>
                                <div className={error ? 'block flex bg-red-500/20 flex-1 max-h-10 border-b-2 border-red-300 py-2 px-4' : 'hidden'}>
                                    <p className='text-red-600 font-sans text-sm'>{error}</p>
                                </div>
                                <div className='flex-1 flex flex-row justify-between'>
                                    <div className='bg-white gap-2 flex-1 flex flex-col mx-6 lg:mx-10 px-4 py-6 my-6 border rounded-xl border-gray-300 text-sm shadow-lg'>
                                        <div className='py-2 flex'>
                                            <p className='font-mono text-sm font-semibold'>Forms submission leads</p>
                                        </div>
                                        <div className='px-2 py-2 flex bg-stone-50 border rounded-md border-gray-300 w-1/4'>
                                            <p className='font-sans text-sm'>Search bar</p>
                                        </div>
                                        <div className='flex flex-col bg-white border rounded-md border-gray-300 h-full'>
                                            <div className='flex flex-row border-b border-gray-300 bg-stone-100 text-sm font-mono font-semibold'>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Title</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Topic</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Submit date</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Lead id</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Form Status</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-1 flex border-r border-gray-300'>
                                                    <p>Action</p>
                                                </div>
                                            </div>
                                            {loading === true ?
                                                (<div className='flex flex-row border-b border-gray-300 font-sans text-xs'>
                                                    <div className='ml-2 my-2 min-w-4 min-h-4 w-4 h-4 border-4 border-gray-300 border-t-transparent rounded-full animate-spin'></div>
                                                </div>)
                                                :
                                                (
                                                    resError ?
                                                        (<div className='flex flex-row border-b border-gray-300 font-sans text-xs'>
                                                            {resError}
                                                        </div>)
                                                        :
                                                        (<div className='flex flex-row border-b border-gray-300 font-sans text-xs'>
                                                            <div className='py-2 pl-2 gap-2 flex-4 flex flex-row border-r border-gray-300'>
                                                                <div className='w-4 h-4 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-300'>
                                                                </div>
                                                                <p className='underline underline-offset-4'>Solar consultation form</p>
                                                            </div>
                                                            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                                <p>PV</p>
                                                            </div>
                                                            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                                <p>11.02.2026 10:30:01</p>
                                                            </div>
                                                            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                                <p>15</p>
                                                            </div>
                                                            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                                <p>Active</p>
                                                            </div>
                                                            <div className='py-2 pl-2 flex-1 flex border-r border-gray-300'>
                                                                <p className='underline underline-offset-4'>More</p>
                                                            </div>
                                                        </div>)


                                                )
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
    )
}