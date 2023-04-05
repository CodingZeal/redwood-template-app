import { Archive } from './Archive'
import { Arrow } from './Arrow'
import { Check } from './Check'
import { Eye } from './Eye'
import { Gear } from './Gear'
import { Github } from './Github'
import { Pen } from './Pen'
import { Twitter } from './Twitter'

export interface IIcon {
  name:
    | 'archive'
    | 'arrow'
    | 'check'
    | 'eye'
    | 'gear'
    | 'github'
    | 'pen'
    | 'twitter'
  className?: string
  width?: string
  height?: string
}

const Icon = ({ name, className = '', width, height }: IIcon): JSX.Element => {
  switch (name.toLowerCase()) {
    case 'archive':
      return <Archive className={className} width={width} height={height} />
    case 'arrow':
      return <Arrow className={className} width={width} height={height} />
    case 'check':
      return <Check className={className} width={width} height={height} />
    case 'eye':
      return <Eye className={className} width={width} height={height} />
    case 'gear':
      return <Gear className={className} width={width} height={height} />
    case 'github':
      return <Github className={className} width={width} height={height} />
    case 'pen':
      return <Pen className={className} width={width} height={height} />
    case 'twitter':
      return <Twitter className={className} width={width} height={height} />
    default:
      return <div />
  }
}

export { Icon }
