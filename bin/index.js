#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const PKG_DIR = path.join(__dirname, '..')
const CWD = process.cwd()

const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  white:  '\x1b[97m',
}

const log = (msg, ...styles) => console.log(styles.join('') + msg + c.reset)
const sep = () => log('─'.repeat(52), c.dim)

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0
  fs.mkdirSync(dest, { recursive: true })
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

function showHelp() {
  sep()
  log('  Raffles IT Kit — CLI', c.bold + c.blue)
  sep()
  log('\n  Usage:', c.bold)
  log('    npx raffles-it-kit           Init kit in current directory')
  log('    npx raffles-it-kit init      Same as above')
  log('    npx raffles-it-kit list      List all available agents')
  log('    npx raffles-it-kit help      Show this help\n')
  log('  More info:', c.dim)
  log('    https://github.com/HaiTrieu0902/agent-skills-kit\n', c.cyan)
}

function showList() {
  const agentsDir = path.join(PKG_DIR, 'agents')
  if (!fs.existsSync(agentsDir)) { log('No agents found.', c.red); return }

  log('\n  Available Agents:', c.bold + c.blue)
  sep()
  const yaml = require('./yaml-mini')
  for (const slug of fs.readdirSync(agentsDir).filter(f =>
    fs.statSync(path.join(agentsDir, f)).isDirectory()
  )) {
    try {
      const raw = fs.readFileSync(path.join(agentsDir, slug, 'agent.yaml'), 'utf-8')
      const name = (raw.match(/^name:\s*(.+)/m) || [])[1] || slug
      const model = (raw.match(/^model:\s*(.+)/m) || [])[1] || ''
      const isOpus = model.includes('opus')
      log(`  ${c.green}${slug.padEnd(28)}${c.reset}${isOpus ? c.yellow + '◆ Opus' : c.cyan + '● Sonnet'}`)
    } catch {
      log(`  ${slug}`, c.dim)
    }
  }
  log('')
}

async function init() {
  console.clear()
  sep()
  log(`\n  🚀 Raffles IT Kit  v${require('../package.json').version}`, c.bold + c.blue)
  log('  AI Agent Enhancement Toolkit\n', c.dim)
  sep()

  if (CWD === PKG_DIR) {
    log('\n  ⚠  Run this from your project directory, not the kit itself.\n', c.yellow)
    process.exit(1)
  }

  log('\n  Installing into: ' + CWD, c.dim)
  log('')

  const dirs = [
    { src: 'agents',    label: 'agents/    — 18 specialist agents' },
    { src: 'skills',    label: 'skills/    — 19 skill modules' },
    { src: 'workflows', label: 'workflows/ — 11 slash commands' },
    { src: 'configs',   label: 'configs/   — model & runtime config' },
    { src: 'prompts',   label: 'prompts/   — shared prompt templates' },
    { src: 'rules',     label: 'rules/     — editor rules (Gemini etc.)' },
  ]

  let total = 0
  for (const { src, label } of dirs) {
    const n = copyDir(path.join(PKG_DIR, src), path.join(CWD, src))
    total += n
    log(`  ${c.green}✓${c.reset}  ${label}`)
  }

  log('')
  sep()
  log(`\n  ✅  Done! ${total} files installed.\n`, c.bold + c.green)

  log('  Next steps:', c.bold)
  log('')
  log(`  1. Open your project in ${c.cyan}Claude Code${c.reset}, Cursor, or Windsurf`)
  log(`  2. Agents auto-route based on task keywords`)
  log(`  3. Use slash commands from ${c.cyan}workflows/${c.reset}:`)
  log(`       /create  /debug  /deploy  /test  /plan  /review`)
  log('')
  log(`  4. Claude Code: Place ${c.cyan}agents/${c.reset} in your project root`)
  log(`     or copy to ${c.cyan}.claude/agents/${c.reset} for global use`)
  log('')
  sep()
  log('')
  log(`  📚 Docs   https://github.com/HaiTrieu0902/agent-skills-kit`, c.cyan)
  log(`  ⭐ Star it if useful!`, c.dim)
  log('')
}

const cmd = process.argv[2] || 'init'
switch (cmd) {
  case 'init':    init().catch(e => { console.error(e); process.exit(1) }); break
  case 'list':    showList(); break
  case 'help':
  case '--help':
  case '-h':      showHelp(); break
  default:
    log(`\n  Unknown command: ${cmd}`, c.red)
    showHelp()
    process.exit(1)
}
