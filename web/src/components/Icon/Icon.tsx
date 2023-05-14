import { Addition } from './Addition'
import { Archive } from './Archive'
import { Arrow } from './Arrow'
import { Check } from './Check'
import { Email } from './Email'
import { Eye } from './Eye'
import { Github } from './Github'
import { Lock } from './Lock'
import { Logout } from './Logout'
import { Pen } from './Pen'
import { Profile } from './Profile'
import { Security } from './Security'
import { Twitter } from './Twitter'

export interface IIcon {
  name:
    | 'addition'
    | 'archive'
    | 'arrow'
    | 'check'
    | 'email'
    | 'eye'
    | 'github'
    | 'lock'
    | 'logout'
    | 'pen'
    | 'profile'
    | 'security'
    | 'twitter'
  className?: string
  width?: string
  height?: string
}

const Icon = ({ name, className = '', width, height }: IIcon): JSX.Element => {
  switch (name.toLowerCase()) {
    case 'addition':
      return <Addition className={className} width={width} height={height} />
    case 'archive':
      return <Archive className={className} width={width} height={height} />
    case 'arrow':
      return <Arrow className={className} width={width} height={height} />
    case 'check':
      return <Check className={className} width={width} height={height} />
    case 'email':
      return <Email className={className} width={width} height={height} />
    case 'eye':
      return <Eye className={className} width={width} height={height} />
    case 'github':
      return <Github className={className} width={width} height={height} />
    case 'lock':
      return <Lock className={className} width={width} height={height} />
    case 'logout':
      return <Logout className={className} width={width} height={height} />
    case 'pen':
      return <Pen className={className} width={width} height={height} />
    case 'profile':
      return <Profile className={className} width={width} height={height} />
    case 'security':
      return <Security className={className} width={width} height={height} />
    case 'twitter':
      return <Twitter className={className} width={width} height={height} />
    default:
      return <div />
  }
}

export { Icon }
