import { render } from '@redwoodjs/testing/web'

import EditRolePage from './EditRolePage'

describe('EditRolePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditRolePage id={''} />)
    }).not.toThrow()
  })
})
