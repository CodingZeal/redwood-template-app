import { render } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './RoleCell'
import { standard } from './RoleCell.mock'

describe('RoleCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success role={standard().role} />)
    }).not.toThrow()
  })
})
