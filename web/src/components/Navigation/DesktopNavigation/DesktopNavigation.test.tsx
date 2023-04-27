import { render } from '@redwoodjs/testing/web'

import { DesktopNavigation } from './DesktopNavigation'

describe('DesktopNavigation', () => {
  it('renders desktop navigation component', () => {
    expect(() => {
      render(<DesktopNavigation />)
    }).not.toThrow()
  })
})
