import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const BookCreate = () => {
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })

        if (res.ok) {
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }
        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)

    }
    return (
        <div>
            <Head>
            <title>Books Create</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>BookCreate</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setBookTitle(e.target.value)}
                    value={bookTitle}
                    disabled={submitting}
                    type="text"
                />
                <button disabled={submitting}
                >{submitting ? 'Enviando...' : 'Enviar'}</button>
                {errors.title && (
                    <span style={{
                        color: 'red', display: 'block'
                    }}>{errors.title}</span>
                )}
            </form>
            <br/>
            <Link href="/libros">Book List</Link>
        </div>
    );
};

export default BookCreate;
