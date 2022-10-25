import { render, screen } from '@redwoodjs/testing/web'

import { EditPassword } from './EditPassword'

describe('EditPassword', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditPassword profile={{ name: 'harry' }} />)
    }).not.toThrow()
  })

  it('render header successfully', () => {
    render(<EditPassword profile={{ name: 'harry' }} />)
    const header = screen.getByText('Edit Password')

    expect(header).toBeInTheDocument()
    expect(header).toBeVisible()
  })
})
