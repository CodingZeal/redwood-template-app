interface ISecurity {
  className?: string
  height?: string
  width?: string
}

const Security = ({
  className = '',
  height = '16',
  width = '16',
}: ISecurity): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="securityIcon"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0.666504L2 3.33317V7.33317C2 11.0332 4.56 14.4932 8 15.3332C11.44 14.4932 14 11.0332 14 7.33317V3.33317L8 0.666504ZM8 7.99317H12.6667C12.3133 10.7398 10.48 13.1865 8 13.9532V7.99984H3.33333V4.19984L8 2.1265V7.99317Z" />
    </svg>
  )
}

export { Security }
