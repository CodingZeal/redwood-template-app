import { render } from '@redwoodjs/testing/web'

import RolePage from './RolePage'

describe('RolePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RolePage id={''} />)
    }).not.toThrow()
  })
})
