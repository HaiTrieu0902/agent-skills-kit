'use strict'

const { sep, log, c } = require('../utils/logger')

module.exports = function help() {
  sep()
  log(`\n  ${c.bold}Usage:${c.reset}\n`)
  log(`    npx create-raffles-it-kit                     Interactive project setup`)
  log(`    npx create-raffles-it-kit init                Same as above`)
  log(`    npx create-raffles-it-kit init ${c.cyan}<name>${c.reset}          Init with project name`)
  log(`    npx create-raffles-it-kit list                List all available agents`)
  log(`    npx create-raffles-it-kit help                Show this help`)
  log(`    npx create-raffles-it-kit --version           Show version`)
  log(`\n  ${c.bold}Examples:${c.reset}\n`)
  log(`    npx create-raffles-it-kit init my-saas-app`)
  log(`    npx create-raffles-it-kit init`)
  log(`\n  ${c.bold}Docs:${c.reset}\n`)
  log(`    ${c.cyan}https://raffles-agent-skills-kit.vercel.app/en${c.reset}\n`)
}
