import { render } from '@redwoodjs/testing/web'

import EditPasswordPage from './EditPasswordPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditPasswordPage />)
    }).not.toThrow()
  })
})
