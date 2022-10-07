import { render } from '@redwoodjs/testing/web'

import RolesPage from './RolesPage'

describe('RolesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RolesPage />)
    }).not.toThrow()
  })
})
