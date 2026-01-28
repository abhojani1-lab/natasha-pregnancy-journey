import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Natasha's Pregnancy Journey",
  description: 'A personal pregnancy journey tracker for Natasha',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
