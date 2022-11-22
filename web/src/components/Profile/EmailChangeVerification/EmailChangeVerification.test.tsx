import { render } from '@redwoodjs/testing/web'

import { EmailChangeVerification } from './EmailChangeVerification'

describe('EmailChangeVerification', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailChangeVerification token="abc" />)
    }).not.toThrow()
  })
})
