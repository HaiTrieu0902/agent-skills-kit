import DocLayout from '@/components/DocLayout'
import { setRequestLocale } from 'next-intl/server'

export default async function DocsLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <DocLayout locale={locale}>
      {children}
    </DocLayout>
  )
}
