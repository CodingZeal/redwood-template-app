import { render } from '@redwoodjs/testing/web'

import EmailChangeVerificationPage from './EmailChangeVerificationPage'

describe('EmailChangeVerificationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailChangeVerificationPage verifyToken="monkey" />)
    }).not.toThrow()
  })
})
