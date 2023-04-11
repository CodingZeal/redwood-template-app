interface IArrow {
  className?: string
  height?: string
  width?: string
}

const Arrow = ({
  className = '',
  height = '24',
  width = '24',
}: IArrow): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="arrowIcon"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0306 13.0307L9.53063 20.5307C9.42573 20.6357 9.29204 20.7073 9.14648 20.7362C9.00092 20.7652 8.85002 20.7504 8.71291 20.6936C8.57579 20.6368 8.45861 20.5405 8.37621 20.4171C8.29381 20.2936 8.24988 20.1485 8.25 20.0001V5.0001C8.24988 4.85168 8.29381 4.70656 8.37621 4.58312C8.45861 4.45967 8.57579 4.36345 8.71291 4.30664C8.85002 4.24982 9.00092 4.23497 9.14648 4.26396C9.29204 4.29294 9.42573 4.36447 9.53063 4.46948L17.0306 11.9695C17.1004 12.0391 17.1557 12.1218 17.1934 12.2129C17.2312 12.3039 17.2506 12.4015 17.2506 12.5001C17.2506 12.5987 17.2312 12.6963 17.1934 12.7873C17.1557 12.8784 17.1004 12.9611 17.0306 13.0307Z"
        fill="#371108"
      />
    </svg>
  )
}

export { Arrow }