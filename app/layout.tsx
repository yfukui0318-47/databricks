import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Knowledge Growth Hub',
  description: 'A learning workspace for practice, review, and AI-assisted reflection.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
