import { render } from '@redwoodjs/testing/web'

import EditEmailPage from './EditEmailPage'

describe('EditEmailPage', () => {
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
      render(<EditEmailPage />)
    }).not.toThrow()
  })
})
