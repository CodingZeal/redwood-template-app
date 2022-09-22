import { render } from '@redwoodjs/testing/web'

import NewUser from './NewUser'

describe('UserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUser />)
    }).not.toThrow()
  })
})
