import { getYear } from 'date-fns'

const getCurrentYear = (): string => {
  const year = getYear(new Date(Date.now())).toString()
  return year
}

const Footer = () => {
  return (
    <div>
      <footer
        className="text-center text-sm italic text-gray-500"
        data-testid="copyright"
      >
        Copyright &copy;{getCurrentYear()}.{' '}
        <a
          href="http://codingzeal.com"
          target="_blank"
          className="underline"
          rel="noopener noreferrer"
        >
          Coding ZEAL
        </a>
        . All Rights Reserved.
      </footer>
    </div>
  )
}

export { Footer }
