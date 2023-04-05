import { render, screen } from '@redwoodjs/testing/web'

import { Footer } from './Footer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Footer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Footer />)
    }).not.toThrow()
  })

  it('shows copyright when unauthenticated', () => {
    render(<Footer />)
    const element = screen.getByTestId('copyright')

    expect(element).toBeInTheDocument()
  })

  it('shows social media icons when unauthenticated', () => {
    render(<Footer />)
    const element = screen.getByTestId('twitterIcon')
    const element2 = screen.getByTestId('githubIcon')

    expect(element).toBeInTheDocument()
    expect(element2).toBeInTheDocument()
  })
})
