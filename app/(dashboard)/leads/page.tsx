'use client'
import Sidebar from '@/components/Sidebar'


export default function FormsPage() {
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
                                                    <p>Status</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Recent submission</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Submittion amount</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Topic</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-1 flex border-r border-gray-300'>
                                                    <p>Action</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-row border-b border-gray-300 font-sans text-xs'>
                                                <div className='py-2 pl-2 gap-2 flex-4 flex flex-row border-r border-gray-300'>
                                                    <div className='w-4 h-4 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-300'>
                                                    </div>
                                                    <p>Solar consultation form</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>Published</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>11.02.2026</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>15</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                    <p>PV</p>
                                                </div>
                                                <div className='py-2 pl-2 flex-1 flex border-r border-gray-300'>
                                                    <p>Import</p>
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
        </div>
    )
}