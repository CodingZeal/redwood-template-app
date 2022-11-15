<!-- template[tags(markdown),replace(redwood-template-app:${app_name})] -->
# 🌲 $~$ redwood-template-app

*This is a template application using RedwoodJS. It establishes common patterns for creating an app quickly.*

---

&nbsp;

## 🧑‍💻 $~$ Additional Core Components

The following is a list of frameworks, utilities, libraries, components, etc... that have been added to the template to streamline the development experience.

- 🏷️ $~$ [TypeScript](https://www.typescriptlang.org/)
- 🗃️ $~$ [PostgreSQL](https://www.postgresql.org/)
- 🚢 $~$ [Docker](https://www.docker.com/)
- 💄 $~$ [TailwindCSS](https://tailwindcss.com/)

---

&nbsp;

## ✨ $~$ Features

The following is a list of features this template has

- [Authentication](#authentication)
  - [Email Account Verification](#email-account-verification)
  - [Account Creation by Administrator](#account-creation-by-administrator)
- [Multi-Tenancy](#multi-tenancy)
  - [Data Structure](#data-structure)
  - [Implementation Strategies](#implementation-strategies)
- [Authorization](#authorization)
- [User Profile](#user-profile)
- [Email System](#email-system)
- [Database](#database)
- [Testing Framework and Philosophy](#testing-framework-and-philosophy)
  - [Unit Testing](#unit-testing)
  - [Feature/End-to-End Testing](#featureend-to-end-testing)
- [Administration UI](#administration-ui)

### Authentication

Authentication follows the [dbAuth provider](https://redwoodjs.com/docs/auth/dbauth) as part of [RedwoodJS](https://redwoodjs.com/docs/authentication). On top of that we have added the following features:

#### Email Account Verification

We default to having the email address be the login username. We verify users are the owner of the email address with the following process.

Upon account creation via the Sign Up flow, we add a verification token to the users account. The user can then use the application on this initial sign-up. At the same time we email the user with a verification link.

If the user tries to login to the application, before verifying they will receive a "Needs Verification" message and will be forwarded to a form to have them sent the verification email again.

Once they click that link, they will be allowed access to the application after the initial account setup.

#### Account Creation by Administrator

When an administrator creates an account, the new user will receive an email that contains a link to the application for them to establish an account. On the backend, when the account is created, it is created with a random password and a password reset token is set.

Clicking the link in the email will take them to a page to create a password for their account and then allows them to use the application. This clears the token and sets a new password in the backend.

### Multi-Tenancy

Multi-Tenancy is the ability for the application to have users be separated by different tenants. This way one tenant could be kept hidden from another. The reason we support this out of the box is it's difficult to add in later if the data isn't structured in a way to support it.

While we haven't implemented much with multi-tenancy, we do take care of it when creating and maintaining accounts. The data is structured in a way that will make it easier to implement multi-tenant solutions.

#### Data Structure

A user can have multiple memberships. A membership connects a user to a team and roles (for more role information see the section on Authorization).

#### Implementation Strategies

We have left it open to the implementers how they want to handle the multi-tenancy. There are two big strategies to choose from:

1. Team membership - With this method the UI is a little more flexible. The user can see what teams they are a part of and can switch between them with ease.
1. White-labeling - This is a little more rigid where a user usually only belongs to one tenant. Usually there is some custom branding per tenant and there isn't a way to switch between tenants. Usually this is established via a sub-domain (e.g. myteam.app.com)

Which ever you choose the data structure should be able to handle it. What it can't handle is if you want to implement both at the same time. If that is something you require a more complicated data structure will need to be created.

### Authorization

Authorization somewhat follows the [RedwoodJS RDAC documentation](https://redwoodjs.com/docs/how-to/role-based-access-control-rbac). We have tweaked it to support multi-tenancy (see above) and along with that a whole application level "super admin".

Roles are aggregated from all memberships the user is a part of. They are a "super admin" if their user has the `admin` attribute set. You can see how the roles are put together in the `getCurrentUser` function of the `api/src/lib/auth.ts` file. And see how we validate a role via the `hasRole` function in the same file.

### User Profile

Along with all the user authentication and authorization handling, we have added profile management. This allows a user to manage their account information. Currently this is limited to basic information like name, email, etc and password reset.

### Email System

In order to send users email for their forgotten passwords, account creation, and verification we have added mail handling via `nodemailer` under the hood. In order to use this, set your environment variables as you see in the `.env.example` file:

```
DOMAIN=<Domain, which will form the base links>
SMTP_HOST=<SMTP Host Server>
SMTP_PORT=<SMTP Port>
SMTP_USER=<SMTP User>
SMTP_KEY=<SMTP Key>
```

### Database

We have chosen to use PostgreSQL as our defacto database. You can change this, but will require some tweaks to make things work (like our UUIDs).

You can view the [database design](https://dbdiagram.io/d/62e3cd87f31da965e83e5d90) to see how we implement our multi-tenancy approach.

Along with that we have also decided to use UUIDs instead of auto incremented integers for all row identification.

You can modify the `schema.prisma` file to add anything to the database. If you make changes to what is there, you may need to tweak things in the code in order to get all the different features working.

### Testing Framework and Philosophy

This is a brief description of your testing frameworks and the philosophy behind how and what we test. Over all we put most of our testing effort into unit tests while we focus on happy path for our feature tests.

We use the built in setup that [RedwoodJS](https://redwoodjs.com/docs/testing#redwood-and-testing) has implemented on the unit testing side and have implemented [Playwright](https://playwright.dev/) on the feature testing side

#### Unit Testing

We strive to testing things in isolation and not test anything that is tested via other means. This is especially true for any dependencies we may be using. While we aren't going for 100% coverage we do want to cover as much as we can. We also want to provide placeholders and patterns for future development to easily continue.

Tests are located next to the files they are testing. Making it easy to find associated tests. We nest `describe` blocks for context when certain setup or data is required. Some tests are placeholders, in that they only make sure the thing being tested doesn't throw any errors. These are in place to add tests when the code becomes more involved.

File Naming Example:
```
web/src/components/Navigation/Navigation.tsx
web/src/components/Navigation/Navigation.test.tsx
```

Testing Example:
```js
describe('UserFormTeams', () => {

  // Placeholder
  it('renders successfully', () => {
    expect(<UserFormTeams />).not.toThrow()
  })

  // Context block
  describe('when a value is not selected', () => {
    const renderComponent = () =>
      render(
        <Form>
          <UserFormTeams
            roleIds={[]}
            roles={standard().roles}
            roleValue={jest.fn()}
            teamIds={[]}
            teams={standard().teams}
          />
        </Form>
      )

    it('renders Add Team button', () => {
      renderComponent()
      const element = screen.getByRole('button', { name: 'Add Team' })

      expect(element).toBeInTheDocument()
    })
  })
})
```

**Tools:**

- [RedwoodJS](https://redwoodjs.com/docs/testing#redwood-and-testing) built in tools
  - Jest
  - React Testing Library
  - Mock Service Worker
- Run with: `yarn test`
  - Spins up a postgres docker container for the test database
  - Runs all tests in watch mode
  - See root `package.json` for more commands
- Global mocks are made available via `*.mock.ts` files
  - Make sure you don't include anything that shouldn't be globally mocked

#### Feature/End-to-End Testing

Feature testing is brittle and a pain to maintain. In order to make this easier we only keep happy path tests around.

**Tools:**

- [Playwright](https://playwright.dev/)
- Run with: `yarn test:e2e`
- Files located: `web/tests`

### Administration UI

The administration section allows the "super admin" to edit the users, teams, and roles.

- `/admin` section that holds all crud operations for the application
  - `/admin/roles` CRUD operations for roles
  - `/admin/users` CRUD operations for users
  - `/admin/teams` CRUD operations for teams

---

&nbsp;

## 🧱 $~$ Development Setup

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

---

&nbsp;

## ⚡️ $~$ Quickstart

```bash
# install dependencies
yarn install

# setup .env
cp .env.example .env

# start dev server and database
# Your browser should automatically open to <http://localhost:8910>.
yarn dev

# (first run) run command in a separate terminal to setup database and seed data
yarn db:setup
```

*See the other helper scripts in the [package.json](/package.json)*

---

&nbsp;

## 🔍 $~$ Testing

```bash
# unit tests
yarn test # <api|web>
yarn test:watch # <api|web>

# end to end. note: first run? use --init flag
# see ./scripts/playwright.ts for more info
yarn test:e2e <--init|--debug|--reset|--playwright>

```

---

&nbsp;

## 🌱 $~$ Data and Migrations

```bash
# Run migrations on a newly changed schema
yarn db:migrate:dev

# Reset the mistake
yarn db:reset

# Seed data
yarn db:seed

# To create data-centric migrations (different than schema migrations)
# https://redwoodjs.com/docs/data-migrations
yarn rw generate dataMigration <data_migration>

# Excute data migrations
yarn db:migrate:data

# Execute deployment migrations
yarn db:migrate:deploy

# Run both data and deployment migrations
yarn db:deploy
```

---

&nbsp;

## 🚀 $~$ **Deployment on Heroku**

- ### 🚑 $~$ *REVERT DEPLOYMENT!*

  - `heroku releases:info --remote staging|prod` or `--app <app_name>`
  - `heroku rollback v<X>`

&nbsp;

- ### ⚡️ $~$ *REVERT DATABASE!*

  - You can't yet. We need to setup backups.
  - Last resort `DATABASE_URL=<CONNECTION-STRING> yarn rw prisma db reset` (you *will* lose all the data)

---

&nbsp;

### **Please note:* The pipelines can take a few min and may not reflect the current state at times*

&nbsp;

- Heroku "review apps" can be triggered for any branch in the 'pipeline' section of heroku
  - Review apps' database is ephemeral and will migrate / seed on each trigger
  - Review apps can be "promoted" but this is discouraged. PR into staging and let it auto deploy
  - The naming pattern for review apps is `redwood-temp-app-pr-<PR number>`
- Migrations are run automatically for staging and prod
- Deployment to staging occurs automatically from the staging branch
- Deployment to production occurs automatically from the main branch
- Manual Deployment (see notes below)
- Heroku configuation exists in `app.json` as well as the `Procfile`

---

&nbsp;

### 👀 $~$ **Heroku Notes**

- Redwood deployments in heroku need to be managed by a process manager and requests proxied via NGINX
- NGINX must have its config named and placed in [`config/nginx.config.erb`](/config/nginx.config.erb)
- PM2 is the process manager, initialization can be found in the root [`index.js`](/index.js) file.
- `@redwoodjs/api-server` was added to facilitate proxing the api requests and a `proxyPath` is set in the [`redwood.toml`](/redwood.toml) for NGINX to use

```bash
# Login to heroku
heroku login

# Setup remotes for manual deploys
heroku git:remote -a redwood-template-app

# (optional) heroku names new remotes 'heroku by default'
git remote rename heroku prod|staging|etc

# push and deploy via heroku git
git push heroku main

# Show app logs example. replace -a name with your app name
# i.e. redwood-template-app
heroku logs --tail -a redwood-template-app
```

---

&nbsp;

## 📝 $~$ Notes

- Helpful for github [workflow development](https://github.com/nektos/act)
  - ex: `act -j playwright` runs single job

---

&nbsp;

- ### 👊 $~$ **Heroku**

```bash
# Deploying other branches
git push heroku <branchname>:main

# buildpacks
heroku buildpacks --remote <staging|prod>
heroku buildpacks:<add|remove> heroku-community/nginx --remote staging
```

- ### 📄 $~$ Github Templates

To make creating new issues and pull requests easy and consistent, we have templates for the different use cases when creating an issue or pull request. You can find them in the [`.github`](/.github) directory.
