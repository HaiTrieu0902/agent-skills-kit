#!/usr/bin/env node
'use strict'

const pkg = require('../package.json')

const args = process.argv.slice(2)
const cmd  = args[0]

function run(fn) {
  Promise.resolve(fn()).catch(err => {
    console.error('\n  \x1b[31m' + (err.message || err) + '\x1b[0m\n')
    process.exit(1)
  })
}

switch (cmd) {
  case undefined:
    run(() => require('./commands/init')(args))
    break

  case 'init':
    run(() => require('./commands/init')(args.slice(1)))
    break

  case 'list':
    require('./commands/list')()
    break

  case '--version':
  case '-v':
    console.log(pkg.version)
    break

  case 'help':
  case '--help':
  case '-h':
    require('./commands/help')()
    break

  default:
    console.error(`\n  \x1b[31mUnknown command: ${cmd}\x1b[0m\n`)
    require('./commands/help')()
    process.exit(1)
}
