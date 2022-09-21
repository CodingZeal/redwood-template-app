import { render } from '@redwoodjs/testing/web'

import NotFoundPage from './NotFoundPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NotFoundPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotFoundPage />)
    }).not.toThrow()
  })
})
