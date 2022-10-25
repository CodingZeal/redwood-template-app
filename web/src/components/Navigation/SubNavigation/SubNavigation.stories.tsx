import { LinkItem } from '../LinkItem/LinkItem'

import { SubNavigation } from './SubNavigation'

const Template = (children) => {
  return <SubNavigation {...children} />
}

const children = [
  <LinkItem to="/admin/users" key="1">
    Users
  </LinkItem>,
  <LinkItem to="/admin/roles" key="2">
    Roles
  </LinkItem>,
  <LinkItem to="/admin/teams" key="3">
    Teams
  </LinkItem>,
]
export const AdminSubNav = Template.bind({})
AdminSubNav.args = { children }

export default { title: 'Components/SubNavigation' }
