interface INavMenu {
  className?: string
  height?: string
  width?: string
}

const NavMenu = ({
  className = '',
  height = '44',
  width = '44',
}: INavMenu): JSX.Element => {
  return (
    <div className="flex h-8 flex-col">
      <svg
        className={className}
        data-testid="navmenuIcon"
        width={width}
        height={height}
        viewBox="0 0 34 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="34" height="4" fill="#BC611E" />
      </svg>
      <svg
        className={className}
        data-testid="navmenuIcon"
        width={width}
        height={height}
        viewBox="0 0 34 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="34" height="4" fill="#BC611E" />
      </svg>
      <svg
        className={className}
        data-testid="navmenuIcon"
        width={width}
        height={height}
        viewBox="0 0 34 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="34" height="4" fill="#BC611E" />
      </svg>
    </div>
  )
}

export { NavMenu }
