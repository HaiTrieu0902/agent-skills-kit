import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllAgents, getAgent } from '@/lib/content'
import ContentRenderer from '@/components/ContentRenderer'

export async function generateStaticParams() {
  return getAllAgents().map(a => ({ slug: a.slug }))
}

export default async function AgentDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('docs')
  const tn = await getTranslations('nav')
  const agent = getAgent(slug)

  if (!agent) notFound()

  const isOpus = agent.model.includes('opus')

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href={`/${locale}/docs`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('docs')}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/docs/agents`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('agents')}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{agent.name}</span>
      </nav>

      <div className="flex gap-8 items-start">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <ContentRenderer content={agent.prompt} />
        </div>

        {/* Metadata sidebar */}
        <aside className="hidden xl:block w-52 shrink-0 sticky top-20">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-5 text-sm">

            {/* Model */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                {t('model')}
              </p>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  isOpus
                    ? 'bg-purple-50 text-purple-700 dark:bg-[rgba(168,85,247,0.15)] dark:text-purple-300'
                    : 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[rgba(30,127,203,0.15)] dark:text-[var(--color-primary-300)]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isOpus ? 'bg-purple-500' : 'bg-[var(--color-primary-500)]'}`} />
                {isOpus ? 'Opus 4.6' : 'Sonnet 4.6'}
              </span>
            </div>

            {/* Tools */}
            {agent.tools.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                  {t('tools')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {agent.tools.map(tool => (
                    <span
                      key={tool}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)] font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {agent.skills.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                  {t('skills_used')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {agent.skills.map(skill => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded border border-[var(--color-primary-200)] dark:border-[var(--color-primary-800)] text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
