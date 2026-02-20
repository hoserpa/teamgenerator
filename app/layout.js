/* eslint-disable react/react-in-jsx-scope */
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Team Generator',
  description: 'Team Generator Fútbol',
  icons: {
    icon: { url: '/icon.png', type: 'image/png' },
    apple: { url: '/icon.png' },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout ({ children }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/teamgenerator' : ''
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href={`${basePath}/icon.png`} />
        <link rel="apple-touch-icon" href={`${basePath}/icon.png`} />
        <meta name="theme-color" content="#121212" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
