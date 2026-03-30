'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const navLinks = [
    { href: `/${locale}/docs`, label: t('docs'), exact: true },
    { href: `/${locale}/docs/agents`, label: t('agents'), exact: false },
    { href: `/${locale}/docs/skills`, label: t('skills'), exact: false },
    { href: `/${locale}/docs/workflows`, label: t('workflows'), exact: false },
  ]

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="flex h-14 items-center px-6 max-w-screen-xl mx-auto gap-2">

        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-[var(--color-primary-500)] shrink-0 mr-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            <line x1="12" y1="22" x2="12" y2="15.5"/>
            <polyline points="22 8.5 12 15.5 2 8.5"/>
          </svg>
          <span className="hidden sm:inline text-[15px]">Raffles IT Kit</span>
        </Link>

        <div className="h-5 w-px bg-[var(--border)] hidden sm:block mr-3" />

        <nav className="flex items-center gap-0.5 text-sm flex-1">
          {navLinks.map(({ href, label, exact }) => {
            const active = isActive(href, exact)
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'relative px-3 py-1.5 rounded-md font-medium transition-colors text-sm',
                  href.includes('/docs/') ? 'hidden md:inline-flex items-center' : 'inline-flex items-center',
                  active
                    ? 'text-[var(--color-primary-600)] bg-[var(--color-primary-50)]'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]',
                ].join(' ')}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--color-primary-500)] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <LanguageSwitcher />
          <div className="h-5 w-px bg-[var(--border)] mx-1" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
