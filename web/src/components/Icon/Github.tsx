interface IGithub {
  className?: string
  height?: string
  width?: string
}

const Github = ({
  className = '',
  height = '44',
  width = '44',
}: IGithub): JSX.Element => {
  return (
    <svg
      className={className}
      data-testid="githubIcon"
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_69_1542)">
        <path
          d="M22 10C15.4 10 10 15.4 10 22C10 28.6 15.4 34 22 34C28.6 34 34 28.6 34 22C34 15.4 28.6 10 22 10ZM29.125 29.125C28.225 30.025 27.1 30.775 25.9 31.3C25.6 31.45 25.3 31.525 25 31.675V29.875C25 28.9 24.7 28.225 24.025 27.775C24.4 27.7 24.775 27.7 25.15 27.625C25.525 27.55 25.825 27.475 26.2 27.325C26.575 27.175 26.95 27.025 27.25 26.875C27.55 26.725 27.85 26.425 28.15 26.125C28.45 25.825 28.675 25.525 28.825 25.15C28.975 24.775 29.125 24.325 29.275 23.8C29.35 23.275 29.425 22.675 29.425 22.075C29.425 20.875 29.05 19.825 28.225 19C28.6 18.1 28.525 17.05 28.075 15.925H27.775C27.55 15.925 27.175 16 26.65 16.15C26.125 16.375 25.525 16.675 24.85 17.125C23.95 16.9 22.975 16.75 21.925 16.75C20.95 16.75 19.975 16.9 19.075 17.125C18.625 16.825 18.25 16.6 17.875 16.45C17.65 16.15 17.35 16.075 17.125 16C16.9 15.925 16.675 15.85 16.45 15.85C16.225 15.85 16.15 15.85 16.075 15.85C16 15.85 16 15.85 15.925 15.85C15.475 16.975 15.475 17.95 15.775 18.925C14.95 19.75 14.575 20.8 14.575 22C14.575 22.6 14.65 23.2 14.725 23.725C14.8 24.25 14.95 24.7 15.175 25.075C15.325 25.45 15.625 25.75 15.85 26.05C16.15 26.35 16.45 26.575 16.75 26.8C17.05 26.95 17.425 27.175 17.8 27.25C18.175 27.4 18.55 27.475 18.85 27.55C19.225 27.625 19.6 27.7 19.975 27.7C19.3 28.15 19 28.825 19 29.8V31.6C18.625 31.525 18.325 31.375 17.95 31.225C16.75 30.7 15.7 30.025 14.725 29.05C13.825 28.15 13.075 27.025 12.55 25.825C12.025 24.55 11.725 23.275 11.725 21.925C11.725 20.575 12.025 19.225 12.55 18.025C13.075 16.825 13.75 15.775 14.725 14.8C15.625 13.9 16.75 13.15 17.95 12.625C19.225 12.1 20.5 11.8 21.85 11.8C23.2 11.8 24.55 12.1 25.75 12.625C26.95 13.15 28 13.825 28.975 14.8C29.875 15.7 30.625 16.825 31.15 18.025C31.675 19.3 31.975 20.575 31.975 21.925C31.975 23.275 31.675 24.625 31.15 25.825C30.775 27.1 30.025 28.225 29.125 29.125Z"
          fill="#BC611E"
        />
      </g>
      <defs>
        <clipPath id="clip0_69_1542">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(10 10)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export { Github }
