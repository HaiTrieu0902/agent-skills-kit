import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllSkills, getSkill } from '@/lib/content'
import ContentRenderer from '@/components/ContentRenderer'

export async function generateStaticParams() {
  return getAllSkills().map(s => ({ slug: s.slug }))
}

export default async function SkillDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const tn = await getTranslations('nav')
  const t = await getTranslations('docs')
  const skill = getSkill(slug)

  if (!skill) notFound()

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href={`/${locale}/docs`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('docs')}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/docs/skills`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('skills')}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{skill.name}</span>
      </nav>

      {/* Description callout (if different from content) */}
      {skill.description && (
        <div className="mb-6 px-4 py-3 rounded-lg border-l-4 border-[var(--color-primary-500)] bg-[var(--color-primary-50)] dark:bg-[rgba(0,105,186,0.08)]">
          <p className="text-sm text-[var(--foreground)] leading-relaxed">{skill.description}</p>
        </div>
      )}

      {/* Rendered SKILL.md */}
      <ContentRenderer content={skill.body} />
    </div>
  )
}
