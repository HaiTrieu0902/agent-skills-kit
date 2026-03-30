'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
  slug: string
  name: string
}

interface Props {
  locale: string
  agents: NavItem[]
  skills: NavItem[]
  workflows: NavItem[]
  labels: {
    agents: string
    skills: string
    workflows: string
  }
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Sidebar({ locale, agents, skills, workflows, labels }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState<Record<string, boolean>>({
    agents: true,
    skills: true,
    workflows: true
  })

  function toggleSection(key: string) {
    setOpen(o => ({ ...o, [key]: !o[key] }))
  }

  function NavSection({
    sectionKey,
    title,
    items,
    basePath
  }: {
    sectionKey: string
    title: string
    items: NavItem[]
    basePath: string
  }) {
    const isOpen = open[sectionKey]

    return (
      <div className="mb-5">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5 hover:text-[var(--foreground)] transition-colors px-2 py-1 rounded"
        >
          <span>{title}</span>
          <ChevronIcon open={isOpen} />
        </button>
        {isOpen && (
          <ul className="space-y-0.5">
            {items.map(item => {
              const href = `/${locale}/docs/${basePath}/${item.slug}`
              const active = pathname === href
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    className={`block text-sm px-2 py-1.5 rounded-md transition-colors truncate ${
                      active
                        ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)] font-medium dark:bg-[rgba(30,127,203,0.15)] dark:text-[var(--color-primary-300)]'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }

  return (
    <aside className="w-56 shrink-0 overflow-y-auto py-6 hidden lg:block">
      <nav className="sticky top-20">
        <NavSection
          sectionKey="agents"
          title={labels.agents}
          items={agents}
          basePath="agents"
        />
        <NavSection
          sectionKey="skills"
          title={labels.skills}
          items={skills}
          basePath="skills"
        />
        <NavSection
          sectionKey="workflows"
          title={labels.workflows}
          items={workflows}
          basePath="workflows"
        />
      </nav>
    </aside>
  )
}
