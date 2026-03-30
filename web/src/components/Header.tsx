import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-4 px-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-bold text-[var(--color-primary-500)] shrink-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            <line x1="12" y1="22" x2="12" y2="15.5"/>
            <polyline points="22 8.5 12 15.5 2 8.5"/>
          </svg>
          <span className="hidden sm:inline">Antigravity Kit</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 text-sm ml-2">
          <Link
            href={`/${locale}/docs`}
            className="px-3 py-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            {t('docs')}
          </Link>
          <Link
            href={`/${locale}/docs/agents`}
            className="px-3 py-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors hidden md:block"
          >
            {t('agents')}
          </Link>
          <Link
            href={`/${locale}/docs/skills`}
            className="px-3 py-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors hidden md:block"
          >
            {t('skills')}
          </Link>
          <Link
            href={`/${locale}/docs/workflows`}
            className="px-3 py-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors hidden md:block"
          >
            {t('workflows')}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
