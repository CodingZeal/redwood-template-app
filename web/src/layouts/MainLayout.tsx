import { getYear } from 'date-fns'

import { Navigation } from '../components/Navigation'

const getCurrentYear = (): string => {
  const year = getYear(new Date(Date.now())).toString()
  return year
}

const MainLayout = ({ children }) => {
  return (
    <div className="m-4">
      <Navigation />
      {children}
      <footer
        className="text-center text-sm italic text-gray-500"
        data-testid="copyright"
      >
        Copyright &copy;{getCurrentYear()}.{' '}
        <a
          href="http://codingzeal.com"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          Coding ZEAL
        </a>
        . All Rights Reserved.
      </footer>
    </div>
  )
}

export { MainLayout }
