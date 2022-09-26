import { render } from '@redwoodjs/testing/web'

import EditUserPage from './EditUserPage'

describe('EditUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditUserPage id={''} />)
    }).not.toThrow()
  })
})
