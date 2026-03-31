'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem { slug: string; name: string }
interface Props {
  locale: string
  agents: NavItem[]
  skills: NavItem[]
  workflows: NavItem[]
  labels: { agents: string; skills: string; workflows: string; guide: string }
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function NavSection({
  sectionKey, title, sectionHref, items, basePath, locale, pathname, open, onToggle
}: {
  sectionKey: string
  title: string
  sectionHref: string
  items: NavItem[]
  basePath: string
  locale: string
  pathname: string
  open: boolean
  onToggle: () => void
}) {
  const sectionActive = pathname === sectionHref || pathname.startsWith(sectionHref + '/')

  return (
    <div className="mb-1">
      {/* Section header row: label links to listing page, chevron toggles collapse */}
      <div className={`flex items-center justify-between rounded-md mb-0.5 group ${sectionActive ? 'bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.1)]' : ''}`}>
        <Link
          href={sectionHref}
          className={`flex-1 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
            sectionActive
              ? 'text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]'
              : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
          }`}
        >
          {title}
        </Link>
        <button
          onClick={onToggle}
          className={`p-1.5 rounded-md transition-colors mr-0.5 ${
            sectionActive
              ? 'text-[var(--color-primary-500)]'
              : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
          }`}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <ChevronIcon open={open} />
        </button>
      </div>

      {open && (
        <ul className="space-y-0.5 mb-3">
          {items.map(item => {
            const href = `/${locale}/docs/${basePath}/${item.slug}`
            const active = pathname === href
            return (
              <li key={item.slug}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors ${
                    active
                      ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)] font-medium dark:bg-[rgba(30,127,203,0.18)] dark:text-[var(--color-primary-300)]'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
                  }`}
                >
                  {active && (
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary-500)] shrink-0" />
                  )}
                  <span className={`truncate ${active ? '' : 'pl-3'}`}>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function Sidebar({ locale, agents, skills, workflows, labels }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState({ agents: true, skills: true, workflows: true })

  function toggle(key: keyof typeof open) {
    setOpen(o => ({ ...o, [key]: !o[key] }))
  }

  const guideHref = `/${locale}/docs/guide`
  const guideActive = pathname === guideHref

  return (
    <aside className="w-56 shrink-0 hidden lg:flex flex-col border-r border-[var(--border)]">
      <nav className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-5 pr-3 pl-1">
        {/* Getting Started link */}
        <div className="mb-3">
          <Link
            href={guideHref}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md font-medium transition-colors ${
              guideActive
                ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)] dark:bg-[rgba(30,127,203,0.18)] dark:text-[var(--color-primary-300)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 8 16 12 12 16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            {labels.guide}
          </Link>
        </div>
        <div className="h-px bg-[var(--border)] mb-3" />
        <NavSection
          sectionKey="agents" title={labels.agents}
          sectionHref={`/${locale}/docs/agents`}
          items={agents} basePath="agents"
          locale={locale} pathname={pathname}
          open={open.agents} onToggle={() => toggle('agents')}
        />
        <NavSection
          sectionKey="skills" title={labels.skills}
          sectionHref={`/${locale}/docs/skills`}
          items={skills} basePath="skills"
          locale={locale} pathname={pathname}
          open={open.skills} onToggle={() => toggle('skills')}
        />
        <NavSection
          sectionKey="workflows" title={labels.workflows}
          sectionHref={`/${locale}/docs/workflows`}
          items={workflows} basePath="workflows"
          locale={locale} pathname={pathname}
          open={open.workflows} onToggle={() => toggle('workflows')}
        />
      </nav>
    </aside>
  )
}
