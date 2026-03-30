import { getAllAgents, getAllSkills, getAllWorkflows } from '@/lib/content'
import Sidebar from './Sidebar'
import { getTranslations } from 'next-intl/server'

interface Props {
  children: React.ReactNode
  locale: string
}

export default async function DocLayout({ children, locale }: Props) {
  const t = await getTranslations('nav')

  const agents = getAllAgents().map(a => ({ slug: a.slug, name: a.name }))
  const skills = getAllSkills().map(s => ({ slug: s.slug, name: s.name }))
  const workflows = getAllWorkflows().map(w => ({ slug: w.slug, name: w.name }))

  return (
    <div className="flex gap-6 max-w-screen-xl mx-auto px-4 py-6 min-h-[calc(100vh-3.5rem)]">
      <Sidebar
        locale={locale}
        agents={agents}
        skills={skills}
        workflows={workflows}
        labels={{
          agents: t('agents'),
          skills: t('skills'),
          workflows: t('workflows')
        }}
      />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}
