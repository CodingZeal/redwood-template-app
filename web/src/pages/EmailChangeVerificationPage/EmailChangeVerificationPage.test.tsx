import { render } from '@redwoodjs/testing/web'

import EmailChangeVerificationPage from './EmailChangeVerificationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EmailChangeVerificationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailChangeVerificationPage verifyToken="monkey" />)
    }).not.toThrow()
  })
})
