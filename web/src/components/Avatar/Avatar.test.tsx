import { render, screen } from '@redwoodjs/testing/web'

import { Avatar } from './Avatar'
import { user } from './Avatar.mocks'

describe('Avatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Avatar user={user} />)
    }).not.toThrow()
  })

  it('uses the correct alt text', () => {
    render(<Avatar user={user} />)
    expect(screen.getByText(user.nickname)).toBeInTheDocument()
  })
})
