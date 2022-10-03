import { render } from '@redwoodjs/testing/web'

import SignupPage from './SignupPage'

describe('SignupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupPage />)
    }).not.toThrow()
  })
})
