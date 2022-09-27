#!/bin/bash

export DATABASE_URL=postgresql://postgres:development@localhost:5432/redwood_dev

if [[ "$1" == "testdb" ]]; then
  export DATABASE_URL=postgresql://postgres:test@localhost:5433/redwood_test
fi

yarn rw prisma migrate reset
