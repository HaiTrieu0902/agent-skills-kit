'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: string) {
    if (next === locale) return
    // pathname includes /en or /vi prefix
    const segments = pathname.split('/')
    segments[1] = next
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 rounded transition-colors font-medium ${
          locale === 'en'
            ? 'bg-[var(--color-primary-500)] text-white'
            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('vi')}
        className={`px-2 py-1 rounded transition-colors font-medium ${
          locale === 'vi'
            ? 'bg-[var(--color-primary-500)] text-white'
            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
        }`}
      >
        VI
      </button>
    </div>
  )
}
