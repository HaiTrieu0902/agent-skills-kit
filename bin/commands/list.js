'use strict'

const path = require('path')
const fs = require('fs')
const { sep, log, c } = require('../utils/logger')

const PKG_DIR = path.join(__dirname, '../..')

module.exports = function list() {
  const agentsDir = path.join(PKG_DIR, 'agents')

  sep()
  log(`\n  ${c.bold}Available Agents${c.reset}\n`)
  sep()

  if (!fs.existsSync(agentsDir)) {
    log(`  ${c.red}No agents directory found.${c.reset}\n`)
    return
  }

  const slugs = fs.readdirSync(agentsDir).filter(f =>
    fs.statSync(path.join(agentsDir, f)).isDirectory()
  )

  for (const slug of slugs) {
    try {
      const raw = fs.readFileSync(path.join(agentsDir, slug, 'agent.yaml'), 'utf-8')
      const model = (raw.match(/^model:\s*(.+)/m) || [])[1]?.trim() || ''
      const isOpus = model.includes('opus')
      const badge = isOpus
        ? `${c.yellow}◆ Opus${c.reset}`
        : `${c.cyan}● Sonnet${c.reset}`
      log(`  ${c.green}${slug.padEnd(30)}${c.reset}${badge}`)
    } catch {
      log(`  ${c.dim}${slug}${c.reset}`)
    }
  }

  log(`\n  ${c.dim}Total: ${slugs.length} agents${c.reset}\n`)
}
