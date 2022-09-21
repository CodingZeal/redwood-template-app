import { render } from '@redwoodjs/testing/web'

import ResetPasswordPage from './ResetPasswordPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ResetPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResetPasswordPage resetToken={undefined} />)
    }).not.toThrow()
  })
})
