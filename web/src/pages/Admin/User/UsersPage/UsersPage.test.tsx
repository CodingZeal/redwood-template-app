import { render } from '@redwoodjs/testing/web'

import UsersPage from './UsersPage'

describe('UsersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersPage />)
    }).not.toThrow()
  })
})
