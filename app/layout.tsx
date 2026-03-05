import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '墓じまいパートナーズ | 立会不要で安心墓じまい。お寺への連絡からお墓の整理までフルサポート',
  description:
    '墓じまいをご検討中の方へ。自身で対応するのは難しいけど、お寺と良好な関係のまま墓じまいをしたい。そんなご家族のお手伝いをいたします。立会不要・全国対応可能。まずは無料相談から。',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="font-sans antialiased">
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YVJEN1GPVJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YVJEN1GPVJ');
          `}
        </Script>

        <Analytics />
      </body>
    </html>
  )
}
