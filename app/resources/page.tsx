'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SharedResource } from '@/types/resources'

function formatFileSize(size: number | null) {
  if (!size) return '-'
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<SharedResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadResources() {
      try {
        const response = await fetch('/api/resources')
        const data = await response.json()
        if (!response.ok) throw new Error(data.error ?? 'Knowledge entries could not be loaded.')
        setResources(data)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Knowledge entries could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadResources()
  }, [])

  const handleDelete = async (resource: SharedResource) => {
    if (!confirm(`「${resource.title}」を削除しますか？`)) return

    setError(null)
    setDeletingId(resource.id)

    try {
      const response = await fetch(`/api/resources/${resource.id}`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error ?? 'The entry could not be deleted.')

      setResources((currentResources) =>
        currentResources.filter((currentResource) => currentResource.id !== resource.id),
      )
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'The entry could not be deleted.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/" className="text-sm text-slate-500 transition-colors hover:text-slate-700">
            ← ホーム
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">Knowledge Library</h1>
          <p className="mt-1 text-sm text-slate-500">
            Keep useful findings, notes, and artifacts in one place so knowledge compounds over time.
          </p>
        </div>
        <Link
          href="/resources/upload"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400"
        >
          Add entry
        </Link>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-6 text-sm text-slate-500">読み込んでいます...</div>
        ) : error ? (
          <div className="p-6 text-sm text-red-500">{error}</div>
        ) : resources.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">No knowledge entries yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {resources.map((resource) => (
              <article key={resource.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto]">
                <div className="min-w-0">
                  <h2 className="truncate font-bold text-slate-900">{resource.title}</h2>
                  {resource.description && (
                    <p className="mt-1 text-sm leading-6 text-slate-600">{resource.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span>{resource.file_name}</span>
                    <span>{formatFileSize(resource.file_size)}</span>
                    <span>{new Date(resource.created_at).toLocaleString('ja-JP')}</span>
                  </div>
                </div>
                <div className="flex gap-2 sm:justify-end">
                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 rounded-lg border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    開く
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(resource)}
                    disabled={deletingId === resource.id}
                    className="h-10 rounded-lg border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === resource.id ? '削除中' : '削除'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
