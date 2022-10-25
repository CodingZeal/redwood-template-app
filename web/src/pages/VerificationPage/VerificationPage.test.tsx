import { render } from '@redwoodjs/testing/web'

import VerificationPage from './VerificationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VerificationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VerificationPage verifyToken="monkey" />)
    }).not.toThrow()
  })
})
