import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { CodeBlock } from './CodeBlock'

export default async function GuidePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <GuideContent locale={locale} />
}

const Code = CodeBlock

function Badge({ color, children }: { color: 'blue' | 'green' | 'purple' | 'orange'; children: React.ReactNode }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-[var(--color-primary-500)] inline-block shrink-0" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function ExampleCard({
  step,
  prompt,
  agent,
  skills,
  result,
}: {
  step: string
  prompt: string
  agent: string
  skills: string[]
  result: string
}) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--muted)]/40 flex items-center gap-2">
        <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">{step}</span>
      </div>
      <div className="p-5 space-y-4">
        {/* What you type */}
        <div>
          <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">You type in Claude Code / Cursor chat</p>
          <div className="rounded-lg bg-[var(--muted)]/60 border border-[var(--border)] px-4 py-3 font-mono text-sm text-[var(--foreground)] italic">
            &ldquo;{prompt}&rdquo;
          </div>
        </div>
        {/* What happens */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3">
            <p className="text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-1.5">Agent routed</p>
            <code className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)] font-mono text-xs font-bold">{agent}</code>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 sm:col-span-2">
            <p className="text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-1.5">Skills loaded</p>
            <div className="flex flex-wrap gap-1">
              {skills.map(s => (
                <code key={s} className="text-xs bg-[var(--muted)] px-1.5 py-0.5 rounded text-[var(--foreground)]">{s}</code>
              ))}
            </div>
          </div>
        </div>
        {/* Result */}
        <div className="flex gap-2 text-sm text-[var(--muted-foreground)] bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-lg px-4 py-3">
          <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{result}</span>
        </div>
      </div>
    </div>
  )
}

