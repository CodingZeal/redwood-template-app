import { routes } from '@redwoodjs/router'

const NAVIGATION = {
  SCHEMAS: [
    { name: 'Users', path: () => routes.adminUsers() },
    { name: 'Teams', path: () => routes.adminTeams() },
    { name: 'Roles', path: () => routes.adminRoles() },
  ],
  DOCUMENTATION: [
    { name: 'ZEAL', path: 'https://codingzeal.com' },
    { name: 'RedwoodJS', path: 'https://redwoodjs.com' },
    {
      name: 'Lumberstack Docs',
      path: 'https://github.com/CodingZeal/redwood-template-app',
    },
  ],
  ADMIN: [
    { name: 'Admin', path: () => routes.adminUsers() },
    { name: 'My Profile', path: () => routes.profile() },
  ],
}

Object.freeze(NAVIGATION)

export { NAVIGATION }
