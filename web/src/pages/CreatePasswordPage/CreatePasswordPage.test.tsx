import { render } from '@redwoodjs/testing/web'

import CreatePasswordPage from './CreatePasswordPage'

describe('CreatePasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatePasswordPage resetToken={'foo'} />)
    }).not.toThrow()
  })
})
