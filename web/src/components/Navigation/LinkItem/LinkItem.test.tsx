import { routes } from '@redwoodjs/router'
import { render } from '@redwoodjs/testing/web'

import { LinkItem } from './LinkItem'

const mockLink = { name: 'ZEAL', path: 'test' }
const mockPath = { name: 'Users', path: () => routes.adminUsers() }

describe('LinkItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LinkItem path={mockPath.path} name={mockPath.name} />)
    }).not.toThrow()
  })

  it('renders mockLink successfully', () => {
    const { container } = render(
      <LinkItem path={mockLink.path} name={mockLink.name} />
    )

    const anchor = container.querySelector('a')

    expect(anchor).toBeInTheDocument()
    expect(anchor).toHaveAttribute('href', mockLink.path)
  })

  it('renders mockPath successfully', () => {
    const { container } = render(
      <LinkItem path={mockPath.path} name={mockPath.name} />
    )

    const link = container.querySelector('a')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/admin/users')
  })
})
