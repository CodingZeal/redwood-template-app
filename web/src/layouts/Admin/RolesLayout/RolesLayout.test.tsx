import { render } from '@redwoodjs/testing/web'

import { RolesLayout } from './RolesLayout'

describe('RolesLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RolesLayout>{}</RolesLayout>)
    }).not.toThrow()
  })
})
