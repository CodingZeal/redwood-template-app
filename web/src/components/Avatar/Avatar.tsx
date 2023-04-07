export interface IAvatar {
  className?: string
  height?: number
  user?: {
    email?: string
    name?: string
    nickname?: string
  }
  width?: number
}

const Avatar = ({
  className = '',
  height = 44,
  user,
  width = 44,
}: IAvatar): JSX.Element => {
  const displayName = (user) => user.nickname || user.name || user.email
  return (
    <>
      <div
        className={`font-inter flex items-center justify-center rounded-full text-center text-white ${className} bg-[#2C3D18]`}
        data-testid="avatar"
        style={{ height, width }}
      >
        <svg viewBox="0 0 44 44" data-testid="initials">
          <title>{displayName(user)}</title>
          <text
            x="50%"
            y="53%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="currentcolor"
          >
            {displayName(user).charAt(0).toUpperCase()}
          </text>
        </svg>
      </div>
    </>
  )
}

export { Avatar }
