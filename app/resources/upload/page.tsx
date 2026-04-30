'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResourceUploadPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file || isUploading) return

    setError(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('description', description)

      const response = await fetch('/api/resources', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error ?? 'The entry could not be saved.')
      router.push('/resources')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'The entry could not be saved.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <Link href="/resources" className="text-sm text-slate-500 transition-colors hover:text-slate-700">
        ← Knowledge Library
      </Link>

      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-slate-950">Add Knowledge Entry</h1>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-colors focus:border-cyan-500"
              placeholder="Leave blank to use the file name"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-colors focus:border-cyan-500"
              placeholder="What this captures, when to revisit it, or where it helps"
            />
          </div>

          <div>
            <label htmlFor="file" className="mb-1 block text-sm font-semibold text-slate-700">
              PDF file
            </label>
            <input
              id="file"
              type="file"
              accept="application/pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!file || isUploading}
            className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {isUploading ? 'Saving...' : 'Save entry'}
          </button>
        </form>
      </section>
    </main>
  )
}
