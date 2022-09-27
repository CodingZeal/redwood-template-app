import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Failure, Success } from './EditUserCell'
import { standard } from './EditUserCell.mock'

describe('EditUserCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success user={standard().user} />)
    }).not.toThrow()
  })

  it('renders h2 successfully', async () => {
    render(<Success user={standard().user} />)
    const element = screen.getByText('Edit User 42')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
