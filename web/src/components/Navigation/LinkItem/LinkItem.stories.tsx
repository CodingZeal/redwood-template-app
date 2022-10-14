import { LinkItem } from './LinkItem'

const Template = (args) => <LinkItem {...args} />

export const Users = Template.bind({})
Users.args = { to: '/admin/users', children: 'Users' }

export const EditProfile = Template.bind({})
EditProfile.args = { to: '/profile', children: 'Edit Profile' }

export default { title: 'Components/LinkItem' }
