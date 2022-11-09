import { execSync, exec } from 'child_process'
import { argv } from 'node:process'

const env = {
  ...process.env,
  DATABASE_URL: 'postgresql://postgres:test@localhost:5433/redwood_test',
}

;(async () => {
  const container = _dockerContainer()

  if (_shouldReset()) {
    _destroy()
  }

  if (!container) {
    _startTestDb()
    _migrateSeed()
  }

  _executePlaywright()
})()

function _dockerContainer() {
  try {
    const container = _exec(
      'docker ps --filter name=redwood-template-app-testdb --format "{{.Names}}"'
    )
    console.log(
      container ? `Found container ${container}...` : 'No container found...'
    )
    return container
  } catch (e) {
    console.error('Docker is not running!')
    console.error({ e })
    process.exit(1)
  }
}

function _destroy() {
  const volume = _exec(
    'docker volume ls --filter name=redwood_test --format "{{.Name}}"'
  )
  if (volume) {
    console.log(`Removing volume ${volume}...`)
    _exec('docker compose rm -sf testdb')
    _exec(`docker volume rm ${volume}`)
  }
}

function _shouldReset() {
  console.log('Resetting database...')
  return argv.includes('--reset')
}

function _startTestDb() {
  console.log('Starting test database...')
  _exec('docker compose up -d testdb')
}

function _migrateSeed() {
  console.log('Migrating and seeding database...')
  _exec('yarn rw prisma migrate dev')
  _exec('yarn rw prisma db seed')
}

function _executePlaywright() {
  console.log('Executing Playwright tests...')
  _exec('npx playwright install')
  const child = exec('yarn test:e2e:ci', {
    env,
  })
  child.stdout?.on('data', console.log)
  child.stderr?.on('data', console.error)
}

function _exec(command: string) {
  return execSync(command, {
    env,
  })
    .toString('utf-8')
    .trim()
}
