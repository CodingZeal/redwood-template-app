import { render } from '@redwoodjs/testing/web'

import { TeamsLayout } from './TeamsLayout'

describe('TeamsLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamsLayout>{}</TeamsLayout>)
    }).not.toThrow()
  })
})
