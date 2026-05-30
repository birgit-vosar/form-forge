'use client'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
    const router = useRouter()
    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
    }

    return (
        <div>
            <div><p>This is dashboard page</p></div>
            <div>
                <a onClick={handleLogout} className="border border-white px-2 py-1">
                    Log out
                </a>
            </div>
        </div>
    )
}