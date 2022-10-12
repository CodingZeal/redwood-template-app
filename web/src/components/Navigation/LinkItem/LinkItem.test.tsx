import { render } from '@redwoodjs/testing/web'

import { LinkItem } from './LinkItem'

describe('LinkItem', () => {
  const test = 'here'
  it('renders successfully', () => {
    expect(() => {
      render(<LinkItem to={test} />)
    }).not.toThrow()
  })
})
