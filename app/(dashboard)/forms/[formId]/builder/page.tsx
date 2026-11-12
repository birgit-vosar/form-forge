'use client'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import FieldTypeMenu from '@/components/builder/FieldTypeMenu'
import { Field, NewField, FieldUpdateProps, OptionsUpdateProps, FieldType, FIELD_TYPE_CONFIG } from '@/lib/fieldTypes'
import { Form } from '@/lib/formTypes'
import FormFields from '@/components/builder/FormFields'
import FieldSettingsPanel from '@/components/builder/FieldSettingsPanel'
import FormSettingsPanel from '@/components/builder/FormSettingsPanel'

export default function DashboardPage() {
    const { formId } = useParams<{ formId: string }>()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string>('')
    const [form, setForm] = useState<Form | null>(null)

    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)
    const debounceRefDesc = useRef<ReturnType<typeof setTimeout>>(null)
    const debounceRefFooter = useRef<ReturnType<typeof setTimeout>>(null)
    const isMounted = useRef(false)
    const isMountedDesc = useRef(false)
    const isMountedFooter = useRef(false)
    const debounceRefMap = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
    const isMountedMap = useRef<Record<number, boolean>>({});
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState<string | null>('')
    const [footerNote, setFooterNote] = useState<string | null>('')
    const [topic, setTopic] = useState<string | null>('')
    const [published, setPublished] = useState<boolean | undefined>(undefined)

    const [fields, setFields] = useState<Field[]>([])
    const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null)
    const selectedField = fields.find(field => field.id === selectedFieldId) ?? null

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
                { data.is_published ? setPublished(true) : setPublished(false) }

                const resFields = await fetch(`/api/forms/${formId}/fields`)
                const fieldsData = await resFields.json()
                setFields(fieldsData)
            } catch (err) {
                setError('Something went wrong with loading the page.')
            } finally {
                setLoading(false)
            }
        }
        fetchForms()
    }, [])


    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }

        if (!title) { return }

        if (debounceRef.current) { clearTimeout(debounceRef.current) }
        debounceRef.current = setTimeout(async () => {
            try {
                setSaving(true)
                setError('')
                const res = await fetch(`/api/forms/${formId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title })
                })

                if (!res.ok) {
                    if (res.status === 400) {
                        setError('Title format is incorrect.')
                        console.log('error:', 400)
                    } else {
                        setError('Something went wrong saving the form — please try again.')
                        console.log('error:', 500)
                    }
                }

            } catch (err) {
                setError('Something went wrong with saving the form.')
            } finally {
                setSaving(false)
            }
        }, 800)
    }, [title])

    useEffect(() => {
        if (!isMountedDesc.current) {
            isMountedDesc.current = true
            return
        }

        if (!description) { return }

        if (debounceRefDesc.current) { clearTimeout(debounceRefDesc.current) }
        debounceRefDesc.current = setTimeout(async () => {
            try {
                setSaving(true)
                setError('')
                const res = await fetch(`/api/forms/${formId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ description })
                })

                if (!res.ok) {
                    if (res.status === 400) {
                        setError('Description format is incorrect.')
                        console.log('error:', 400)
                    } else {
                        setError('Something went wrong saving the form — please try again.')
                        console.log('error:', 500)
                    }
                }

            } catch (err) {
                setError('Something went wrong with saving the form.')
            } finally {
                setSaving(false)
            }
        }, 800)
    }, [description])

    useEffect(() => {
        setError('')
        if (!isMountedFooter.current) {
            isMountedFooter.current = true
            return
        }

        if (!footerNote) { return }

        if (debounceRefFooter.current) { clearTimeout(debounceRefFooter.current) }
        debounceRefFooter.current = setTimeout(async () => {
            try {
                setSaving(true)
                setError('')
                const res = await fetch(`/api/forms/${formId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ footerNote })
                })

                if (!res.ok) {
                    if (res.status === 400) {
                        setError('Footer description format is incorrect.')
                        console.log('error:', 400)
                    } else {
                        setError('Something went wrong saving the form — please try again.')
                        console.log('error:', 500)
                    }
                }

            } catch (err) {
                setError('Something went wrong with saving the form.')
            } finally {
                setSaving(false)
            }
        }, 800)
    }, [footerNote])

    async function handleAddField(type: FieldType) {
        const typeInfo = FIELD_TYPE_CONFIG[type]

        const newField: NewField = {
            type: type,
            topic: null,
            name: null,
            label: typeInfo.label,
            placeholder: null,
            required: false,
            order_index: fields.length,
            validation_rules: typeInfo.defaultValidation
        }

        const res = await fetch(`/api/forms/${formId}/fields`, {
            method: 'POST',
            body: JSON.stringify(newField)
        })

        if (!res.ok) {
            setError('Failed to add a form field, please try again.')
            return
        }
        const savedField = await res.json()

        setFields(prev =>
            [
                ...prev,
                savedField
            ]
        )
        setSelectedFieldId(savedField.id)
    }

    async function handleAddOption(fieldId: number) {

        const res = await fetch(`/api/forms/${formId}/fields/${fieldId}/options`, {
            method: 'POST'
        })

        if (!res.ok) {
            setError('Failed to add a new options field, please try again.')
            return
        }
        const newOptionField = await res.json()

        setFields(prev =>
            prev.map(field =>
                field.id === fieldId
                    ? { ...field, options: [...(field.options ?? []), newOptionField] }
                    : field
            )
        )
    }

    async function handleDeleteField(fieldId: number) {
        const res = await fetch(`/api/forms/${formId}/fields`, {
            method: 'DELETE',
            body: JSON.stringify(fieldId)
        })

        if (!res.ok) {
            setError('Failed to delete the field, please try again.')
            return
        }

        const updatedFields = fields.filter(field => field.id !== fieldId)
        setFields(updatedFields)
    }

    async function handleDeleteOption(optionId: number, fieldId: number) {
        const res = await fetch(`/api/forms/${formId}/fields/${fieldId}/options`, {
            method: 'DELETE',
            body: JSON.stringify({ optionId })
        })

        if (!res.ok) {
            setError('Failed to delete options field, please try again.')
            return
        }

        setFields(prev =>
            prev.map(field =>
                field.id === fieldId
                    ? { ...field, options: [...(field.options ?? []).filter(opt => opt.id !== optionId)] }
                    : field
            )
        )
    }

    async function handleUpdateField({ fieldId, update }: FieldUpdateProps) {
        setFields(prev => prev.map(
            field => field.id === fieldId ?
                { ...field, ...update } :
                field
        ))

        if (!isMounted.current) {
            isMounted.current = true
            return
        }

        if (debounceRef.current) { clearTimeout(debounceRef.current) }

        debounceRef.current = setTimeout(async () => {
            try {
                setSaving(true)
                setError('')
                const res = await fetch(`/api/forms/${formId}/fields/${fieldId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ update })
                })

                if (!res.ok) {
                    if (res.status === 400) {
                        setError('Update format is incorrect.')
                        console.log('error:', 400)
                    } else {
                        setError('Something went wrong saving the form — please try again.')
                        console.log('error:', 500)
                    }
                }

                const savedField = await res.json()
                setFields(prev =>
                    prev.map(field =>
                        field.id === fieldId ? { ...field, ...savedField } : field
                    )
                )
            } catch (err) {
                setError('Something went wrong with saving the new field update.')
            } finally {
                setSaving(false)
            }
        }, 800)
    }

    async function handleUpdateOption({ fieldId, optionId, update }: OptionsUpdateProps) {
        setFields(prev =>
            prev.map(field =>
                field.id === fieldId
                    ? {
                        ...field,
                        options: (field.options ?? []).map(opt =>
                            opt.id === optionId ? { ...opt, ...update } : opt
                        )
                    }
                    : field
            )
        )

        if (!isMountedMap.current[optionId]) {
            isMountedMap.current[optionId] = true
            return
        }

        if (debounceRefMap.current[optionId]) {
            clearTimeout(debounceRefMap.current[optionId])
        }

        debounceRefMap.current[optionId] = setTimeout(async () => {
            try {
                setSaving(true)
                setError('')
                const res = await fetch(`/api/forms/${formId}/fields/${fieldId}/options`, {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ update, optionId })
                })

                if (!res.ok) {
                    if (res.status === 400) {
                        setError('Update format is incorrect.')
                    } else {
                        setError('Something went wrong saving the form — please try again.')
                    }
                    return // stop here — don't try to parse a failed response as the saved option
                }

                const savedOptionsField = await res.json()
                setFields(prev =>
                    prev.map(field =>
                        field.id === fieldId
                            ? {
                                ...field,
                                options: (field.options ?? []).map(opt =>
                                    opt.id === optionId ? savedOptionsField : opt
                                )
                            }
                            : field
                    )
                )
            } catch (err) {
                setError('Something went wrong with saving the new field update.')
            } finally {
                setSaving(false)
            }
        }, 800)
    }

    async function handleUpdateForm(topic?: string | null) {

        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        if (topic !== undefined) setTopic(topic)
        if (debounceRef.current) { clearTimeout(debounceRef.current) }

        debounceRef.current = setTimeout(async () => {
            try {
                setSaving(true)
                setError('')
                const res = await fetch(`/api/forms/${formId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ topic })
                })
                const data = await res.json()
                if (!res.ok) {
                    setError(data.error ?? 'Something went wrong with changing the topic.')
                    return
                }

            } catch (err) {
                setError('Something went wrong with changing the topic.')
            } finally {
                setSaving(false)
            }
        }, 800)
    }

    function handleSelect(fieldId: number) {
        setSelectedFieldId(fieldId)
    }

    async function handlePublish() {
        try {
            setSaving(true)
            setError('')
            const res = await fetch(`/api/forms/${formId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ published: !published })
            })
            const publishData = await res.json()
            console.log('this is the publishdata error in the handlepublish in builder: ', publishData.error)
            if (!res.ok) {
                setError(publishData.error ?? 'Something went wrong with publishing the form.')
                return
            }

            setPublished(publishData.isPublished)
        } catch (err) {
            setError('Something went wrong with publishing the form.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (<div className='flex flex-row h-screen overflow-hidden'>
        <Sidebar />
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
                                        <p className='uppercase font-mono text-sm font-semibold'>Loading ....</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
    if (!form) return (
        <div className='flex flex-row min-h-screen'>
            <Sidebar />
            {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
            <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 min-h-screen`}>
                <div className='flex-1 flex flex-col min-h-screen'>
                    {/* main */}
                    <div className='flex-1 flex flex-col lg:flex-row min-h-screen'>
                        <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                            <div className='flex-1 flex flex-col min-h-screen'>
                                <div className='bg-white px-2 py-2 border-b-1 border-gray-300 flex justify-between items-center'>
                                    <div className='flex flex-1 flex-row justify-between px-4 py-1'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-mono text-md font-semibold'>Form not found.</p>
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
            <Sidebar />
            {/*{mobileMenu ? (<div className='fixed inset-0 bg-black/20 z-40 md:hidden' onClick={toggleMobileNav} />) : (<div className='md:hidden' />)}*/}
            <div className={`flex-1 flex flex-col bg-stone-100 text-zinc-800 min-h-screen`}>
                <div className='flex-1 flex flex-col min-h-screen'>
                    {/* main */}
                    <div className='flex-1 flex flex-col lg:flex-row min-h-screen'>
                        <div className='flex-[4] flex flex-col bg-stone-100 h-full'>
                            <div className='flex-1 flex flex-col min-h-screen'>
                                <div className='bg-white px-2 py-2 border-b-1 border-gray-300 flex justify-between items-center'>
                                    <div className='flex flex-1 flex-row justify-between px-4 py-1'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-mono text-md font-semibold'>{title ? title : form.title}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 justify-end mr-4 flex-1'>
                                        {saving === true ? <p className='animate-pulse cursor-default font-sans text-sm pt-1 text-gray-400'>Saving...</p> : (<div className='flex items-center gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-400 size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                            </svg>
                                            <p className='cursor-default font-sans text-sm text-gray-400'>Auto-saved</p>
                                        </div>)}
                                        <button type='button' onClick={(e) => handlePublish()} className='max-w-32 basis-64 font-sans font-semibold text-[#E4572E] text-sm py-1 px-2 flex-1 border-2 rounded-md border-[#E4572E] 
                                                            text-center bg-orange-100 hover:bg-orange-200 transition-all duration-200 cursor-pointer active:scale-90 active:bg-orange-400'>
                                            {published ? 'Published' : 'Unpublished'}
                                        </button>

                                    </div>
                                </div>
                                <div className='flex-1 flex flex-row justify-between min-h-screen'>
                                    <FieldTypeMenu onAddField={handleAddField} />
                                    <div className='flex-1 self-start flex flex-col'>
                                        <div className={error ? 'block flex bg-red-500/20 flex-1 max-h-10 border-b-2 border-red-300 py-2 px-4' : 'hidden'}>
                                            <p className='text-red-400 font-sans text-sm'>{error}</p>
                                        </div>
                                        <div className='bg-[#B7E0D8] flex-1 flex flex-row mx-6 lg:mx-10 px-4 py-6 my-6 border rounded-xl border-[#8ed0b8] text-sm shadow-lg'>
                                            <div className='flex-1 flex flex-col gap-4 '>
                                                <div className='flex flex-row items-center gap-4'>
                                                    <input
                                                        type='text'
                                                        className='text-black font-mono text-lg font-semibold field-sizing-content min-w-20 max-w-md
                                                                    placeholder:font-mono placeholder:text-md placeholder:font-semibold placeholder:text-black focus:outline-none'
                                                        placeholder={title ? title : form.title}
                                                        defaultValue={form.title}
                                                        maxLength={50}
                                                        onChange={(e) => { e.target.value === '' ? setTitle(`${form.title}`) : setTitle(e.target.value) }} />
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#659785" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </div>
                                                <div className='flex flex-row items-end gap-4 mb-4'>
                                                    <textarea
                                                        rows={1}
                                                        className='text-black/75 font-mono text-md font-semibold field-sizing-content
                                                                    placeholder:font-mono placeholder:text-md placeholder:font-semibold placeholder:text-black/50 focus:outline-none resize-none
                                                                    break-words whitespace-pre-wrap overflow-hidden'
                                                        placeholder={description ? description : form.description || 'Header description slot.....'}
                                                        defaultValue={form.description || ''}
                                                        maxLength={1000}
                                                        onChange={(e) => {
                                                            setDescription(e.target.value)
                                                            e.target.style.height = 'auto'
                                                            e.target.style.height = `${e.target.scrollHeight}px`
                                                        }} />
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#659785" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </div>
                                                <FormFields fields={fields} setFields={setFields} onSelect={handleSelect} onDelete={handleDeleteField}
                                                    selectedFieldId={selectedFieldId} formId={formId} />
                                                <div className='flex flex-row items-end gap-4 mb-4'>
                                                    <textarea
                                                        rows={1}
                                                        className='text-black/75 font-mono text-md font-semibold field-sizing-content
                                                                    placeholder:font-mono placeholder:text-md placeholder:font-semibold placeholder:text-black/50 focus:outline-none resize-none
                                                                    break-words whitespace-pre-wrap overflow-hidden'
                                                        placeholder={footerNote ? footerNote : form.footer_note || 'Footer description slot.....'}
                                                        defaultValue={form.footer_note || ''}
                                                        maxLength={1000}
                                                        onChange={(e) => {
                                                            setFooterNote(e.target.value)
                                                            e.target.style.height = 'auto'
                                                            e.target.style.height = `${e.target.scrollHeight}px`
                                                        }} />
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#659785" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-[#eeeeee] flex-1 flex pt-6 border-l border-gray-300 text-sm 2xl:min-w-40 max-w-100'>
                                        <div className='flex flex-col gap-2 divide-y divide-gray-300 w-full'>
                                            <FormSettingsPanel key={form.id} form={form} onUpdateForm={handleUpdateForm} published={published} />
                                            <FieldSettingsPanel key={selectedFieldId} selectedField={selectedField} onUpdate={handleUpdateField} addOption={handleAddOption}
                                                deleteOption={handleDeleteOption} updateOption={handleUpdateOption} />
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