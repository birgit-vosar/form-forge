'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Field } from "@/lib/fieldTypes"
import FieldRenderer from "@/components/builder/FieldRenderer"
import { getOptionValue } from "@/lib/fieldHelpers"
import { isValidEmail, isValidPhone } from "@/lib/fieldHelpers"

interface SubmitFormInfo {
    id: number
    title: string
    description: string | null
    fields: Field[]
}

export default function FormsPage() {
    const { formId } = useParams()
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState<Record<number, string>>({})
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState<SubmitFormInfo | null>(null)
    const [fieldValues, setFieldValues] = useState<Record<number, string>>({})
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await fetch(`/api/public/forms/${formId}`)
                if (res.status === 404) {
                    setError('Form not found.')
                    return
                }

                if (!res.ok) {
                    setError('Something went wrong with fetching the form.')
                    return
                }

                const data = await res.json()
                setForm(data)

                const values: Record<number, string> = Object.fromEntries(
                    data.fields.map((field: Field) => [field.id, ''])
                )

                setFieldValues(values)

            } catch (err) {
                setError('Something went wrong with loading the page.')
            } finally {
                setLoading(false)
            }
        }

        fetchForms()
    }, [formId])

    function handleValueChange(fieldId: number, newValue: string) {
        setFieldValues((prev) => ({ ...prev, [fieldId]: newValue }))
        setFieldErrors((prev) => {
            if (!prev[fieldId]) return prev
            const { [fieldId]: _removed, ...rest } = prev
            return rest
        })
    }

    function validateForm(): Record<number, string> {
        const newErrors: Record<number, string> = {}

        for (const field of form?.fields ?? []) {
            const value = (fieldValues[field.id] ?? '').trim()

            if (field.required && value === '') {
                newErrors[field.id] = 'This field is required'
                continue
            }

            if (field.type === 'email' && !isValidEmail(value)) {
                newErrors[field.id] = 'Please enter a valid email address'
            }
            if (field.type === 'phone' && !isValidPhone(value)) {
                newErrors[field.id] = 'Please enter a valid phone number'
            }
        }

        return newErrors
    }

    async function submitForm(values: Record<number, string>) {
        setSubmitting(true)
        const newErrors = validateForm()
        setFieldErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        try {
            const res = await fetch(`/api/public/forms/${formId}`, {
                method: 'POST',
                body: JSON.stringify({ values })
            })

            if (res.status === 500) {
                setError('Something went wrong with submitting the form, please try again.')
                return
            }

            if (!res.ok) {
                setError('Something went wrong with submitting the form.')
                return
            }
        } catch (err) {
            setError('Something went wrong with submitting the form.')
        } finally {
            setSubmitting(false)
            setSubmitted(true)
        }

    }

    function startOver() {
        setFieldValues({})
        setFieldErrors({})
        setSubmitted(false)
        setError('')

        window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    }

    if (submitted) return (<div className='flex flex-row min-h-screen'>
        <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 min-h-screen`}>
            <div className='flex-1 flex flex-col min-h-screen'>
                <div className='flex-1 flex flex-col lg:flex-row min-h-screen'>
                    <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                        <div className='flex-1 flex flex-col min-h-screen'>
                            <div className='bg-white px-2 pb-2 border-b-1 pt-2 border-gray-300 flex justify-between items-center'>
                                <div className='flex flex-row justify-between px-4 py-1'>
                                    <div className='flex flex-row gap-3 items-center'>
                                        <p className='font-mono text-md font-semibold'>FormForge | {form?.title}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-row justify-between min-h-screen'>
                                <div className='flex-1 self-start flex flex-row'>
                                    <div className='bg-[#B7E0D8] flex-1 flex flex-col mx-6 md:mx-40 lg:mx-70 xl:mx-100 2xl:mx-120 px-4 py-6 my-6 border rounded-xs border-[#8ed0b8] text-sm shadow-lg'>

                                        <div className='flex flex-col gap-4 '>
                                            <div className='px-2 pt-2 flex items-center '>
                                                <div className='pb-4 flex flex-row py-1 w-full justify-center'>
                                                    <p className='font-mono text-md font-semibold'>Thank you, your submittion has been received!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-row justify-between px-2 py-1 w-full justify-center'>
                                            <button
                                                className={`text-xs bg-transparent border-gray-400 text-gray-500 cursor-pointer font-sans font-semibold py-2 px-4 border-2 rounded-md text-center hover:bg-stone-100 transition-all duration-200`}
                                                type='button'
                                                onClick={(e) => startOver()}>
                                                Start over
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

    if (loading) return (<div className='flex flex-row h-screen overflow-hidden'>
        <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 h-full`}>
            <div className='flex-1 flex flex-col overflow-hidden'>
                <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
                    <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                        <div className='flex-1 flex flex-col overflow-hidden'>
                            <div className='bg-white px-2 pb-2 border-b-1 pt-2 border-gray-300 flex justify-between items-center'>
                                <div className='flex flex-row justify-between px-4 py-1'>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-mono text-md font-semibold'>Loading…</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

    return (
        <div className='flex flex-row min-h-screen'>
            {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
            <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 min-h-screen`}>
                <div className='flex-1 flex flex-col min-h-screen'>
                    {/* main */}
                    <div className='flex-1 flex flex-col lg:flex-row min-h-screen'>
                        <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                            <div className='flex-1 flex flex-col min-h-screen'>
                                <div className='bg-white px-2 pb-2 border-b-1 pt-2 border-gray-300 flex justify-between items-center'>
                                    <div className='flex flex-row justify-between px-4 py-1'>
                                        <div className='flex flex-row gap-3 items-center'>
                                            <p className='font-mono text-md font-semibold'>FormForge | {form?.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-1 flex flex-row justify-between min-h-screen'>
                                    <div className='flex-1 self-start flex flex-col'>
                                        <div className={error ? 'block flex bg-red-500/20 flex-1 max-h-10 border-b-2 border-red-300 py-2 px-4' : 'hidden'}>
                                            <p className='text-red-600 font-sans text-sm'>{error}</p>
                                        </div>
                                        <div className='bg-[#B7E0D8] flex-1 flex flex-row mx-6 md:mx-40 lg:mx-70 xl:mx-100 2xl:mx-120 px-4 py-6 my-6 border rounded-xs border-[#8ed0b8] text-sm shadow-lg'>

                                            <div className='flex-1 flex flex-col gap-4 '>
                                                <div className='px-2 mb-2 pt-2 flex items-center'>
                                                    <div className='pb-6 flex flex-row py-1 border-b-2  border-[#6ca692] w-full'>
                                                        <p className='font-mono text-xl font-semibold'>{form?.title}</p>
                                                    </div>
                                                </div>
                                                {
                                                    form?.fields.map((field) => (
                                                        <div className={`flex flex-col gap-1 px-2`}
                                                            key={field.id}>
                                                            <div className="flex justify-between">
                                                                <div className="flex gap-1 items-center">
                                                                    <label className='text-black font-mono text-md font-semibold mb-1'>{field.label}</label>
                                                                    {field.required ? (<p className="font-mono text-md font-semibold">*</p>) : ('')}
                                                                </div>
                                                            </div>
                                                            <FieldRenderer field={field} value={fieldValues[field.id]} onChange={handleValueChange} />
                                                            {fieldErrors[field.id] && (
                                                                <p className='text-[#d70000] font-sans text-sm mt-1'>{fieldErrors[field.id]}</p>
                                                            )}
                                                        </div>
                                                    ))
                                                }
                                                <div className='pt-2 flex flex-row justify-between px-2 py-1 w-full justify-end'>
                                                    <button
                                                        className={`${submitting ? 'bg-gray-300 hover:bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed ' : 'bg-orange-100 border-[#E4572E] text-[#c5421c]'} text-xs cursor-pointer font-sans font-semibold py-2 px-6 border-2 rounded-md text-center hover:bg-orange-200 transition-all duration-200`}
                                                        type='button'
                                                        disabled={submitting}
                                                        onClick={(e) => submitForm(fieldValues)}>
                                                        {submitting ? 'Submitting...' : 'Submit'}
                                                    </button>
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