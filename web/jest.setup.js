/* eslint-env jest */
const fg = require('fast-glob')

const {
  startMSW,
  setupRequestHandlers,
  closeServer,
} = require('@redwoodjs/testing/dist/web/mockRequests')

const mocks = fg.sync('**/*.mock.{js,ts,jsx,tsx}', {
  cwd: global.__RWJS_TESTROOT_DIR,
  ignore: ['node_modules', '**/*Cell/*'],
  absolute: true,
})

beforeAll(async () => {
  for (const m of mocks) {
    require(m)
  }

  // Have to bounce the server since it is already being run from somewhere else
  //   in order to get it to load the new required files
  await closeServer()
  await startMSW('node')
  setupRequestHandlers() // reset the handlers
})
