'use strict'

const pkg = require('../../package.json')

const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
}

const sep = () => console.log(c.dim + '─'.repeat(56) + c.reset)

const banner = () => {
  sep()
  console.log(`\n  ${c.bold}${c.blue}Raffles IT Kit${c.reset}  ${c.dim}v${pkg.version}${c.reset}`)
  console.log(`  ${c.dim}AI Agent Enhancement Toolkit${c.reset}\n`)
  sep()
}

const success = (msg) => console.log(`  ${c.green}✔${c.reset}  ${msg}`)
const info    = (msg) => console.log(`  ${c.blue}◆${c.reset}  ${msg}`)
const warn    = (msg) => console.log(`  ${c.yellow}⚠${c.reset}  ${msg}`)
const error   = (msg) => console.log(`  ${c.red}✖${c.reset}  ${msg}`)
const log     = (msg = '') => console.log(msg)
const dim     = (msg) => console.log(`  ${c.dim}${msg}${c.reset}`)

module.exports = { sep, banner, success, info, warn, error, log, dim, c }
