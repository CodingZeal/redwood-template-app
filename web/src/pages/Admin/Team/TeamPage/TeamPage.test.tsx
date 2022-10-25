import { render } from '@redwoodjs/testing/web'

import TeamPage from './TeamPage'

describe('TeamPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamPage id={''} />)
    }).not.toThrow()
  })
})
