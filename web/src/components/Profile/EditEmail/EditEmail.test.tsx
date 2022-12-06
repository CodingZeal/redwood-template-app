import { render, screen } from '@redwoodjs/testing/web'

import { EditEmail } from './EditEmail'

describe('EditEmail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditEmail profile={{ name: 'harry' }} />)
    }).not.toThrow()
  })

  it('render header successfully', () => {
    render(<EditEmail profile={{ name: 'harry' }} />)
    const header = screen.getByText('Edit Email')

    expect(header).toBeInTheDocument()
    expect(header).toBeVisible()
  })
})
