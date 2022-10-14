import { EditProfile } from './EditProfile'

const Template = (args) => {
  return <EditProfile {...args} />
}

export const EmptyProfile = Template.bind({})
EmptyProfile.args = { profile: {} }

const profile = {
  name: 'Mulder',
  nickname: 'Spooky Mulder',
  pronouns: 'he/him',
  email: 'mulder@example.com',
}
export const FilledProfile = Template.bind({})
FilledProfile.args = { profile }

export default { title: 'Components/Profile/EditProfile' }
