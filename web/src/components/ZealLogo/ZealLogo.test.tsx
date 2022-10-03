import { render } from '@redwoodjs/testing/web'

import { ZealLogo } from './ZealLogo'

describe('ZealLogo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ZealLogo />)
    }).not.toThrow()
  })
})
