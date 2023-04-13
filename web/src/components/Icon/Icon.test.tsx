import { render } from '@redwoodjs/testing/web'

import { Icon } from './Icon'

describe('Icon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Icon name="eye" />)
    }).not.toThrow()
  })

  // addition icon
  it('renders the addition icon', () => {
    const { getByTestId } = render(<Icon name="addition" />)
    expect(getByTestId('additionIcon')).toBeInTheDocument()
  })

  it('matches the addition icon snapshot', () => {
    expect(render(<Icon name="addition" />)).toMatchSnapshot()
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

  // email icon
  it('renders the email icon', () => {
    const { getByTestId } = render(<Icon name="email" />)
    expect(getByTestId('emailIcon')).toBeInTheDocument()
  })

  it('matches the email icon snapshot', () => {
    expect(render(<Icon name="email" />)).toMatchSnapshot()
  })

  // eye icon
  it('renders the eye icon', () => {
    const { getByTestId } = render(<Icon name="eye" />)
    expect(getByTestId('eyeIcon')).toBeInTheDocument()
  })

  it('matches the eye icon snapshot', () => {
    expect(render(<Icon name="eye" />)).toMatchSnapshot()
  })

  // github icon
  it('renders the github icon', () => {
    const { getByTestId } = render(<Icon name="github" />)
    expect(getByTestId('githubIcon')).toBeInTheDocument()
  })

  it('matches the github icon snapshot', () => {
    expect(render(<Icon name="github" />)).toMatchSnapshot()
  })

  // lock icon
  it('renders the lock icon', () => {
    const { getByTestId } = render(<Icon name="lock" />)
    expect(getByTestId('lockIcon')).toBeInTheDocument()
  })

  it('matches the lock icon snapshot', () => {
    expect(render(<Icon name="lock" />)).toMatchSnapshot()
  })

  // logout icon
  it('renders the logout icon', () => {
    const { getByTestId } = render(<Icon name="logout" />)
    expect(getByTestId('logoutIcon')).toBeInTheDocument()
  })

  it('matches the logout icon snapshot', () => {
    expect(render(<Icon name="logout" />)).toMatchSnapshot()
  })

  // navmenu icon
  it('renders the navmenu icon', () => {
    const { getByTestId } = render(<Icon name="navmenu" />)
    expect(getByTestId('navmenuIcon')).toBeInTheDocument()
  })

  it('matches the navmenu icon snapshot', () => {
    expect(render(<Icon name="navmenu" />)).toMatchSnapshot()
  })

  // pen icon
  it('renders the pen icon', () => {
    const { getByTestId } = render(<Icon name="pen" />)
    expect(getByTestId('penIcon')).toBeInTheDocument()
  })

  it('matches the pen icon snapshot', () => {
    expect(render(<Icon name="pen" />)).toMatchSnapshot()
  })

  // profile icon
  it('renders the profile icon', () => {
    const { getByTestId } = render(<Icon name="profile" />)
    expect(getByTestId('profileIcon')).toBeInTheDocument()
  })

  it('matches the profile icon snapshot', () => {
    expect(render(<Icon name="profile" />)).toMatchSnapshot()
  })

  // security icon
  it('renders the security icon', () => {
    const { getByTestId } = render(<Icon name="security" />)
    expect(getByTestId('securityIcon')).toBeInTheDocument()
  })

  it('matches the security icon snapshot', () => {
    expect(render(<Icon name="security" />)).toMatchSnapshot()
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
