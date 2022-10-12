import { render } from '@redwoodjs/testing/web'

import ForgotPasswordPage from './ForgotPasswordPage'

describe('ForgotPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForgotPasswordPage />)
    }).not.toThrow()
  })
})
