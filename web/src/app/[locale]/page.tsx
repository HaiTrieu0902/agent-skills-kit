import Link from 'next/link'
import Image from 'next/image'
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

      {/* Installation section */}
      <section className="border-b border-[var(--border)] bg-[var(--muted)]/30">
        <div className="max-w-screen-xl mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">{t('install_title')}</h2>
            <p className="text-[var(--muted-foreground)]">{t('install_desc')}</p>
          </div>
          <div className="max-w-xl mx-auto">
            {/* npx command block */}
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden mb-6">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--muted)]/50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <span className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <span className="text-xs text-[var(--muted-foreground)] font-mono">terminal</span>
              </div>
              <div className="px-5 py-4 font-mono text-sm">
                <span className="text-[var(--color-primary-400)] select-none">$ </span>
                <span className="text-[var(--foreground)]">npx raffles-it-kit</span>
              </div>
            </div>

            {/* Steps */}
            <ol className="space-y-3">
              {[t('install_step1'), t('install_step2'), t('install_step3')].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted-foreground)]">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-primary-500)] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <p className="mt-6 text-xs text-[var(--muted-foreground)] text-center">
              <span className="font-medium">{t('install_manual')}</span> — {t('install_manual_desc')}
            </p>
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

      {/* GitHub + Donate section */}
      <section className="border-t border-[var(--border)] bg-[var(--muted)]/30">
        <div className="max-w-screen-xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* GitHub CTA */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-[var(--card)] border border-[var(--card-border)] flex items-center justify-center mb-4 text-[var(--foreground)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">{t('github_title')}</h2>
              <p className="text-[var(--muted-foreground)] mb-5 text-sm">{t('github_desc')}</p>
              <a
                href="https://github.com/HaiTrieu0902/agent-skills-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                {t('view_source')}
              </a>
            </div>

          </div>
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
