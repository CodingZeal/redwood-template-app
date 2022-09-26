import { render } from '@redwoodjs/testing/web'

import UserPage from './UserPage'

describe('UserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserPage id={''} />)
    }).not.toThrow()
  })
})
