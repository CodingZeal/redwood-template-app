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
    { name: 'Edit Email', path: () => routes.editEmail() },
    { name: 'Edit Password', path: () => routes.editPassword() },
    { name: 'Edit Profile', path: () => routes.profile() },
  ],
  AUTH: [
    { name: 'Login', path: () => routes.login() },
    { name: 'Signup', path: () => routes.signup() },
  ],
}

Object.freeze(NAVIGATION)

export { NAVIGATION }
