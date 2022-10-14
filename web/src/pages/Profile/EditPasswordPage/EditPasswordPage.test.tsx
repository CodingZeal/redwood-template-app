import { render } from '@redwoodjs/testing/web'

import EditPasswordPage from './EditPasswordPage'

describe('EditPasswordPage', () => {
  it('renders successfully', () => {
    mockCurrentUser({
      id: '1',
      email: 'mock@example.com',
      name: '',
      nickname: '',
      pronouns: '',
      roles: [],
    })

    expect(() => {
      render(<EditPasswordPage />)
    }).not.toThrow()
  })
})
