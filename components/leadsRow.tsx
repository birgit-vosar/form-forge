import Link from "next/link"

interface LeadRowProps {
    formId: number
    title: string,
    topic: string,
    submitDate: string,
    leadId: number,
    formStatus: boolean
}

export default function LeadsRow({ formId, title, topic, submitDate, leadId, formStatus }: LeadRowProps) {
    const date = new Date(submitDate)
    const formattedDate = date.toLocaleString('et-EE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <div className='flex flex-row border-b border-gray-300 font-sans text-xs'>
            <div className='py-2 pl-2 gap-2 flex-4 flex flex-row border-r border-gray-300'>
                <div className='w-4 h-4 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-300 cursor-pointer'>
                </div>
                <Link href={`/forms/${formId}/responses`} className='underline underline-offset-4 hover:underline-offset-3'>{title}</Link>
            </div>
            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                <p>{topic ? topic : '-'}</p>
            </div>
            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                <p>{formattedDate}</p>
            </div>
            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                <p>{leadId}</p>
            </div>
            <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                {formStatus ? <p className='color-lime-600'>Active</p> : <p>Inactive</p>}
            </div>
            <div className='py-2 pl-2 flex-1 flex border-r border-gray-300'>
                <Link href={`/forms/${formId}/responses`} className='underline underline-offset-4 hover:underline-offset-3'>More</Link>
            </div>
        </div>
    )
}