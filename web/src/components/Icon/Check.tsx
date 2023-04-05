interface ICheck {
  className?: string
  height?: string
  width?: string
}

const Check = ({
  className = '',
  height = '24',
  width = '24',
}: ICheck): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="checkIcon"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_69_1261)">
        <path
          d="M12.4234 18.57L5.83398 13.6279L7.77663 11.0377L11.5467 13.8662L17.0871 5L19.834 6.716L12.4234 18.57Z"
          fill="#BC611E"
        />
      </g>
      <defs>
        <clipPath id="clip0_69_1261">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(5.83398 5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export { Check }
