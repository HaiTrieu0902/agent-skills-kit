import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/Header'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isVi = locale === 'vi'
  return {
    title: 'Raffles IT Kit',
    description: isVi
      ? 'Bộ công cụ nâng cao AI Agent — 19 agent chuyên biệt, 19 kỹ năng, 11 quy trình.'
      : 'AI Agent Enhancement Toolkit — 19 specialist agents, 19 skills, 11 workflows.',
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'vi')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header locale={locale} />
      <div lang={locale}>
        {children}
      </div>
    </NextIntlClientProvider>
  )
}
