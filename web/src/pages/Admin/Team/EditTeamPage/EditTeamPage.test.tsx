import { render } from '@redwoodjs/testing/web'

import EditTeamPage from './EditTeamPage'

describe('EditTeamPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditTeamPage id={''} />)
    }).not.toThrow()
  })
})
