import { Loading, Failure, Success } from './EditProfileCell'
import { standard } from './EditProfileCell.mock'

export const loading = (args) => {
  return Loading ? <Loading {...args} /> : null
}

export const failure = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : null
}

export const success = (args) => {
  return Success ? <Success {...standard()} {...args} /> : null
}

export default { title: 'Cells/ProfileCell' }
