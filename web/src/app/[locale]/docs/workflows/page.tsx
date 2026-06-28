import Link from 'next/link'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllWorkflows } from '@/lib/content'

export default async function WorkflowsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('docs')
  const tn = await getTranslations('nav')
  const workflows = getAllWorkflows()

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6 flex items-center gap-1.5">
        <Link href={`/${locale}/docs`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('docs')}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{t('workflows_title')}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">{t('workflows_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-base leading-relaxed">{t('workflows_desc')}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workflows.map(wf => (
          <Link
            key={wf.slug}
            href={`/${locale}/docs/workflows/${wf.slug}`}
            className="group flex items-start gap-4 p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-primary-300)] hover:shadow-sm transition-all"
          >
            <div className="w-11 h-11 rounded-lg bg-[var(--color-primary-50)] dark:bg-[rgba(0,105,186,0.12)] flex items-center justify-center shrink-0 text-[var(--color-primary-500)] font-bold text-lg">
              /
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[var(--color-primary-500)] font-mono font-semibold text-sm">/</span>
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary-500)] transition-colors">
                  {wf.name}
                </h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                {wf.description || `Run the /${wf.slug} workflow.`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
