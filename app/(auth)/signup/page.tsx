'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState<boolean | string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)


        try {
            setLoading(true)
            setError(false)
            const email = formData.get('email')
            const password = formData.get('password')
            /* check if user already has an account */
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                setLoading(false)
                setError(data.error)
                return
            }
                setError(false)
                setLoading(false)
                setUserCreated(true)
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
            

            /* user is redirected to login page */



        } catch (err) {
            console.error('Signup error:', err);
            setError('Something went wrong with signup.')
        }

    }

    return (
        <div className='bg-stone-50 flex flex-col items-center justify-center min-h-screen  '>
            <div className='bg-white py-8 px-6 border border-stone-200 rounded-lg w-full max-w-md'>
                <div className={`${userCreated === true && 'hidden'}`}>
                    <h2 className='mb-4 text-stone-700 text-center font-semibold text-xl/9'>Welcome to FormForge</h2>
                </div>
                <div>
                    {userCreated === true ?
                        (<div className='flex gap-2 justify-center zoom-in animate-duration-700'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='text-lime-600 size-6'>
                                <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z' clipRule='evenodd' />
                            </svg>


                            <p className='text-md text-stone-800'>User successfully created</p>
                        </div>)
                        :
                        (<form onSubmit={handleSubmit} className='space-y-6'>
                            {error && (
                                <div className='bg-red-500/10 border border-red-700 text-red-900 px-4 py-2 rounded'>
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className='text-stone-800'>
                                    Email
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='email' name='email' type='email' required autoComplete='email'
                                        className='text-stone-700 bg-stone-50 w-full outline-1 -outline-offset-1 outline-stone-300 placeholder:text-muted-foreground px-3 py-1.5 rounded-md sm:text-sm/6'
                                        placeholder='you@example.com'
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='text-stone-800'>
                                    Password
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='password' name='password' type='password' required autoComplete='current-password'
                                        className='text-stone-700 bg-stone-50 w-full outline-1 -outline-offset-1 outline-stone-300 placeholder:text-stone-500 px-3 py-1.5 rounded-md sm:text-sm/6'
                                        placeholder='••••••••'
                                    />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='cursor-pointer hover:bg-emerald-500 active:bg-emerald-700 items-center justify-center rounded-md text-sm font-normal bg-emerald-600 h-10 w-full'>
                                    {loading === true ? 'Loading...' : 'Sign up'}
                                </button>
                            </div>
                        </form>)}

                </div>
            </div>
        </div>
    )
}