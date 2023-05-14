import { render, screen } from '@redwoodjs/testing/web'

import { Navigation } from './Navigation'

const renderComponent = () => render(<Navigation />)

describe('Navigation', () => {
  it('renders navigation component', () => {
    renderComponent()
    expect(screen.getByTestId('nav')).toBeVisible()
  })
})
