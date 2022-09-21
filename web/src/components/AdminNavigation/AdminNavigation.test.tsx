import { render } from '@redwoodjs/testing/web'

import { AdminNavigation } from './AdminNavigation'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminNavigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNavigation />)
    }).not.toThrow()
  })

  // it('shows users when super admin', async () => {
  //   mockCurrentUser({ role: 'super admin', admin: true })
  //   renderComponent()
  //   await waitFor(() => {
  //     expect(screen.getByText('Users')).toBeInTheDocument()
  //   })
  // })
})
