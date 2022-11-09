#!/usr/bin/env ts-node

// usage: ./scripts/playwright.ts [--reset --migrate]
// alias: yarn test:e2e [--reset --migrate]

import { execSync, spawn, SpawnOptionsWithoutStdio } from 'child_process'
import { argv } from 'node:process'

import { db } from '../api/src/lib/db'

const { CI } = process.env

// env for prisma
const DATABASE_URL = 'postgresql://postgres:test@localhost:5433/redwood_test'
process.env.DATABASE_URL = DATABASE_URL

// env for shell commands
const shellenv: Record<string, string> = {
  ...process.env,
  DATABASE_URL,
}

const PLAYWRIGHT_COMMAND =
  'npx playwright test -c web/playwright.config.ts --trace on --workers 1'

;(async () => {
  if (CI) {
    const [command, ...rest] = PLAYWRIGHT_COMMAND.split(' ')
    return _rawExec(command, rest, {
      env: shellenv,
    })
  }
  _checkDocker()
  _stopContainer()

  if (_shouldReset()) {
    _resetDatabase()
  }

  _startContainer()

  if (_shouldMigrate()) {
    _migrate()
  }

  if (!_shouldSeed()) {
    _seed()
  }

  _runPlaywright()
})()

function _checkDocker() {
  try {
    // need a command that doesn't use stderr (like --version)
    _containerName()
  } catch (e) {
    console.error('Is docker running?')
    console.error({ e })
    process.exit(1)
  }
}

function _stopContainer() {
  _log('Stopping container...')
  _exec('docker compose rm -sf testdb > /dev/null')
}

function _startContainer() {
  _log('Starting container...')
  _exec('docker compose up -d testdb > /dev/null')
}

function _removeContainer() {
  _log('Removing container...')
  _exec('docker compose rm -sf testdb > /dev/null')
}

function _getVolume() {
  return _exec(
    'docker volume ls --filter name=redwood_test --format "{{.Name}}"'
  )
}

function _removeVolume() {
  _log('Removing volume...')
  const volume = _getVolume()
  if (volume) {
    _exec(`docker volume rm ${volume}`)
  }
}

function _resetDatabase() {
  _log('Resetting database...', true)
  _destroy()
  _startContainer()
  _migrate()
  _seed()
}

function _destroy() {
  _removeContainer()
  _removeVolume()
}

function _shouldReset() {
  return argv.includes('--reset')
}

function _shouldMigrate() {
  return argv.includes('--migrate')
}

async function _shouldSeed() {
  const hasUsers = await db.user.findMany()
  return !!hasUsers
}

function _migrate() {
  _log('Migrating..', true)
  _exec('yarn rw prisma migrate dev')
}

function _seed() {
  _log('Seeding...', true)
  _exec('yarn rw prisma db seed')
}

function _containerName() {
  return _exec(
    'docker ps --filter name=redwood-template-app-testdb --format "{{.Names}}"'
  )
}

function _runPlaywright() {
  _checkAndInstallPlaywright()
  const [command, ...rest] = PLAYWRIGHT_COMMAND.split(' ')
  _rawExec(command, rest, {
    env: shellenv,
    shell: '/bin/bash',
  })
}
function _checkAndInstallPlaywright() {
  _log('Initializing playwright...', true)
  _exec('npx playwright install')
}

function _log(message: string, out = false) {
  if (_debug() || out) {
    console.log(message)
  }
}

function _debug() {
  return argv.includes('--debug')
}

function _rawExec(
  command: string,
  args?: string[],
  opts?: SpawnOptionsWithoutStdio
) {
  spawn(command, args, {
    stdio: 'inherit',
    ...opts,
  })
}

function _exec(command: string) {
  const out = execSync(command, {
    env: shellenv,
    shell: '/bin/bash',
  })
    .toString()
    .trim()
  _log(out)
  return out
}
