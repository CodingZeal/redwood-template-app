import { render } from '@redwoodjs/testing/web'

import ResetPasswordPage from './ResetPasswordPage'

describe('ResetPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResetPasswordPage resetToken={'banana'} />)
    }).not.toThrow()
  })
})
