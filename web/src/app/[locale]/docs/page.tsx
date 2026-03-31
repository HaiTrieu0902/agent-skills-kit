import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getAllAgents, getAllSkills, getAllWorkflows } from '@/lib/content'

export default async function DocsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const agents = getAllAgents()
  const skills = getAllSkills()
  const workflows = getAllWorkflows()

  return <DocsIndex locale={locale} counts={{ agents: agents.length, skills: skills.length, workflows: workflows.length }} />
}

function DocsIndex({
  locale,
  counts
}: {
  locale: string
  counts: { agents: number; skills: number; workflows: number }
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('docs')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tn = useTranslations('nav')

  const sections = [
    {
      key: 'agents',
      href: `/${locale}/docs/agents`,
      title: t('agents_title'),
      desc: t('agents_desc'),
      count: counts.agents,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      key: 'skills',
      href: `/${locale}/docs/skills`,
      title: t('skills_title'),
      desc: t('skills_desc'),
      count: counts.skills,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    },
    {
      key: 'workflows',
      href: `/${locale}/docs/workflows`,
      title: t('workflows_title'),
      desc: t('workflows_desc'),
      count: counts.workflows,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      )
    }
  ]

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">{tn('docs')}</h1>
      <p className="text-[var(--muted-foreground)] mb-8 text-lg">
        Browse agents, skills, and workflows for the Raffles IT Kit.
      </p>

      {/* Getting Started — featured card */}
      <Link
        href={`/${locale}/docs/guide`}
        className="group flex items-center gap-5 p-6 rounded-xl border-2 border-[var(--color-primary-200)] dark:border-[rgba(30,127,203,0.4)] bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.07)] hover:border-[var(--color-primary-400)] hover:shadow-md transition-all mb-8"
      >
        <div className="w-14 h-14 rounded-xl bg-[var(--color-primary-500)] flex items-center justify-center shrink-0 text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 8 16 12 12 16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-[var(--color-primary-700)] dark:text-[var(--color-primary-300)] group-hover:text-[var(--color-primary-600)] transition-colors">
              {t('guide_title')}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--color-primary-500)] text-white">Start here</span>
          </div>
          <p className="text-sm text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] leading-relaxed">
            {t('guide_desc')}
          </p>
        </div>
        <svg className="w-5 h-5 text-[var(--color-primary-400)] group-hover:translate-x-1 transition-transform shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sections.map(section => (
          <Link
            key={section.key}
            href={section.href}
            className="group block p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-primary-300)] hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.15)] flex items-center justify-center mb-4 text-[var(--color-primary-500)] group-hover:bg-[var(--color-primary-100)] transition-colors">
              {section.icon}
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors">
                {section.title}
              </h2>
              <span className="text-sm font-medium text-[var(--color-primary-500)] bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.15)] px-2 py-0.5 rounded-full">
                {section.count}
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {section.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
