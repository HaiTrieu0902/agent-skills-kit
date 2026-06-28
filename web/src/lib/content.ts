import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const ROOT = path.join(process.cwd(), '..')

/** Short display label for a Claude model id (e.g. "Opus 4.8"). */
export function modelLabel(model: string): string {
  if (model.includes('fable')) return 'Fable 5'
  if (model.includes('opus')) return 'Opus 4.8'
  if (model.includes('haiku')) return 'Haiku 4.5'
  return 'Sonnet 4.6'
}

/** Premium tiers get the accent (purple) badge treatment. */
export function isPremiumModel(model: string): boolean {
  return model.includes('opus') || model.includes('fable')
}

export interface AgentMeta {
  slug: string
  name: string
  description: string
  model: string
  tools: string[]
  skills: string[]
}

export interface AgentFull extends AgentMeta {
  prompt: string
}

export interface SkillMeta {
  slug: string
  name: string
  description: string
}

export interface SkillFull extends SkillMeta {
  body: string
}

export interface WorkflowMeta {
  slug: string
  name: string
  description: string
}

export interface WorkflowFull extends WorkflowMeta {
  body: string
}

export function getAllAgents(): AgentMeta[] {
  const agentsDir = path.join(ROOT, 'agents')
  if (!fs.existsSync(agentsDir)) return []
  const slugs = fs.readdirSync(agentsDir).filter(f =>
    fs.statSync(path.join(agentsDir, f)).isDirectory()
  )
  return slugs.map(slug => {
    const yamlPath = path.join(agentsDir, slug, 'agent.yaml')
    if (!fs.existsSync(yamlPath)) return null
    const raw = fs.readFileSync(yamlPath, 'utf-8')
    const data = yaml.load(raw) as Record<string, unknown>
    return {
      slug,
      name: (data.name as string) || slug,
      description: (data.description as string) || '',
      model: (data.model as string) || 'claude-sonnet-4-6',
      tools: (data.tools as string[]) || [],
      skills: (data.skills as string[]) || []
    }
  }).filter(Boolean).sort((a, b) => a!.name.localeCompare(b!.name)) as AgentMeta[]
}

export function getAgent(slug: string): AgentFull | null {
  const agentsDir = path.join(ROOT, 'agents')
  const yamlPath = path.join(agentsDir, slug, 'agent.yaml')
  const promptPath = path.join(agentsDir, slug, 'prompt.md')
  if (!fs.existsSync(yamlPath)) return null
  const raw = fs.readFileSync(yamlPath, 'utf-8')
  const data = yaml.load(raw) as Record<string, unknown>
  const prompt = fs.existsSync(promptPath) ? fs.readFileSync(promptPath, 'utf-8') : ''
  return {
    slug,
    name: (data.name as string) || slug,
    description: (data.description as string) || '',
    model: (data.model as string) || 'claude-sonnet-4-6',
    tools: (data.tools as string[]) || [],
    skills: (data.skills as string[]) || [],
    prompt
  }
}

export function getAllSkills(): SkillMeta[] {
  const skillsDir = path.join(ROOT, 'skills')
  if (!fs.existsSync(skillsDir)) return []
  const slugs = fs.readdirSync(skillsDir).filter(f =>
    fs.statSync(path.join(skillsDir, f)).isDirectory()
  )
  return slugs.map(slug => {
    const skillPath = path.join(skillsDir, slug, 'SKILL.md')
    if (!fs.existsSync(skillPath)) {
      return { slug, name: slug, description: '' }
    }
    const { data } = matter(fs.readFileSync(skillPath, 'utf-8'))
    return {
      slug,
      name: (data.name as string) || slug,
      description: (data.description as string) || ''
    }
  }).sort((a, b) => a.name.localeCompare(b.name))
}

export function getSkill(slug: string): SkillFull | null {
  const skillsDir = path.join(ROOT, 'skills')
  const skillPath = path.join(skillsDir, slug, 'SKILL.md')
  if (!fs.existsSync(skillPath)) return null
  const raw = fs.readFileSync(skillPath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    name: (data.name as string) || slug,
    description: (data.description as string) || '',
    body: content
  }
}

export function getAllWorkflows(): WorkflowMeta[] {
  const workflowsDir = path.join(ROOT, 'workflows')
  if (!fs.existsSync(workflowsDir)) return []
  const files = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.md'))
  return files.map(file => {
    const slug = file.replace('.md', '')
    const raw = fs.readFileSync(path.join(workflowsDir, file), 'utf-8')
    const { data } = matter(raw)
    const name = slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    return {
      slug,
      name,
      description: (data.description as string) || ''
    }
  }).sort((a, b) => a.slug.localeCompare(b.slug))
}

export function getWorkflow(slug: string): WorkflowFull | null {
  const workflowsDir = path.join(ROOT, 'workflows')
  const filePath = path.join(workflowsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const name = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return {
    slug,
    name,
    description: (data.description as string) || '',
    body: content
  }
}
