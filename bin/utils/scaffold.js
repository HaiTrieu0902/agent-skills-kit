'use strict'

const path = require('path')
const fs = require('fs-extra')

/**
 * Generate a package.json in the target directory.
 */
function generatePackageJson(targetDir, projectName) {
  const safeName = projectName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
  const content = {
    name: safeName,
    version: '1.0.0',
    description: `AI agent project scaffolded with create-raffles-it`,
    scripts: {
      start: 'echo "Add your start script here"',
      dev:   'echo "Add your dev script here"',
    },
    keywords: ['ai', 'agents', 'claude', 'create-raffles-it'],
    license: 'MIT',
  }
  fs.writeJsonSync(path.join(targetDir, 'package.json'), content, { spaces: 2 })
}

/**
 * Generate a README.md in the target directory.
 */
function generateReadme(targetDir, projectName) {
  const content = `# ${projectName}

> AI Agent project scaffolded with [Raffles IT Kit](https://raffles-agent-skills-kit.vercel.app/en)

## Getting Started

\`\`\`bash
# Open in Claude Code
claude .

# Or open in Cursor / Windsurf — agents are auto-detected from the workspace
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── agents/        ← 19 specialist AI agent definitions
├── skills/        ← 19 modular skill packs (SKILL.md files)
├── workflows/     ← 11 slash command workflow definitions
├── configs/       ← Model & runtime configuration
├── prompts/       ← Shared prompt templates
└── rules/         ← Editor-specific rules (Gemini, etc.)
\`\`\`

## Usage

Agents are **automatically selected** based on your request. No configuration needed.

\`\`\`
You: "Create a responsive product card with Tailwind CSS and dark mode"
AI:  Routing to frontend-specialist...
     Loading skills: react-best-practices, tailwind-patterns, frontend-design

You: "Build a JWT auth API with refresh tokens and rate limiting"
AI:  Routing to backend-specialist...
     Loading skills: api-patterns, nodejs-best-practices, clean-code

You: "Our login endpoint returns 500 only in production"
AI:  Routing to debugger...
     Loading skills: systematic-debugging
\`\`\`

## Slash Commands

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| \`/create\`        | Scaffold a new feature end-to-end                |
| \`/debug\`         | Structured root-cause analysis                   |
| \`/plan\`          | Break a large task into a sprint plan            |
| \`/test\`          | Generate unit, integration, and E2E tests        |
| \`/review\`        | Code review: OWASP, performance, conventions     |
| \`/deploy\`        | Pre-flight checks → build → deploy → smoke test  |

## Resources

- [Documentation](https://raffles-agent-skills-kit.vercel.app/en)
- [Getting Started Guide](https://raffles-agent-skills-kit.vercel.app/en/docs/guide)
- [npm Package](https://www.npmjs.com/package/create-raffles-it)
- [GitHub](https://github.com/HaiTrieu0902/agent-skills-kit)
`
  fs.writeFileSync(path.join(targetDir, 'README.md'), content)
}

/**
 * Copy a source directory into the target, skipping node_modules and .next.
 */
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0
  fs.ensureDirSync(dest)
  let count = 0
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      count += copyDir(s, d)
    } else {
      fs.copyFileSync(s, d)
      count++
    }
  }
  return count
}

module.exports = { generatePackageJson, generateReadme, copyDir }
