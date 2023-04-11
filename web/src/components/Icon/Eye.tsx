interface IEye {
  className?: string
  height?: string
  width?: string
}

const Eye = ({
  className = '',
  height = '44',
  width = '44',
}: IEye): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="eyeIcon"
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.2576 19.9433C31.2248 19.8693 30.4307 18.1077 28.6654 16.3424C26.3132 13.9902 23.3423 12.7471 20.0723 12.7471C16.8023 12.7471 13.8313 13.9902 11.4791 16.3424C9.71382 18.1077 8.91601 19.8721 8.88694 19.9433C8.8443 20.0392 8.82227 20.143 8.82227 20.248C8.82227 20.353 8.8443 20.4568 8.88694 20.5527C8.91976 20.6268 9.71382 22.3874 11.4791 24.1527C13.8313 26.5039 16.8023 27.7471 20.0723 27.7471C23.3423 27.7471 26.3132 26.5039 28.6654 24.1527C30.4307 22.3874 31.2248 20.6268 31.2576 20.5527C31.3002 20.4568 31.3222 20.353 31.3222 20.248C31.3222 20.143 31.3002 20.0392 31.2576 19.9433ZM20.0723 23.9971C19.3306 23.9971 18.6056 23.7771 17.9889 23.3651C17.3722 22.953 16.8915 22.3674 16.6077 21.6821C16.3239 20.9969 16.2496 20.2429 16.3943 19.5155C16.539 18.7881 16.8962 18.1199 17.4206 17.5954C17.9451 17.071 18.6132 16.7138 19.3407 16.5691C20.0681 16.4244 20.8221 16.4987 21.5073 16.7825C22.1925 17.0664 22.7782 17.547 23.1903 18.1637C23.6023 18.7804 23.8223 19.5054 23.8223 20.2471C23.8223 21.2416 23.4272 22.1955 22.7239 22.8987C22.0206 23.602 21.0668 23.9971 20.0723 23.9971Z"
        fill="#2E3747"
      />
    </svg>
  )
}

export { Eye }