import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Failure, Success } from './EditRoleCell'
import { standard } from './EditRoleCell.mock'

describe('EditRoleCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Failure successfully', () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', () => {
    expect(() => {
      render(<Success role={standard().role} />)
    }).not.toThrow()
  })

  it('renders h2 successfully', () => {
    render(<Success role={standard().role} />)
    const element = screen.getByText(`Edit Role ${standard().role.id}`)

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
