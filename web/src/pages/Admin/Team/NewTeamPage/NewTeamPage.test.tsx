import { render } from '@redwoodjs/testing/web'

import NewTeamPage from './NewTeamPage'

describe('NewTeamPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTeamPage />)
    }).not.toThrow()
  })
})
