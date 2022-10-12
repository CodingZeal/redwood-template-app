import { NavLink } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="admin__link-item" className="mr-3 cursor-pointer">
    <NavLink activeClassName="bg-orange-300" {...props}>
      {props.children}
    </NavLink>
  </li>
)

export { LinkItem }
