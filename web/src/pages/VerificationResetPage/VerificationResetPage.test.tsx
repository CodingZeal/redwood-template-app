import { render } from '@redwoodjs/testing/web'

import VerificationResetPage from './VerificationResetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VerificationResetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VerificationResetPage />)
    }).not.toThrow()
  })
})
