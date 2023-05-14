import { render } from '@redwoodjs/testing/web'

import NewUser from './NewUser'

describe('NewUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUser />)
    }).not.toThrow()
  })
})
