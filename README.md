# redwood-template-app

This is a template application using RedwoodJS. It establishes common patterns for creating an app quickly.

## 🧑‍💻 Additional Core Components

The following is a list of frameworks, utilities, libraries, components, etc... that have been added to the template to streamline the development experience.

- 🗃️ [PostgreSQL](https://www.postgresql.org/)
- 🚢 [Docker](https://www.docker.com/)
- 💄 [TailwindCSS](https://tailwindcss.com/)

## 🧱 Development Setup

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

## ⚡️ Quickstart

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

# See extra helper scripts in package.json

```

## 🔍 Testing

```bash
# unit tests
yarn test # <api|web>
yarn test:watch # <api|web>

# end to end
yarn test:e2e

# run e2e in headed mode
yarn test:e2e --headed
```

## Data and Migrations

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

## 🚀 Deployment on Heroku

## *REVERT DEPLOYMENT!*

- `heroku releases:info --remote staging|prod` or `--app <app_name>`
- `heroku rollback v<X>`

## *REVERT DATABASE!*

- You can't yet. We need to setup backups.
- Last resort `DATABASE_URL=<CONNECTION-STRING> yarn rw prisma db reset` (you *will* lose all the data)

---

### **Please note:* The pipelines can take a few min and may not reflect the current state at times*

- Heroku "review apps" can be triggered for any branch in the 'pipeline' section of heroku
  - Review apps' database is ephemeral and will migrate / seed on each trigger
  - Review apps can be "promoted" but this is discouraged. PR into staging and let it auto deploy.
  - The naming pattern for review apps is `redwood-temp-app-pr-<PR number>`
- Migrations are run automatically for staging and prod. (TODO: document manual migrations)
- Deployment to staging occurs automatically from the staging branch
- Deployment to production occurs automatically from the main branch
- Manual Deployment (see notes below)
- Heroku configuation exists in `app.json` as well as the `Procfile`

### Heroku Notes

- Redwood deployments in heroku need to be managed by a process manager and requests proxied via NGINX
- NGINX must have its config named and placed in `config/nginx.config.erb`
- PM2 is the process manager, initialization can be found in the root `index.js` file.
- `@redwoodjs/api-server` was added to facilitate proxing the api requests and a `proxyPath` is set in the `redwood.toml` for NGINX to use

```bash
# Login to heroku
heroku login

# Setup remotes for manual deploys
heroku git:remote -a staging-redwood-template-app

# heroku names new remotes 'heroku by default'
git remote rename heroku staging

# push and deploy via heroku git
git push staging main

# NOTE: Use the same methods as above to setup prod

# Show app logs example. replace -a name with your app name
# i.e. staging-redwood-template-app
heroku logs --tail -a redwood-temp-app-pr-23

```

## 📄 Github Templates

To make creating new issues and pull requests easy and consistent, we have templates for the different use cases when creating an issue or pull request. You can find them in the `.github` directory.

### Notes

---

- Helpful for github [workflow development](https://github.com/nektos/act)
  - ex: `act -j playwright` runs single job

Heroku:

```bash
# Deploying other branches
git push heroku <branchname>:main

# buildpacks
heroku buildpacks --remote <staging|prod>
heroku buildpacks:<add|remove> heroku-community/nginx --remote staging


```
