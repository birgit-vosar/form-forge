'use client'
import LeadsRow from '@/components/leadsRow'
import Sidebar from '@/components/Sidebar'
import { useParams } from 'next/navigation'
import { ResponseLeadsData } from '@/lib/leadsTypes'
import { useEffect, useState } from 'react'
import { Field } from '@/lib/fieldTypes'

type Form = {
    title: string
}


export default function ResponsesPage() {
    const { formId } = useParams<{ formId: string }>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')
    const [resError, setResError] = useState('')
    const [form, setForm] = useState<Form | null>(null)
    const [fields, setFields] = useState<Field[]>([])
    const [leads, setLeads] = useState<ResponseLeadsData[]>()


    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await fetch(`/api/forms/${formId}`)
                if (!res.ok) {
                    setError('Something went wrong with fetching the form.')
                    return
                }
                const data = await res.json()
                setForm(data)

                const resFields = await fetch(`/api/forms/${formId}/fields`)
                const fieldsData = await resFields.json()
                setFields(fieldsData)

                const leadsRes = await fetch(`/api/forms/${formId}/responses`)
                const leadsData: ResponseLeadsData[] = await leadsRes.json()
                setLeads(leadsData)
            } catch (err) {
                setError('Something went wrong with loading the page.')
            } finally {
                setLoading(false)
            }
        }
        fetchForms()
    }, [])

    useEffect(() => {
        console.log('this is form in response p.: ', form)
    }, [form])
    useEffect(() => {
        console.log('this is fields in response p.: ', fields)
    }, [fields])
    useEffect(() => {
        console.log('this is leads in response p.: ', leads)
    }, [leads])

    return (
        <div className='flex flex-row min-h-screen'>
            <Sidebar />
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
                                        <div className='py-2 flex flex-col'>
                                            <p className='font-sans text-xs'>Form name:</p>
                                            <p className='font-mono text-lg font-semibold'>{form?.title}</p>
                                        </div>
                                        <div className='flex flex-col bg-white border rounded-md border-gray-300 h-full'>
                                            <div className='flex flex-row border-b border-gray-300 bg-stone-100 text-sm font-mono font-semibold'>
                                                <div className={`${loading ? 'hidden' : ''} capitalize py-2 pl-2 flex-1 flex border-r border-gray-300`}>
                                                    ID
                                                </div>
                                                {fields.map((field) => (
                                                    <div key={field.id} className='capitalize py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                        {field.name}
                                                    </div>
                                                ))}
                                                <div className={`${loading ? 'hidden' : ''} capitalize py-2 pl-2 flex-4 flex border-r border-gray-300`}>
                                                    Date
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
                                                        (

                                                            leads?.map((response) => (
                                                                <div key={response.id} className='flex flex-row border-b border-gray-300 font-sans text-xs'>
                                                                    <div className='py-2 pl-2 flex-1 flex border-r border-gray-300'>
                                                                        {response.id}
                                                                    </div>
                                                                    {response.answers.map((answer) => (
                                                                        <div key={answer.answer_id} className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                                            {answer.value}
                                                                        </div>
                                                                    ))}
                                                                    <div className='py-2 pl-2 flex-4 flex border-r border-gray-300'>
                                                                        {new Date(response.submitted_at).toLocaleString('et-EE')}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )


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