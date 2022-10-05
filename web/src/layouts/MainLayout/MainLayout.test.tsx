import { render, screen } from '@redwoodjs/testing/web'

import { MainLayout } from './MainLayout'

describe('MainLayout', () => {
  it('renders successfully', () => {
    const children = 'Test Children'
    expect(() => {
      render(<MainLayout>{children}</MainLayout>)
    }).not.toThrow()
    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