function GuideContent({ locale }: { locale: string }) {
  const toc = [
    { id: 'install', label: '1. Installation' },
    { id: 'activate', label: '2. Activate in your editor' },
    { id: 'how-it-works', label: '3. How auto-routing works' },
    { id: 'examples', label: '4. Real-world examples' },
    { id: 'skill-tree', label: '5. The skill tree' },
    { id: 'slash-commands', label: '6. Slash command workflows' },
    { id: 'direct-invoke', label: '7. Direct invocation' },
    { id: 'quick-ref', label: '8. Quick reference' },
  ]

  return (
    <div className="flex gap-10 max-w-5xl">
      {/* Main content */}
      <article className="flex-1 min-w-0">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-3">
            <Link href={`/${locale}/docs`} className="hover:text-[var(--foreground)] transition-colors">Docs</Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">Getting Started</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">Getting Started</h1>
          <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
            From zero to a fully-loaded AI agent toolkit in under 60 seconds — with real examples for frontend, backend, product ownership, and more.
          </p>
        </div>

        {/* 1. Installation */}
        <Section id="install" title="Installation">
          <p className="text-[var(--muted-foreground)] mb-4 leading-relaxed">
            Run the following command inside your project root. The kit copies <strong>agents/</strong>, <strong>skills/</strong>, <strong>workflows/</strong>, <strong>configs/</strong>, <strong>prompts/</strong>, and <strong>rules/</strong> directly into your working directory.
          </p>
          <Code lang="terminal">npx raffles-it-kit</Code>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">
            No global install needed. Every time you run it, the latest kit is fetched from npm.
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-[var(--foreground)] mb-3">What gets installed:</p>
            <Code lang="your-project/">{`your-project/
├── agents/                  ← 19 specialist agent definitions
│   ├── orchestrator/
│   │   ├── agent.yaml       ← model, tools, skills list
│   │   └── prompt.md        ← system prompt
│   ├── frontend-specialist/
│   ├── backend-specialist/
│   └── ...16 more
├── skills/                  ← 19 modular skill packs
│   ├── react-best-practices/
│   │   └── SKILL.md
│   ├── api-patterns/
│   └── ...17 more
├── workflows/               ← 11 slash command definitions
│   ├── create.md
│   ├── debug.md
│   └── ...9 more
├── configs/                 ← model & runtime config
├── prompts/                 ← shared prompt templates
└── rules/                   ← editor rules (Gemini, etc.)`}</Code>
          </div>
        </Section>

        {/* 2. Activate */}
        <Section id="activate" title="Activate in your editor">
          <div className="space-y-5">

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Badge color="blue">Option A — Project-local</Badge>
                <span className="text-xs text-[var(--muted-foreground)]">Recommended for teams</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                Leave the <code className="bg-[var(--muted)] px-1 rounded text-xs">agents/</code> folder in your project root. Claude Code detects it automatically when you open the project.
              </p>
              <Code lang="terminal">{`# After running npx raffles-it-kit, just open the project:
claude .`}</Code>
              <p className="text-xs text-[var(--muted-foreground)]">
                Agents are scoped to this project only.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Badge color="green">Option B — Global agents</Badge>
                <span className="text-xs text-[var(--muted-foreground)]">Available in every project</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                Copy agents to your global Claude Code config directory to use them across all projects.
              </p>
              <Code lang="terminal">{`# macOS / Linux
cp -r agents/ ~/.claude/agents/

# Windows (PowerShell)
Copy-Item -Recurse agents\\ $env:USERPROFILE\\.claude\\agents\\`}</Code>
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <Badge color="purple">Cursor / Windsurf</Badge>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Place the <code className="bg-[var(--muted)] px-1 rounded text-xs">agents/</code> and <code className="bg-[var(--muted)] px-1 rounded text-xs">skills/</code> folders in your project root. Both editors read markdown-based agent definitions automatically from the workspace.
              </p>
            </div>

          </div>
        </Section>

        {/* 3. How it works */}
        <Section id="how-it-works" title="How auto-routing works">
          <p className="text-[var(--muted-foreground)] mb-5 leading-relaxed">
            You never need to pick an agent manually. When you type a request, the AI reads your message, matches keywords and intent against the agent registry (<code className="bg-[var(--muted)] px-1 rounded text-xs">agents/.agents</code>), and silently loads the right agent and its skill packs.
          </p>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <div className="flex flex-col items-center gap-2 text-sm font-mono">
              {[
                { label: 'Your message', color: 'bg-[var(--color-primary-500)] text-white' },
                { label: '↓', color: 'text-[var(--muted-foreground)]', small: true },
                { label: 'Keyword & intent match', color: 'bg-[var(--muted)] text-[var(--foreground)]' },
                { label: '↓', color: 'text-[var(--muted-foreground)]', small: true },
                { label: 'Agent selected (agent.yaml + prompt.md)', color: 'bg-[var(--muted)] text-[var(--foreground)]' },
                { label: '↓', color: 'text-[var(--muted-foreground)]', small: true },
                { label: 'Skills loaded from SKILL.md files', color: 'bg-[var(--muted)] text-[var(--foreground)]' },
                { label: '↓', color: 'text-[var(--muted-foreground)]', small: true },
                { label: 'Expert-quality response', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
              ].map((item, i) => (
                <div key={i} className={`${item.small ? '' : `px-5 py-2 rounded-lg ${item.color} w-full text-center`} ${item.small ? item.color : ''}`}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-[var(--muted-foreground)] mt-4">
            The <strong>orchestrator</strong> agent handles multi-step tasks that span multiple domains by coordinating sub-agents in parallel.
          </p>
        </Section>

        {/* 4. Real-world examples */}
        <Section id="examples" title="Real-world examples">

          <div className="space-y-6">

            {/* Example 1: Frontend */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge color="blue">Frontend</Badge>
                <span className="text-sm text-[var(--muted-foreground)]">React / Next.js project</span>
              </div>
              <ExampleCard
                step="Example 1"
                prompt="Create a responsive product card component with Tailwind CSS, dark mode support, and hover animations"
                agent="frontend-specialist"
                skills={['react-best-practices', 'tailwind-patterns', 'frontend-design', 'clean-code']}
                result="Delivers a fully-typed React component following Next.js performance rules, Tailwind v4 patterns, and WCAG accessibility guidelines — all from the loaded skill packs."
              />
            </div>

            {/* Example 2: Backend */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge color="green">Backend</Badge>
                <span className="text-sm text-[var(--muted-foreground)]">Node.js / Express / NestJS</span>
              </div>
              <ExampleCard
                step="Example 2"
                prompt="Build a JWT authentication API with refresh tokens, rate limiting, and input validation"
                agent="backend-specialist"
                skills={['api-patterns', 'nodejs-best-practices', 'clean-code', 'lint-and-validate']}
                result="Generates a production-ready auth module with proper token rotation, express-rate-limit setup, zod validation, and error handling — following REST API best practices from the skill files."
              />
            </div>

            {/* Example 3: Database */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge color="purple">Database</Badge>
                <span className="text-sm text-[var(--muted-foreground)]">Prisma / PostgreSQL / SQL</span>
              </div>
              <ExampleCard
                step="Example 3"
                prompt="Design a multi-tenant schema for a SaaS app with row-level security and soft deletes"
                agent="database-architect"
                skills={['database-design', 'clean-code']}
                result="Produces a Prisma schema with tenant isolation, composite indexes, soft-delete patterns, and migration files — applying database normalization and optimization rules from the skill pack."
              />
            </div>

            {/* Example 4: Product Owner */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge color="orange">Product</Badge>
                <span className="text-sm text-[var(--muted-foreground)]">Product Owner / Planning</span>
              </div>
              <ExampleCard
                step="Example 4"
                prompt="Help me prioritize our backlog for the MVP launch. We have 40 tickets and need to ship in 3 weeks"
                agent="product-owner"
                skills={['plan-writing', 'brainstorming']}
                result="Runs a Socratic discovery session to understand value vs effort, then produces a prioritized sprint plan with MoSCoW categorization, acceptance criteria, and a realistic 3-week roadmap."
              />
            </div>

            {/* Example 5: Debugging */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge color="blue">Debugging</Badge>
                <span className="text-sm text-[var(--muted-foreground)]">Root cause analysis</span>
              </div>
              <ExampleCard
                step="Example 5"
                prompt="The login endpoint returns 500 only in production but works fine locally. Help me debug it"
                agent="debugger"
                skills={['systematic-debugging']}
                result="Applies a structured 5-phase debugging protocol: reproduce → isolate → hypothesize → verify → fix. Checks environment differences, missing env vars, database connection limits, and request timeouts."
              />
            </div>

            {/* Example 6: Security */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge color="orange">Security</Badge>
                <span className="text-sm text-[var(--muted-foreground)]">OWASP audit</span>
              </div>
              <ExampleCard
                step="Example 6"
                prompt="Audit my Express API for security vulnerabilities before we go to production"
                agent="security-auditor"
                skills={['clean-code', 'lint-and-validate']}
                result="Scans for OWASP Top 10 issues: SQL injection, XSS, broken auth, insecure deserialization, missing rate limiting, exposed secrets, and improper CORS config — with fix recommendations for each."
              />
            </div>

          </div>
        </Section>

        {/* 5. Skill tree */}
        <Section id="skill-tree" title="The skill tree">
          <p className="text-[var(--muted-foreground)] mb-5 leading-relaxed">
            Skills are <strong>modular knowledge packs</strong>. Each agent lists which skills it uses in its <code className="bg-[var(--muted)] px-1 rounded text-xs">agent.yaml</code>. When an agent is activated, it reads those <code className="bg-[var(--muted)] px-1 rounded text-xs">SKILL.md</code> files and loads their rules, patterns, and scripts into context.
          </p>

          <Code lang="agents/backend-specialist/agent.yaml">{`name: backend-specialist
model: claude-sonnet-4-6
tools:
  - Read
  - Grep
  - Bash
  - Edit
  - Write
skills:
  - clean-code           ← always-on coding standards
  - nodejs-best-practices
  - api-patterns         ← REST/GraphQL/tRPC patterns
  - database-design
  - lint-and-validate`}</Code>

          <Code lang="skills/api-patterns/SKILL.md">{`# API Patterns Skill

## REST Design Rules
- Use noun-based resource URLs (/users, not /getUsers)
- Version APIs with /v1/ prefix
- Return 201 for POST creation, 204 for DELETE
- Always paginate list endpoints with cursor or offset

## Error Response Format
{
  "error": "RESOURCE_NOT_FOUND",
  "message": "User with id 123 does not exist",
  "statusCode": 404
}

## Input Validation
- Validate at controller layer with zod or joi
- Strip unknown fields before DB writes
- Return field-level errors for 422 responses`}</Code>

          <div className="mt-6">
            <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Skill loading flow:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-center">
              {[
                { icon: '📩', label: 'User request', sub: 'You type a message' },
                { icon: '🎯', label: 'Agent matched', sub: 'Based on keywords & intent' },
                { icon: '📚', label: 'Skills loaded', sub: 'SKILL.md files read into context' },
              ].map(item => (
                <div key={item.label} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-medium text-[var(--foreground)]">{item.label}</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg border border-[var(--color-primary-200)] dark:border-[rgba(30,127,203,0.3)] bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.07)] text-sm text-[var(--muted-foreground)]">
            <strong className="text-[var(--foreground)]">Pro tip:</strong> You can edit <code className="bg-[var(--muted)] px-1 rounded text-xs">skills/react-best-practices/SKILL.md</code> to add your team&apos;s own conventions. Every agent that loads that skill will follow them automatically.
          </div>
        </Section>

        {/* 6. Slash commands */}
        <Section id="slash-commands" title="Slash command workflows">
          <p className="text-[var(--muted-foreground)] mb-5 leading-relaxed">
            Workflows are multi-step orchestrated procedures. Invoke them by typing the slash command in Claude Code or your AI editor chat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { cmd: '/create', desc: 'Scaffold a new feature end-to-end. Kicks off planning → design → implementation → tests.', example: '/create user authentication with Google OAuth' },
              { cmd: '/debug', desc: 'Structured root-cause analysis. Isolates the bug, forms hypotheses, verifies fix.', example: '/debug payment webhook failing in production' },
              { cmd: '/plan', desc: 'Breaks down a large task into a prioritized sprint plan with story points.', example: '/plan migrate monolith to microservices' },
              { cmd: '/deploy', desc: 'Pre-flight checks → build → deploy → smoke test. Works with Docker, Vercel, CapRover.', example: '/deploy to production with zero downtime' },
              { cmd: '/test', desc: 'Generates unit, integration, and E2E tests for a given module or PR diff.', example: '/test the auth module' },
              { cmd: '/review', desc: 'Code review against OWASP, performance, readability, and team conventions.', example: '/review src/api/payments.ts' },
              { cmd: '/enhance', desc: 'Improves existing code: performance, readability, type safety, error handling.', example: '/enhance the user service class' },
              { cmd: '/brainstorm', desc: 'Socratic discovery session to explore architecture options or product ideas.', example: '/brainstorm architecture for real-time notifications' },
              { cmd: '/orchestrate', desc: 'Coordinates multiple specialist agents in parallel for complex cross-domain tasks.', example: '/orchestrate build a full SaaS billing system' },
              { cmd: '/status', desc: 'Gives a project health report: test coverage, lint status, open TODOs, security flags.', example: '/status' },
              { cmd: '/ui-ux-pro-max', desc: 'Design mode with 50 UI styles, 21 color palettes, and 50 fonts for rapid prototyping.', example: '/ui-ux-pro-max redesign the dashboard' },
            ].map(wf => (
              <div key={wf.cmd} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] dark:bg-[rgba(30,127,203,0.15)] flex items-center justify-center shrink-0 text-[var(--color-primary-600)] font-bold text-lg">
                    /
                  </div>
                  <div className="min-w-0">
                    <code className="text-sm font-bold text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)]">{wf.cmd}</code>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">{wf.desc}</p>
                    <div className="mt-2 font-mono text-xs text-[var(--muted-foreground)] bg-[var(--muted)]/60 rounded px-2 py-1 truncate">
                      {wf.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. Direct invocation */}
        <Section id="direct-invoke" title="Direct invocation">
          <p className="text-[var(--muted-foreground)] mb-5 leading-relaxed">
            Auto-routing handles most cases, but you can also call any agent or skill by name when you want precise control.
          </p>
          <div className="space-y-3">
            {[
              { label: 'Call an agent directly', example: 'Act as the product-owner agent and help me write user stories for the notifications feature' },
              { label: 'Request a specific skill', example: 'Using the database-design skill, review this Prisma schema for normalization issues' },
              { label: 'Run a workflow explicitly', example: '/orchestrate — I need a frontend-specialist and backend-specialist to build a real-time chat feature together' },
              { label: 'Override the model', example: 'Use the orchestrator agent with Opus 4 to plan this migration strategy end-to-end' },
            ].map(item => (
              <div key={item.label} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">{item.label}</p>
                <div className="font-mono text-sm text-[var(--foreground)] bg-[var(--muted)]/60 rounded px-3 py-2 italic">
                  &ldquo;{item.example}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Quick reference */}
        <Section id="quick-ref" title="Quick reference">
          <p className="text-[var(--muted-foreground)] mb-5">Which agent handles which task:</p>
          <div className="rounded-xl border border-[var(--card-border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/50">
                  <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)]">I need to…</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)]">Agent</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)] hidden sm:table-cell">Key skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  { task: 'Build UI components', agent: 'frontend-specialist', skills: 'react-best-practices, tailwind-patterns' },
                  { task: 'Build a REST / GraphQL API', agent: 'backend-specialist', skills: 'api-patterns, nodejs-best-practices' },
                  { task: 'Design a database schema', agent: 'database-architect', skills: 'database-design' },
                  { task: 'Plan a sprint or backlog', agent: 'product-owner', skills: 'plan-writing, brainstorming' },
                  { task: 'Write product requirements', agent: 'product-manager', skills: 'plan-writing' },
                  { task: 'Debug a production issue', agent: 'debugger', skills: 'systematic-debugging' },
                  { task: 'Write automated tests', agent: 'test-engineer', skills: 'testing-patterns, tdd-workflow' },
                  { task: 'Set up CI/CD or Docker', agent: 'devops-engineer', skills: 'deployment-procedures' },
                  { task: 'Security audit / OWASP', agent: 'security-auditor', skills: 'vulnerability-scanner' },
                  { task: 'Refactor legacy code', agent: 'code-archaeologist', skills: 'clean-code' },
                  { task: 'Analyse the codebase', agent: 'explorer-agent', skills: '(none — pure exploration)' },
                  { task: 'Improve page performance', agent: 'performance-optimizer', skills: 'performance-profiling' },
                  { task: 'Multi-domain complex task', agent: 'orchestrator', skills: 'parallel-agents, behavioral-modes' },
                ].map(row => (
                  <tr key={row.agent} className="hover:bg-[var(--muted)]/30 transition-colors">
                    <td className="px-4 py-3 text-[var(--foreground)]">{row.task}</td>
                    <td className="px-4 py-3">
                      <code className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)] text-xs font-mono">{row.agent}</code>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs hidden sm:table-cell font-mono">{row.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/docs/agents`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-primary-500)] text-white font-medium text-sm hover:bg-[var(--color-primary-600)] transition-colors"
            >
              Browse all agents
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link
              href={`/${locale}/docs/skills`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:bg-[var(--muted)] transition-colors"
            >
              Explore skills
            </Link>
            <Link
              href={`/${locale}/docs/workflows`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:bg-[var(--muted)] transition-colors"
            >
              View workflows
            </Link>
          </div>
        </Section>

      </article>

      {/* Table of contents */}
      <aside className="hidden xl:block w-44 shrink-0">
        <div className="sticky top-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">On this page</p>
          <ul className="space-y-1">
            {toc.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors block py-0.5 leading-relaxed"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

    </div>
  )
}
