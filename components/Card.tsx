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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
                <div className="flex flex-row gap-4 align-center">
                    {isLive === true ? (<div className="text-sm font-mono font-semibold border rounded-xl bg-[#B7E0D8] border-[#87cbbe] py-1 px-2 h-fit">
                        Live
                    </div>) : ('')}
                    <button onClick={() => onDelete()} className="flex justify-start self-start mt-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className=" size-5 text-gray-600 cursor-pointer hover:text-teal-700 hover:scale-115">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg></button>
                </div>

            </div>
            <div className="flex flex-col mt-4">
                <p className="text-md font-semibold">{title}</p>
                <p className="text-sm text-gray-600">Quick info about what happens if you click here</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <div className="flex gap-1">{responseAmount ? responseAmount : ''}
                    <p>Responses</p> 
                    {lastResponse ? (<Link href={`/forms/${id}/responses`} className="underline underline-offset-3 hover:underline-offset-4 text-gray-500 hover:text-gray-900 transition-colors">view</Link>) : ''}
                </div>
                <p>{lastResponse ? timeAgo(lastResponse) : ''}</p>
            </div>
            <div className="flex gap-5 mt-2 pt-4 border-t border-gray-300">
                <Link href={`/forms/${id}/builder`} className="basis-64 font-sans font-semibold text-[#E4572E] py-2 flex-1 border-2 rounded-md border-[#E4572E] 
                text-center bg-orange-100 hover:bg-orange-200 transition-all duration-200 max-w-40"> Edit</Link>
                <div className="flex flex-row gap-3 items-center">
                    <Link
                        href={`/forms/${id}/preview`}
                        target="_blank"
                        className="group inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="group-hover:underline underline-offset-4">Preview</span>
                    </Link>
                    {isLive && (
                        <>
                            <span className="size-1 rounded-full bg-gray-300" aria-hidden />
                            <Link
                                href={`/f/${id}`}
                                target="_blank"
                                className="group inline-flex items-center gap-1 font-medium text-gray-500 hover:text-[#E4572E] transition-colors"
                            >
                                <span className="group-hover:underline underline-offset-4">Live link</span>
                                <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}