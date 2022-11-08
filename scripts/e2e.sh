#!/bin/bash

export DATABASE_URL=postgresql://postgres:test@localhost:5433/redwood_test

docker compose down
docker volume rm redwood-template-app_redwood_test

yarn testdb:daemon

yarn rw prisma migrate dev

yarn build

npx playwright test -c web/playwright.config.ts --trace on --workers 1
