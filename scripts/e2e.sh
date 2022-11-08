#!/bin/bash

export DATABASE_URL=postgresql://postgres:test@localhost:5433/redwood_test

docker compose down

docker volume rm redwood-template-app_redwood_test

yarn testdb:daemon
yarn db:setup
# yarn rw g secret
yarn build

export SESSION_SECRET=foobarbaz
yarn test:e2e
