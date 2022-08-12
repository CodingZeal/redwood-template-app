import { render, screen } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
    expect(screen.getByTestId('home-page')).toBeVisible()
  })
})
