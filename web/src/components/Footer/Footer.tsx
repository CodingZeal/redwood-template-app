import { getYear } from 'date-fns'

import { Icon } from '../Icon'

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
            className="text-blackBean no-underline hover:underline"
            rel="noopener noreferrer"
          >
            ZEAL
          </a>
          . All Rights Reserved.
        </div>
        <div className="flex flex-row justify-end">
          <a
            href="https://twitter.com/codingzeal"
            className="text-primary hover:text-black"
          >
            <Icon name="twitter" />
          </a>
          <a href="/" className="text-primary hover:text-black">
            <Icon name="github" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export { Footer }
