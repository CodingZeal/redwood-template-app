import seedScript from '../scripts/seed'

const globalSetup = async () => {
  console.log('Setting up playwright...')
  await seedScript()
}

export default globalSetup
