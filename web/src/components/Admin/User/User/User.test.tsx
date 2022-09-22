import { render } from '@redwoodjs/testing/web'

import User from './User'
import { standard } from './User.mocks'

describe('UserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<User user={standard().user} />)
    }).not.toThrow()
  })
})
