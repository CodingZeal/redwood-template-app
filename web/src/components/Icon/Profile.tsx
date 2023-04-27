interface IProfile {
  className?: string
  height?: string
  width?: string
}

const Profile = ({
  className = '',
  height = '16',
  width = '16',
}: IProfile): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="profileIcon"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.99284 1.3335C4.31284 1.3335 1.32617 4.32016 1.32617 8.00016C1.32617 11.6802 4.31284 14.6668 7.99284 14.6668C11.6728 14.6668 14.6595 11.6802 14.6595 8.00016C14.6595 4.32016 11.6728 1.3335 7.99284 1.3335ZM10.3995 5.56016C11.1128 5.56016 11.6862 6.1335 11.6862 6.84683C11.6862 7.56016 11.1128 8.1335 10.3995 8.1335C9.68617 8.1335 9.11284 7.56016 9.11284 6.84683C9.10617 6.1335 9.68617 5.56016 10.3995 5.56016ZM6.39951 4.50683C7.26617 4.50683 7.97284 5.2135 7.97284 6.08016C7.97284 6.94683 7.26617 7.6535 6.39951 7.6535C5.53284 7.6535 4.82617 6.94683 4.82617 6.08016C4.82617 5.20683 5.52617 4.50683 6.39951 4.50683ZM6.39951 10.5935V13.0935C4.79951 12.5935 3.53284 11.3602 2.97284 9.78683C3.67284 9.04016 5.41951 8.66016 6.39951 8.66016C6.75284 8.66016 7.1995 8.7135 7.66617 8.80683C6.57284 9.38683 6.39951 10.1535 6.39951 10.5935ZM7.99284 13.3335C7.81284 13.3335 7.6395 13.3268 7.46617 13.3068V10.5935C7.46617 9.64683 9.42617 9.1735 10.3995 9.1735C11.1128 9.1735 12.3462 9.4335 12.9595 9.94016C12.1795 11.9202 10.2528 13.3335 7.99284 13.3335Z" />
    </svg>
  )
}

export { Profile }