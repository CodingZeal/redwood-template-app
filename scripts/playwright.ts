#!/usr/bin/env ts-node

/*
  usage: ./scripts/playwright.ts [options]
  alias: yarn test:e2e [options]

  options:
    --reset : resets the database
    --init : runs migrations
    --playwright : passes all of playwrights configs through
    --debug : enable playwright debug
*/
import { execSync, spawn, SpawnOptionsWithoutStdio } from 'child_process'
import { argv } from 'node:process'

const DATABASE_URL = 'postgresql://postgres:test@localhost:5433/redwood_test'
process.env.DATABASE_URL = DATABASE_URL

const shellenv: Record<string, string> = {
  ...process.env,
  DATABASE_URL,
}

const PLAYWRIGHT_COMMAND =
  'npx playwright test -c web/playwright.config.ts --trace on --reporter=list'

;(async () => {
  if (process.env.CI) {
    const [command, ...rest] = PLAYWRIGHT_COMMAND.split(' ')
    return _rawExec(command, rest, {
      env: shellenv,
    })
  }
  _checkDocker()
  _stopRemoveContainer()

  if (_shouldReset()) {
    _resetDatabase()
  } else {
    _startContainer()
  }

  _runPlaywright()
})()

function _checkDocker() {
  try {
    // need a command that doesn't use stderr (like --version does)
    _containerName()
  } catch (e) {
    console.error('Is docker running?')
    console.error({ e })
    process.exit(1)
  }
}

function _stopRemoveContainer() {
  _exec('docker compose rm -sf testdb')
}

function _startContainer() {
  _exec('docker compose up -d testdb')
}

function _removeContainer() {
  _exec('docker compose rm -sf testdb')
}

function _getVolume() {
  return _exec(
    'docker volume ls --filter name=redwood_test --format "{{.Name}}"'
  )
}

function _removeVolume() {
  const volume = _getVolume()
  if (volume) {
    _exec(`docker volume rm ${volume}`)
  }
}

function _resetDatabase() {
  console.log('Resetting database...')
  _destroy()
  _startContainer()
  _buildRedwood()
  _migrate()
  _seed()
}

function _buildRedwood() {
  console.log('Building redwood...')
  _exec('yarn rw build')
}

function _destroy() {
  _removeContainer()
  _removeVolume()
}

function _shouldReset() {
  return argv.includes('--reset') || argv.includes('--init')
}

function _migrate() {
  _exec('yarn rw prisma db push')
}

function _seed() {
  _exec('yarn rw prisma db seed')
}

function _containerName() {
  return _exec(
    'docker ps --filter name=redwood-template-app-testdb --format "{{.Names}}"'
  )
}

function _runPlaywright() {
  _checkAndInstallPlaywright()
  const [command, ...rest] = _parsePlaywrightArgs()
  _rawExec(command, rest, {
    env: shellenv,
    shell: '/bin/bash',
  })
}

function _checkAndInstallPlaywright() {
  console.log('Initializing playwright...')
  _exec('npx playwright install')
}

function _parsePlaywrightArgs(): string[] {
  const shouldDebug = argv.includes('--debug') ? '--debug' : ''
  const playwrightIdx = argv.indexOf('--playwright')
  if (playwrightIdx === -1) {
    const [cmd, ...rest] = PLAYWRIGHT_COMMAND.split(' ')
    return [cmd, ...rest, shouldDebug]
  }
  const args = argv.slice(playwrightIdx + 1, argv.length)
  return ['npx', 'playwright', ...args, shouldDebug]
}

function _rawExec(
  command: string,
  args?: string[],
  opts?: SpawnOptionsWithoutStdio
) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: '/bin/bash',
    ...opts,
  })
  child.on('data', console.log)
  child.on('error', console.error)
  child.on('exit', (code) => {
    _exec('docker compose stop testdb')
    process.exit(code)
  })
  child.on('SIGINT', function () {
    this.child.kill('SIGINT')
  })
}

function _exec(command: string) {
  return execSync(command, {
    env: shellenv,
    killSignal: 'SIGINT',
  })
    .toString()
    .trim()
}
