import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function FormsPage() {
    const { formId } = useParams()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchForms = async() => {
            try {
                const res = await fetch(`/api/public/forms/${formId}`)
                if (!res.ok) {
                    setError('Something went wrong with fetching the forms.')
                    return
                }
            } catch(err) {
                setError('Something went wrong with fetching the forms.')
            } finally {
                setLoading(false)
            }
        }

        fetchForms()
    }, [])

    return(
        <div>
            <p>This is forms page</p>
        </div>
    )
}