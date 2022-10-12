import { render, screen } from '@redwoodjs/testing/web'

import { SubNavigation } from './SubNavigation'

describe('SubNavigation', () => {
  it('renders successfully', () => {
    const children = 'Test Children'
    expect(() => {
      render(<SubNavigation>{children}</SubNavigation>)
    }).not.toThrow()

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
