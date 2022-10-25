import { render } from '@redwoodjs/testing/web'

import NewRolePage from './NewRolePage'

describe('NewRolePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewRolePage />)
    }).not.toThrow()
  })
})
