'use strict'

const { sep, log, c } = require('../utils/logger')

module.exports = function help() {
  sep()
  log(`\n  ${c.bold}Usage:${c.reset}\n`)
  log(`    npx create-raffles-it                     Interactive project setup`)
  log(`    npx create-raffles-it init                Same as above`)
  log(`    npx create-raffles-it init ${c.cyan}<name>${c.reset}          Init with project name`)
  log(`    npx create-raffles-it list                List all available agents`)
  log(`    npx create-raffles-it help                Show this help`)
  log(`    npx create-raffles-it --version           Show version`)
  log(`\n  ${c.bold}Examples:${c.reset}\n`)
  log(`    npx create-raffles-it init my-saas-app`)
  log(`    npx create-raffles-it init`)
  log(`\n  ${c.bold}Docs:${c.reset}\n`)
  log(`    ${c.cyan}https://raffles-agent-skills-kit.vercel.app/en${c.reset}\n`)
}
