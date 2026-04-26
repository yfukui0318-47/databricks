export type SharedResource = {
  id: string
  title: string
  description: string | null
  file_name: string
  file_path: string
  file_size: number | null
  created_at: string
  fileUrl?: string
}
