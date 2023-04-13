interface ILock {
  className?: string
  height?: string
  width?: string
}

const Lock = ({
  className = '',
  height = '16',
  width = '16',
}: ILock): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="lockIcon"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.9993 5.33317H11.3327V3.99984C11.3327 2.15984 9.83935 0.666504 7.99935 0.666504C6.15935 0.666504 4.66602 2.15984 4.66602 3.99984V5.33317H3.99935C3.26602 5.33317 2.66602 5.93317 2.66602 6.6665V13.3332C2.66602 14.0665 3.26602 14.6665 3.99935 14.6665H11.9993C12.7327 14.6665 13.3327 14.0665 13.3327 13.3332V6.6665C13.3327 5.93317 12.7327 5.33317 11.9993 5.33317ZM5.99935 3.99984C5.99935 2.89317 6.89268 1.99984 7.99935 1.99984C9.10602 1.99984 9.99935 2.89317 9.99935 3.99984V5.33317H5.99935V3.99984ZM11.9993 13.3332H3.99935V6.6665H11.9993V13.3332ZM7.99935 11.3332C8.73268 11.3332 9.33268 10.7332 9.33268 9.99984C9.33268 9.2665 8.73268 8.6665 7.99935 8.6665C7.26602 8.6665 6.66602 9.2665 6.66602 9.99984C6.66602 10.7332 7.26602 11.3332 7.99935 11.3332Z" />
    </svg>
  )
}

export { Lock }
