import { NavLink } from '@redwoodjs/router'

const LinkItem = ({ children, ...props }) => {
  const { to, ...rest } = props
  return (
    <li data-testid="admin__link-item" className="mr-3 cursor-pointer">
      <NavLink activeClassName="bg-orange-300" to={to} {...rest}>
        {children}
      </NavLink>
    </li>
  )
}

export { LinkItem }
