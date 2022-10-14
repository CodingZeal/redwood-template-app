import { render, screen } from '@redwoodjs/testing/web'

import { LinkItem } from './LinkItem'

const test = 'here'
const children = 'Test'

describe('LinkItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LinkItem to={test}>{children}</LinkItem>)
    }).not.toThrow()
  })

  it('renders children successfully', () => {
    render(<LinkItem to={test}>{children}</LinkItem>)

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('renders list successfully', () => {
    const { container } = render(<LinkItem to={test}>{children}</LinkItem>)

    const li = container.querySelector('li')

    expect(li).toBeInTheDocument()
  })

  it('renders link successfully', () => {
    const { container } = render(<LinkItem to={test}>{children}</LinkItem>)

    const anchor = container.querySelector('a')

    expect(anchor).toHaveAttribute('href', test)
  })
})
