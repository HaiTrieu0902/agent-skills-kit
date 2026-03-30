import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getAllAgents, getAllSkills, getAllWorkflows } from '@/lib/content'

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const agents = getAllAgents()
  const skills = getAllSkills()
  const workflows = getAllWorkflows()

  return <HomePageContent locale={locale} agents={agents} skills={skills} workflows={workflows} />
}

function HomePageContent({
  locale,
  agents,
  skills,
  workflows
}: {
  locale: string
  agents: { slug: string; name: string; description: string; model: string }[]
  skills: { slug: string; name: string; description: string }[]
  workflows: { slug: string; name: string; description: string }[]
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('home')

  return (
    <div>
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--background)]">
        <div className="dark:from-[rgba(30,127,203,0.08)] dark:to-transparent max-w-screen-xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--color-primary-100)] text-[var(--color-primary-700)] dark:bg-[rgba(30,127,203,0.15)] dark:text-[var(--color-primary-300)] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
              <line x1="12" y1="22" x2="12" y2="15.5"/>
              <polyline points="22 8.5 12 15.5 2 8.5"/>
            </svg>
            {t('hero_subtitle')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--foreground)]">
            <span className="text-[var(--color-primary-500)]">{t('hero_title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero_description')}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/docs/agents`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-primary-500)] text-white font-medium hover:bg-[var(--color-primary-600)] transition-colors"
            >
              {t('explore_agents')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link
              href={`/${locale}/docs/skills`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors"
            >
              {t('explore_skills')}
            </Link>
            <Link
              href={`/${locale}/docs/workflows`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors"
            >
              {t('explore_workflows')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center mt-12 text-sm text-[var(--muted-foreground)]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary-500)]">{agents.length}</div>
              <div>Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary-500)]">{skills.length}</div>
              <div>Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-primary-500)]">{workflows.length}</div>
              <div>Workflows</div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents section */}
      <section className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t('section_agents')}</h2>
            <p className="text-[var(--muted-foreground)] mt-1">{t('section_agents_desc')}</p>
          </div>
          <Link
            href={`/${locale}/docs/agents`}
            className="text-sm text-[var(--color-primary-500)] hover:underline font-medium flex items-center gap-1"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.slice(0, 6).map(agent => (
            <Link
              key={agent.slug}
              href={`/${locale}/docs/agents/${agent.slug}`}
              className="group block p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-primary-200)] hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.15)] flex items-center justify-center shrink-0 text-[var(--color-primary-500)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors truncate">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Skills section */}
      <section className="bg-[var(--muted)]/50 border-y border-[var(--border)]">
        <div className="max-w-screen-xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">{t('section_skills')}</h2>
              <p className="text-[var(--muted-foreground)] mt-1">{t('section_skills_desc')}</p>
            </div>
            <Link
              href={`/${locale}/docs/skills`}
              className="text-sm text-[var(--color-primary-500)] hover:underline font-medium flex items-center gap-1"
            >
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skills.slice(0, 8).map(skill => (
              <Link
                key={skill.slug}
                href={`/${locale}/docs/skills/${skill.slug}`}
                className="group block p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-primary-200)] hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.15)] flex items-center justify-center mb-3 text-[var(--color-primary-500)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <h3 className="font-medium text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors text-sm">
                  {skill.name}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows section */}
      <section className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t('section_workflows')}</h2>
            <p className="text-[var(--muted-foreground)] mt-1">{t('section_workflows_desc')}</p>
          </div>
          <Link
            href={`/${locale}/docs/workflows`}
            className="text-sm text-[var(--color-primary-500)] hover:underline font-medium flex items-center gap-1"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {workflows.map(wf => (
            <Link
              key={wf.slug}
              href={`/${locale}/docs/workflows/${wf.slug}`}
              className="group block p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-primary-200)] hover:shadow-sm transition-all text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.15)] flex items-center justify-center mx-auto mb-2 text-[var(--color-primary-500)]">
                <span className="text-lg font-bold">/</span>
              </div>
              <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors">
                {wf.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-screen-xl mx-auto px-4 text-center text-sm text-[var(--muted-foreground)]">
          <p>Raffles IT Kit — AI Agent Enhancement Toolkit</p>
        </div>
      </footer>
    </div>
  )
}
