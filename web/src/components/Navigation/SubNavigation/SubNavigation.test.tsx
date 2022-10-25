import { render, screen } from '@redwoodjs/testing/web'

import { SubNavigation } from './SubNavigation'

const children = 'Test Children'

describe('SubNavigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubNavigation>{children}</SubNavigation>)
    }).not.toThrow()

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('renders ul successfully', () => {
    const { container } = render(<SubNavigation>{children}</SubNavigation>)
    const list = container.querySelector('ul')

    expect(list).toBeInTheDocument()
  })
})
