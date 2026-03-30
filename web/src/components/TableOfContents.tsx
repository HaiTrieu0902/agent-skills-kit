'use client'
import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface Props {
  label: string
}

export default function TableOfContents({ label }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('.prose h2, .prose h3')
    ) as HTMLElement[]

    const hs: Heading[] = elements.map(el => {
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || Math.random().toString(36).slice(2)
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName.slice(1))
      }
    })

    setHeadings(hs)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    )

    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="w-52 shrink-0 hidden xl:block">
      <div className="sticky top-20 py-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3 px-2">
          {label}
        </p>
        <nav>
          <ul className="space-y-1">
            {headings.map(h => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block text-sm py-0.5 transition-colors border-l-2 ${
                    h.level === 3 ? 'pl-5' : 'pl-3'
                  } ${
                    active === h.id
                      ? 'border-[var(--color-primary-500)] text-[var(--color-primary-500)] font-medium'
                      : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)]'
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
