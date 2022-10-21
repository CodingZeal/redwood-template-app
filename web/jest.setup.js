/* eslint-env jest */
const fg = require('fast-glob')

const mocks = fg.sync('**/*.mock.{js,ts,jsx,tsx}', {
  cwd: global.__RWJS_TESTROOT_DIR,
  ignore: ['node_modules', '**/*Cell/*'],
  absolute: true,
})

beforeAll(() => {
  for (const m of mocks) {
    require(m)
  }
})
