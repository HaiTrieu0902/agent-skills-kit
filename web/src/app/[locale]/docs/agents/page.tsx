import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllAgents } from '@/lib/content'

export default async function AgentsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('docs')
  const tn = await getTranslations('nav')
  const agents = getAllAgents()

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6 flex items-center gap-1.5">
        <Link href={`/${locale}/docs`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('docs')}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{t('agents_title')}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">{t('agents_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-base leading-relaxed">{t('agents_desc')}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map(agent => (
          <Link
            key={agent.slug}
            href={`/${locale}/docs/agents/${agent.slug}`}
            className="group block p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-primary-300)] hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors leading-tight">
                {agent.name}
              </h3>
              <ModelBadge model={agent.model} />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed mb-3">
              {agent.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
                {agent.tools.length} tools
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {agent.skills.length} skills
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ModelBadge({ model }: { model: string }) {
  const isOpus = model.includes('opus')
  return (
    <span
      className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
        isOpus
          ? 'bg-purple-50 text-purple-700 dark:bg-[rgba(168,85,247,0.15)] dark:text-purple-300'
          : 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[rgba(0,105,186,0.15)] dark:text-[var(--color-primary-300)]'
      }`}
    >
      {isOpus ? 'Opus 4.6' : 'Sonnet 4.6'}
    </span>
  )
}
