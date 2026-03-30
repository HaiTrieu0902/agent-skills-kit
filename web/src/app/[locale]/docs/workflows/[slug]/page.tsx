import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getAllWorkflows, getWorkflow } from '@/lib/content'
import ContentRenderer from '@/components/ContentRenderer'

export async function generateStaticParams() {
  return getAllWorkflows().map(w => ({ slug: w.slug }))
}

export default async function WorkflowDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const tn = await getTranslations('nav')
  const workflow = getWorkflow(slug)

  if (!workflow) notFound()

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href={`/${locale}/docs`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('docs')}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/docs/workflows`} className="hover:text-[var(--foreground)] transition-colors">
          {tn('workflows')}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{workflow.name}</span>
      </nav>

      {/* Workflow header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.12)] flex items-center justify-center text-[var(--color-primary-500)] font-bold text-xl">
          /
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-primary-500)] font-mono font-semibold">/</span>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{workflow.name}</h1>
          </div>
          {workflow.description && (
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{workflow.description}</p>
          )}
        </div>
      </div>

      {/* Usage hint */}
      <div className="mb-6 p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm">
        <span className="text-[var(--muted-foreground)]">Run with: </span>
        <code className="font-mono text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)] font-semibold">
          /{workflow.slug}
        </code>
      </div>

      {/* Rendered workflow content */}
      <ContentRenderer content={workflow.body} />
    </div>
  )
}
