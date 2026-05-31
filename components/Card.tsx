import Link from "next/link"

interface CardProps {
    title: string
    isLive: boolean
    responseAmount: number
    lastResponse: number
}

export default function Card({ title, isLive, responseAmount, lastResponse }: CardProps) {
    return (
        <div className='flex flex-2 flex-col h-full shadow-sm border rounded-xl border-gray-300 bg-white p-6 gap-2 hover:scale-101 hover:shadow-md/5 transition-all duration-200 ease-in-out'>
            <div className="flex justify-between">
                <div className="p-2 border border-gray-300 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
                    {isLive === true ? (<div className="text-sm">
                        Live
                    </div>) : ('')}
            </div>
            <div className="flex flex-col mt-2">
                <p className="text-md font-semibold">{title}</p>
                <p className="text-sm text-gray-600">Quick info about what happens if you click here</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-6">
                <p>{responseAmount} responses</p>
                {lastResponse === 0 ? <p>no responses yet</p> : <p>about {lastResponse} hours ago</p>}
            </div>
            <div className="flex gap-2 mt-2 pt-4 border-t border-gray-300">
                        <Link href='/forms' className="py-2 flex-1 border rounded-md border-gray-300 text-center bg-stone-100 hover:bg-white transition-all duration-200"> Edit</Link>
                        <Link href='/responses' className="py-2 flex-1 text-center hover:underline"> Responses</Link>
            </div>
        </div>
    )
}