'use client'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export default function DashboardPage() {
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
                        <div className='bg-stone-100 mt-18'>
                            <div className='flex-1 px-6'>
                                <div className='bg-white px-4 py-6 mt-2 border rounded-xl border-gray-300 text-sm'>
                                    <p className='mb-2 text-lg'>Settings</p>
                                    <a onClick={handleLogout} className='cursor-pointer underline'>
                                        Log out »
                                    </a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}