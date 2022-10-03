import { render } from '@redwoodjs/testing/web'

import { AdminLayout } from './Layout'

describe('AdminLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminLayout>{}</AdminLayout>)
    }).not.toThrow()
  })
})
