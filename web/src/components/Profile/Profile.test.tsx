import { render } from '@redwoodjs/testing/web'

import Profile from './Profile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Profile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Profile />)
    }).not.toThrow()
  })
})
