import './globals.css'

const DARK_MODE_SCRIPT = `try{const s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&p))document.documentElement.classList.add('dark')}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: DARK_MODE_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
