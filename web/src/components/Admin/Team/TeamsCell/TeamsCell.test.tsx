import { render } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './TeamsCell'
import { standard } from './TeamsCell.mock'

describe('TeamsCell', () => {
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
      render(<Success teams={standard().teams} />)
    }).not.toThrow()
  })
})
