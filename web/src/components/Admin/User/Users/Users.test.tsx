import { render } from '@redwoodjs/testing/web'

import UsersList from './Users'

describe('UserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersList users={[]} />)
    }).not.toThrow()
  })
})
