import { render } from '@redwoodjs/testing/web'

import NotFoundPage from './NotFoundPage'

describe('NotFoundPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotFoundPage />)
    }).not.toThrow()
  })
})
