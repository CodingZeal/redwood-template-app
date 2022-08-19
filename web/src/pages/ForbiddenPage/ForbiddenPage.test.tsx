import { render } from '@redwoodjs/testing/web'

import ForbiddenPage from './ForbiddenPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ForbiddenPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForbiddenPage />)
    }).not.toThrow()
  })
})
