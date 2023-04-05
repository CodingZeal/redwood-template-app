import { getYear } from 'date-fns'

import { Github } from '../Icon/Github'
import { Twitter } from '../Icon/Twitter'

const getCurrentYear = (): string => {
  const year = getYear(new Date(Date.now())).toString()
  return year
}

const Footer = () => {
  return (
    <div className="static m-10 border-t-2">
      <footer
        className="grid grid-cols-2 justify-start py-5 font-int text-base text-blackBean"
        data-testid="copyright"
      >
        <div>
          Copyright &copy;{getCurrentYear()}{' '}
          <a
            href="http://codingzeal.com"
            target="_blank"
            className="text-blackBean no-underline"
            rel="noopener noreferrer"
          >
            ZEAL LLC{' '}
          </a>
          All rights reserved.
        </div>
        <div className="flex flex-row justify-end">
          <a href="/" className="">
            <Twitter />
          </a>
          <a href="/" className="">
            <Github />
          </a>
        </div>
      </footer>
    </div>
  )
}

export { Footer }
