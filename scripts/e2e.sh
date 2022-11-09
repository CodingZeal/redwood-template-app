#!/bin/bash

if [ "$1" != "--skip" ]; then
  export DATABASE_URL=postgresql://postgres:test@localhost:5433/redwood_test
  docker-compose rm -s testdb
  docker volume rm redwood-template-app_redwood_test
  yarn testdb:daemon
  yarn rw prisma migrate dev
  yarn rw prisma db seed
fi

yarn test:e2e:ci
