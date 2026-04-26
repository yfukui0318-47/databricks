import { NextRequest, NextResponse } from 'next/server'
import {
  RESOURCES_BUCKET,
  createResourceFileUrl,
  ensureResourcesBucket,
  getSupabaseServerClient,
} from '@/lib/supabase'
import type { SharedResource } from '@/types/resources'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('shared_resources')
      .select('id, title, description, file_name, file_path, file_size, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const resources = await Promise.all(
      ((data ?? []) as SharedResource[]).map(async (resource) => ({
        ...resource,
        fileUrl: await createResourceFileUrl(resource.file_path),
      })),
    )

    return NextResponse.json(resources)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load resources.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const titleValue = formData.get('title')
    const descriptionValue = formData.get('description')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'PDF file is required.' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files can be uploaded.' }, { status: 400 })
    }

    const title =
      typeof titleValue === 'string' && titleValue.trim()
        ? titleValue.trim()
        : file.name.replace(/\.pdf$/i, '')
    const description =
      typeof descriptionValue === 'string' && descriptionValue.trim()
        ? descriptionValue.trim()
        : null

    await ensureResourcesBucket()

    const supabase = getSupabaseServerClient()
    const resourceId = crypto.randomUUID()
    const safeFileName = file.name.replace(/[^\w.\-() ]/g, '_')
    const filePath = `${resourceId}/${safeFileName}`

    const { error: uploadError } = await supabase.storage
      .from(RESOURCES_BUCKET)
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data, error: insertError } = await supabase
      .from('shared_resources')
      .insert({
        id: resourceId,
        title,
        description,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
      })
      .select('id, title, description, file_name, file_path, file_size, created_at')
      .single()

    if (insertError) {
      await supabase.storage.from(RESOURCES_BUCKET).remove([filePath])
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    const fileUrl = await createResourceFileUrl(filePath)
    return NextResponse.json({ ...data, fileUrl }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload resource.' },
      { status: 500 },
    )
  }
}
