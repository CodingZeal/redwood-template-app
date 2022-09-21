import { render } from '@redwoodjs/testing/web'

import FatalErrorPage from './FatalErrorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FatalErrorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FatalErrorPage />)
    }).not.toThrow()
  })
})
