interface ILogout {
  className?: string
  height?: string
  width?: string
}

const Logout = ({
  className = '',
  height = '16',
  width = '16',
}: ILogout): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="logoutIcon"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.334 4.66667L10.394 5.60667L12.114 7.33333H5.33398V8.66667H12.114L10.394 10.3867L11.334 11.3333L14.6673 8L11.334 4.66667ZM2.66732 3.33333H8.00065V2H2.66732C1.93398 2 1.33398 2.6 1.33398 3.33333V12.6667C1.33398 13.4 1.93398 14 2.66732 14H8.00065V12.6667H2.66732V3.33333Z" />
    </svg>
  )
}

export { Logout }
