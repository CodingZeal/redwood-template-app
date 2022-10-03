import { render } from '@redwoodjs/testing/web'

import { UsersLayout } from './UsersLayout'

describe('UsersLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersLayout>{}</UsersLayout>)
    }).not.toThrow()
  })
})
