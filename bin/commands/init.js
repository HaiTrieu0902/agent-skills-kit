'use strict'

const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const { sep, banner, success, info, warn, log, dim, c } = require('../utils/logger')
const { generatePackageJson, generateReadme, copyDir } = require('../utils/scaffold')

const PKG_DIR = path.join(__dirname, '../..')

const SCAFFOLD_TYPES = {
  full: {
    label: 'Full project  (agents + skills + workflows + configs + prompts + rules)',
    dirs:   ['agents', 'configs', 'prompts', 'rules', 'skills', 'workflows'],
    extras: ['package.json', 'README.md'],
  },
  agents: {
    label: 'Only agents  (agent definitions only)',
    dirs:   ['agents'],
    extras: [],
  },
  skills: {
    label: 'Only skills  (SKILL.md packs only)',
    dirs:   ['skills'],
    extras: [],
  },
}

module.exports = async function init(args) {
  banner()

  // ── 1. Project name ──────────────────────────────────────────────────────
  let projectName = args[0]

  if (!projectName) {
    const answer = await inquirer.prompt([{
      type:     'input',
      name:     'projectName',
      message:  'Project name:',
      default:  'my-ai-project',
      validate: v => v.trim().length > 0 ? true : 'Project name cannot be empty',
    }])
    projectName = answer.projectName.trim()
  }

  // ── 2. What to scaffold ──────────────────────────────────────────────────
  const { scaffoldKey } = await inquirer.prompt([{
    type:    'list',
    name:    'scaffoldKey',
    message: 'What do you want to create?',
    choices: Object.entries(SCAFFOLD_TYPES).map(([value, { label }]) => ({
      name: label,
      value,
    })),
  }])

  const config = SCAFFOLD_TYPES[scaffoldKey]
  const target = path.join(process.cwd(), projectName)

  // ── 3. Overwrite check ───────────────────────────────────────────────────
  if (fs.existsSync(target)) {
    const { overwrite } = await inquirer.prompt([{
      type:    'confirm',
      name:    'overwrite',
      message: `Directory "${projectName}" already exists. Overwrite it?`,
      default: false,
    }])
    if (!overwrite) {
      warn('Aborted — nothing was changed.')
      process.exit(0)
    }
  }

  // ── 4. Scaffold ──────────────────────────────────────────────────────────
  log()
  sep()
  log()

  info(`Creating project "${c.bold}${projectName}${c.reset}"...`)
  fs.ensureDirSync(target)
  success('Directory created')

  for (const dir of config.dirs) {
    info(`Copying ${dir}/...`)
    const src  = path.join(PKG_DIR, dir)
    const dest = path.join(target, dir)
    if (fs.existsSync(src)) {
      const n = copyDir(src, dest)
      success(`${dir}/ copied  ${c.dim}(${n} files)${c.reset}`)
    } else {
      warn(`${dir}/ not found in package — skipping`)
    }
  }

  if (config.extras.includes('package.json')) {
    info('Generating package.json...')
    generatePackageJson(target, projectName)
    success('package.json generated')
  }

  if (config.extras.includes('README.md')) {
    info('Generating README.md...')
    generateReadme(target, projectName)
    success('README.md generated')
  }

  // ── 5. Done ──────────────────────────────────────────────────────────────
  log()
  sep()
  log()
  log(`  ${c.bold}${c.green}✔ Done!${c.reset}  "${projectName}" is ready.\n`)

  log(`  ${c.bold}Next steps:${c.reset}\n`)
  log(`    ${c.cyan}cd ${projectName}${c.reset}`)

  if (scaffoldKey === 'full') {
    log(`\n    Open in Claude Code:`)
    log(`    ${c.cyan}claude .${c.reset}\n`)
    log(`    Or open in Cursor / Windsurf — agents are auto-detected.`)
  }

  log()
  dim(`Docs  https://raffles-agent-skills-kit.vercel.app/en`)
  log()
}
