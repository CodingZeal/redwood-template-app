import { render } from '@redwoodjs/testing/web'

import UserForm from './UserForm'

describe('UserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserForm />)
    }).not.toThrow()
  })
})
