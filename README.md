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

## 📄 Github Templates

To make creating new issues and pull requests easy and consistent, we have templates for the different use cases when creating an issue or pull request. You can find them in the `.github` directory.

### Notes

---

- Helpful for github [workflow development](https://github.com/nektos/act)
  - ex: `act -j playwright` runs single job
