'use client'

export default function DashboardPage() {
    return (
        <div>
            <div><p>This is dashboard page</p></div>
            <div>
                <a href="/logout" className="border border-white px-2 py-1">
                    Log out
                </a>
            </div>
        </div>
    )
}