import { NextRequest, NextResponse } from 'next/server'
import { RESOURCES_BUCKET, getSupabaseServerClient } from '@/lib/supabase'

type RouteContext = {
  params: {
    id: string
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error: loadError } = await supabase
      .from('shared_resources')
      .select('file_path')
      .eq('id', params.id)
      .single()

    if (loadError || !data) {
      return NextResponse.json(
        { error: loadError?.message ?? 'Resource not found.' },
        { status: 404 },
      )
    }

    const { error: deleteError } = await supabase
      .from('shared_resources')
      .delete()
      .eq('id', params.id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    const { error: storageError } = await supabase.storage
      .from(RESOURCES_BUCKET)
      .remove([data.file_path])

    if (storageError) {
      return NextResponse.json({ error: storageError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete resource.' },
      { status: 500 },
    )
  }
}
