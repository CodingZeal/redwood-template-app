import { render } from '@redwoodjs/testing/web'

import RedwoodDevFatalErrorPage from './FatalErrorPage'

describe('RedwoodDevFatalErrorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RedwoodDevFatalErrorPage />)
    }).not.toThrow()
  })
})
