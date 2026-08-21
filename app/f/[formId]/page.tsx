'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import FormFields from "@/components/builder/FormFields"

export default function FormsPage() {
    const { formId } = useParams()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState([])

    useEffect(() => {
        const fetchForms = async() => {
            try {
                const res = await fetch(`/api/public/forms/${formId}`)
                if (!res.ok) {
                    setError('Something went wrong with fetching the forms.')
                    return
                }

                const data = await res.json()
                setForm(data)
            } catch(err) {
                setError('Something went wrong with fetching the forms.')
            } finally {
                setLoading(false)
            }
        }

        fetchForms()
    }, [])

    return(
       <div className='flex flex-row h-screen overflow-hidden'>
                   {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
                   <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 h-full`}>
                       <div className='flex-1 flex flex-col overflow-hidden'>
                           {/* main */}
                           <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
                               <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                                   <div className='flex-1 flex flex-col overflow-hidden'>
                                       <div className='bg-white px-2 pb-2 border-b-1 pt-2 border-gray-300 flex justify-between items-center'>
                                           <div className='flex flex-row justify-between px-4 py-1'>
                                               <div className='flex flex-col gap-2'>
                                                   <p className='font-mono text-md font-semibold'>{form.title}</p>
                                               </div>
                                           </div>
                                       </div>
                                       <div className='flex-1 flex flex-row justify-between overflow-hidden'>
                                           <div className='flex-1 self-start flex flex-col'>
                                               <div className={error ? 'block flex bg-red-500/20 flex-1 max-h-10 border-b-2 border-red-300 py-2 px-4' : 'hidden'}>
                                                   <p className='text-red-400 font-sans text-sm'>{error}</p>
                                               </div>
                                               <div className='bg-[#B7E0D8] flex-1 flex flex-row mx-6 lg:mx-10 px-4 py-6 my-6 border rounded-xl border-[#8ed0b8] text-sm shadow-lg'>
                                                   <div className='flex-1 flex flex-col gap-4 '>
                                                       <FormFields fields={fields} setFields={setFields} onSelect={handleSelect} onDelete={handleDeleteField} 
                                                       selectedFieldId={selectedFieldId} formId={formId}/>
       
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