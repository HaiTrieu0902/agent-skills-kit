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
          {/* GitHub */}
          <a
            href="https://github.com/HaiTrieu0902/agent-skills-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            aria-label="GitHub repository"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

          <LanguageSwitcher />
          <div className="h-5 w-px bg-[var(--border)] mx-1" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
