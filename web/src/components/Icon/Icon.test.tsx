import { render } from '@redwoodjs/testing/web'

import { Icon } from './Icon'

describe('Icon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Icon name="eye" />)
    }).not.toThrow()
  })

  // archive icon
  it('renders the archive icon', () => {
    const { getByTestId } = render(<Icon name="archive" />)
    expect(getByTestId('archiveIcon')).toBeInTheDocument()
  })

  it('matches the archive icon snapshot', () => {
    expect(render(<Icon name="archive" />)).toMatchSnapshot()
  })

  // arrow icon
  it('renders the arrow icon', () => {
    const { getByTestId } = render(<Icon name="arrow" />)
    expect(getByTestId('arrowIcon')).toBeInTheDocument()
  })

  it('matches the arrow icon snapshot', () => {
    expect(render(<Icon name="arrow" />)).toMatchSnapshot()
  })

  // check icon
  it('renders the check icon', () => {
    const { getByTestId } = render(<Icon name="check" />)
    expect(getByTestId('checkIcon')).toBeInTheDocument()
  })

  it('matches the check icon snapshot', () => {
    expect(render(<Icon name="check" />)).toMatchSnapshot()
  })

  // eye icon
  it('renders the eye icon', () => {
    const { getByTestId } = render(<Icon name="eye" />)
    expect(getByTestId('eyeIcon')).toBeInTheDocument()
  })

  it('matches the eye icon snapshot', () => {
    expect(render(<Icon name="eye" />)).toMatchSnapshot()
  })

  // gear icon
  it('renders the gear icon', () => {
    const { getByTestId } = render(<Icon name="gear" />)
    expect(getByTestId('gearIcon')).toBeInTheDocument()
  })

  it('matches the gear icon snapshot', () => {
    expect(render(<Icon name="gear" />)).toMatchSnapshot()
  })

  // github icon
  it('renders the github icon', () => {
    const { getByTestId } = render(<Icon name="github" />)
    expect(getByTestId('githubIcon')).toBeInTheDocument()
  })

  it('matches the github icon snapshot', () => {
    expect(render(<Icon name="github" />)).toMatchSnapshot()
  })

  // pen icon
  it('renders the pen icon', () => {
    const { getByTestId } = render(<Icon name="pen" />)
    expect(getByTestId('penIcon')).toBeInTheDocument()
  })

  it('matches the pen icon snapshot', () => {
    expect(render(<Icon name="pen" />)).toMatchSnapshot()
  })

  // twitter icon
  it('renders the twitter icon', () => {
    const { getByTestId } = render(<Icon name="twitter" />)
    expect(getByTestId('twitterIcon')).toBeInTheDocument()
  })

  it('matches the twitter icon snapshot', () => {
    expect(render(<Icon name="twitter" />)).toMatchSnapshot()
  })
})
