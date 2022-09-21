import { render } from '@redwoodjs/testing/web'

import ForgotPasswordPage from './ForgotPasswordPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ForgotPassword', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForgotPasswordPage />)
    }).not.toThrow()
  })
})
