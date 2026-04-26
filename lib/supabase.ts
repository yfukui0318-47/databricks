import { createClient } from '@supabase/supabase-js'

export const RESOURCES_BUCKET = 'shared-resources'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function getSupabaseServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not configured.')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey ?? supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export async function ensureResourcesBucket() {
  const supabase = getSupabaseServerClient()
  const { data } = await supabase.storage.getBucket(RESOURCES_BUCKET)

  if (data) return

  const { error } = await supabase.storage.createBucket(RESOURCES_BUCKET, {
    public: false,
    allowedMimeTypes: ['application/pdf'],
    fileSizeLimit: 50 * 1024 * 1024,
  })

  if (error && !error.message.toLowerCase().includes('already exists')) {
    throw error
  }
}

export async function createResourceFileUrl(filePath: string) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.storage
    .from(RESOURCES_BUCKET)
    .createSignedUrl(filePath, 60 * 60)

  if (error) throw error
  return data.signedUrl
}
