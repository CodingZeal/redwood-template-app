import { render } from '@redwoodjs/testing/web'

import AdminPage from './AdminPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminPage />)
    }).not.toThrow()
  })
})
