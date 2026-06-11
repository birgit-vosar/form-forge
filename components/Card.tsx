import Link from "next/link"

interface CardProps {
    id: number
    title: string
    isLive: boolean
    responseAmount: number
    lastResponse: string
    onDelete: () => void
}

export default function Card({ id, title, isLive, responseAmount, lastResponse, onDelete }: CardProps) {

    function timeAgo(timestamp: string) {
        const diff = Date.now() - new Date(timestamp).getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(hours / 24)

        if (days > 0) return `${days} days ago`
        if (hours > 0) return `${hours} hours ago`
        return 'Just now'
    }

    return (
        <div className='flex flex-2 flex-col h-full shadow-sm border rounded-xl border-gray-300 bg-white p-6 gap-2 hover:scale-101 hover:shadow-md/5 transition-all duration-200 ease-in-out'>
            <div className="flex justify-between">
                <div className="p-2 border border-gray-300 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-teal-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
                {isLive === true ? (<div className="text-sm">
                    Live
                </div>) : ('')}
                <button onClick={() => onDelete()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-600 cursor-pointer hover:text-teal-700 hover:scale-115">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg></button>

            </div>
            <div className="flex flex-col mt-2">
                <p className="text-md font-semibold">{title}</p>
                <p className="text-sm text-gray-600">Quick info about what happens if you click here</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-6">
                <div className="flex gap-1"><p>responses</p> <Link href='/responses' className="underline">View</Link></div>
                <p>{lastResponse ? timeAgo(lastResponse) : 'No responses yet'}</p>
            </div>
            <div className="flex gap-2 mt-2 pt-4 border-t border-gray-300">
                <Link href='/forms' className="py-2 flex-1 border rounded-md border-[#b7e0d8] text-center bg-teal-50 hover:bg-emerald-100 transition-all duration-200"> Edit</Link>
                <Link href='/responses' className="py-2 flex-1 text-center hover:underline">Duplicate</Link>
            </div>
        </div>
    )
}