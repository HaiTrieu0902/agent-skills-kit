import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getAllAgents, getAllSkills, getAllWorkflows, modelLabel } from '@/lib/content'

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
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-surface text-white">
        <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" aria-hidden="true" />
        <div className="relative max-w-screen-xl mx-auto px-4 pt-20 pb-24 sm:pt-24 sm:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="reveal inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur"
              style={{ animationDelay: '0ms' }}
            >
              <span className="live-dot inline-block h-2 w-2 rounded-full bg-[#1fba00]" aria-hidden="true" />
              {t('hero_subtitle')}
            </div>

            <h1
              className="reveal mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]"
              style={{ animationDelay: '80ms' }}
            >
              {t('hero_title')}
            </h1>

            <p
              className="reveal mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75"
              style={{ animationDelay: '160ms' }}
            >
              {t('hero_description')}
            </p>

            {/* Signature: the command that starts everything */}
            <div className="reveal mx-auto mt-9 max-w-xl text-left" style={{ animationDelay: '240ms' }}>
              <div className="rounded-xl border border-white/15 bg-[#06102e]/85 shadow-2xl backdrop-blur overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="ml-2 font-mono-stack text-xs text-white/40">install</span>
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-4 font-mono-stack text-sm">
                  <code className="text-white">
                    <span className="text-[#3ddc6b] select-none">$ </span>npx create-raffles-it-kit
                  </code>
                  <span className="shrink-0 text-[11px] text-white/35">one command</span>
                </div>
              </div>
            </div>

            <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '320ms' }}>
              <Link
                href={`/${locale}/docs/agents`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 font-semibold text-[#000080] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t('explore_agents')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <a
                href="https://www.npmjs.com/package/create-raffles-it-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-2.5 font-medium text-white transition-colors hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
                </svg>
                npm package
              </a>
            </div>

            {/* Proof: live inventory */}
            <div
              className="reveal mt-12 inline-flex items-stretch divide-x divide-white/15 rounded-xl border border-white/15 bg-white/5"
              style={{ animationDelay: '400ms' }}
            >
              {[
                { n: agents.length, label: 'agents' },
                { n: skills.length, label: 'skills' },
                { n: workflows.length, label: 'workflows' }
              ].map(({ n, label }) => (
                <div key={label} className="px-6 py-3 text-center">
                  <div className="font-mono-stack text-2xl font-bold text-white">{n}</div>
                  <div className="mt-0.5 text-xs uppercase tracking-wider text-white/55">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Get started ──────────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--muted)]/30">
        <div className="max-w-screen-xl mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <p className="font-mono-stack text-xs uppercase tracking-[0.2em] text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)]">
              {t('install_title')}
            </p>
            <p className="mt-2 text-[var(--muted-foreground)]">{t('install_desc')}</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
            {[t('install_step1'), t('install_step2'), t('install_step3')].map((step, i) => (
              <li
                key={i}
                className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)]"
              >
                <span className="font-mono-stack text-sm font-bold text-[var(--color-primary-500)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
            <span className="font-medium">{t('install_manual')}</span> — {t('install_manual_desc')}
          </p>
        </div>
      </section>

      {/* ── Agents ───────────────────────────────────────────────────── */}
      <Section
        eyebrow="Agents"
        title={t('section_agents')}
        desc={t('section_agents_desc')}
        href={`/${locale}/docs/agents`}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.slice(0, 6).map(agent => (
            <Link
              key={agent.slug}
              href={`/${locale}/docs/agents/${agent.slug}`}
              className="lift group block rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)] hover:border-[var(--color-primary-300)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-50)] text-[var(--color-primary-600)] dark:bg-[rgba(0,105,186,0.15)] dark:text-[var(--color-primary-300)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span className="font-mono-stack rounded-full bg-[var(--muted)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--muted-foreground)]">
                  {modelLabel(agent.model)}
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--color-primary-600)] dark:group-hover:text-[var(--color-primary-300)]">
                {agent.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {agent.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Skills ───────────────────────────────────────────────────── */}
      <div className="bg-[var(--muted)]/40 border-y border-[var(--border)]">
        <Section
          eyebrow="Skills"
          title={t('section_skills')}
          desc={t('section_skills_desc')}
          href={`/${locale}/docs/skills`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.slice(0, 8).map(skill => (
              <Link
                key={skill.slug}
                href={`/${locale}/docs/skills/${skill.slug}`}
                className="lift group block rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-4 shadow-[var(--shadow-sm)] hover:border-[var(--color-primary-300)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] dark:bg-[rgba(0,105,186,0.15)] dark:text-[var(--color-primary-300)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--color-primary-600)] dark:group-hover:text-[var(--color-primary-300)]">
                  {skill.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  {skill.description}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* ── Workflows ────────────────────────────────────────────────── */}
      <Section
        eyebrow="Workflows"
        title={t('section_workflows')}
        desc={t('section_workflows_desc')}
        href={`/${locale}/docs/workflows`}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {workflows.map(wf => (
            <Link
              key={wf.slug}
              href={`/${locale}/docs/workflows/${wf.slug}`}
              className="lift group flex flex-col items-center gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-center shadow-[var(--shadow-sm)] hover:border-[var(--color-primary-300)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-50)] font-mono-stack text-lg font-bold text-[var(--color-primary-600)] dark:bg-[rgba(0,105,186,0.15)] dark:text-[var(--color-primary-300)]">
                /
              </span>
              <span className="font-mono-stack text-sm font-medium text-[var(--foreground)] transition-colors group-hover:text-[var(--color-primary-600)] dark:group-hover:text-[var(--color-primary-300)]">
                {wf.slug}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] py-10">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-3 text-center text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
            Raffles IT Kit
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="https://www.npmjs.com/package/create-raffles-it-kit" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              npm
            </a>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/HaiTrieu0902/agent-skills-kit" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Section({
  eyebrow,
  title,
  desc,
  href,
  children
}: {
  eyebrow: string
  title: string
  desc: string
  href: string
  children: React.ReactNode
}) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono-stack text-xs uppercase tracking-[0.2em] text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)]">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[var(--foreground)]">{title}</h2>
          <p className="mt-1 text-[var(--muted-foreground)]">{desc}</p>
        </div>
        <Link
          href={href}
          className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] hover:underline dark:text-[var(--color-primary-300)]"
        >
          View all
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
      {children}
    </section>
  )
}
