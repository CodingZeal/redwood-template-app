import { render } from '@redwoodjs/testing/web'

import TeamsPage from './TeamsPage'

describe('TeamsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamsPage />)
    }).not.toThrow()
  })
})
