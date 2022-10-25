import { render, screen } from '@redwoodjs/testing/web'

import LoginPage from './LoginPage'

const renderComponent = () => render(<LoginPage />)

describe('LoginPage', () => {
  it('renders the login page', () => {
    renderComponent()
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })
})
