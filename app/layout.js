/* eslint-disable react/react-in-jsx-scope */
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Team Generator',
  description: 'Team Generator Fútbol',
}

export default function RootLayout ({ children }) {
  // Usar directamente el basePath, sin hooks de cliente
  const basePath = (typeof window !== 'undefined' && window.location && window.location.pathname.startsWith('/teamgenerator')) ? '/teamgenerator' : ''
  return (
    <html lang="en">
      <head>
        {/* Ejemplo de uso de basePath en favicon */}
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
