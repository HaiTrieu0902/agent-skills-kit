import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllSkills } from '@/lib/content'

export default async function SkillsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('docs')
  const tn = await getTranslations('nav')
  const skills = getAllSkills()

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6 flex items-center gap-1.5">
        <Link href={`/${locale}/docs`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('docs')}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{t('skills_title')}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">{t('skills_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-base leading-relaxed">{t('skills_desc')}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(skill => (
          <Link
            key={skill.slug}
            href={`/${locale}/docs/skills/${skill.slug}`}
            className="group block p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-primary-300)] hover:shadow-sm transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.12)] flex items-center justify-center mb-3 text-[var(--color-primary-500)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors mb-1.5">
              {skill.name}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 leading-relaxed">
              {skill.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
