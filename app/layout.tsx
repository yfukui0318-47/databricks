import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '資格対策ワークスペース',
  description: '資格学習の演習、復習、AI総括をまとめた学習アプリ',
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
