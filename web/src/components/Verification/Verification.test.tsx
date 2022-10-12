import { render } from '@redwoodjs/testing/web'

import { Verification } from './Verification'

describe('Verification', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Verification token="abc" />)
    }).not.toThrow()
  })
})
