import { execSync, exec } from 'child_process'
import { argv } from 'node:process'
;(async () => {
  const container = execSync(
    'docker ps --filter name=redwood-template-app-testdb --format "{{.Names}}"'
  )

  if (_shouldReset()) {
    _destroy()

    return
  }
  if (!container) {
    _startTestDb()
    _migrateSeed()
    return
  }


  _executePlaywright()
})()

function _destroy() {
  const volume = execSync(
    'docker volume ls --filter name=redwood_test --format "{{.Name}}"'
  )
  execSync(`docker volume rm ${volume}`)
}

function _shouldReset() {
  return argv.includes('--reset')
}

function _startTestDb() {
  execSync('docker compose up -d testdb')
}

function _migrateSeed() {
  execSync('yarn rw prisma migrate dev')
  execSync('yarn rw prisma db seed')
}

function _executePlaywright() {
  const child = exec('yarn test:e2e:testdb', {
    env: {
      ...process.env,
      DATABASE_URL: 'postgresql://postgres:test@localhost:5433/redwood_test',
    },
  })
  child.stdout?.on('data', console.log)
  child.stderr?.on('data', console.error)
}
