#!/bin/bash

# Run with ./scripts/db-prepare.sh <service>

DATABASE_NAME=redwood_test
export DATABASE_URL=postgresql://postgres:test@localhost:5433/redwood_test

if [[ ! "$1" ]]; then
  echo "Please signify a database <db|testdb>"
  exit 1
fi

if [[ "$1" == "db" ]]; then
  DATABASE_NAME=redwood_dev
  export DATABASE_URL=postgresql://postgres:development@localhost:5432/redwood_dev
fi

echo "Preparing [$DATABASE_NAME]"

if [[ "$1" == "db" && "$2" != "-f" ]]; then
  read -p "Volume will be deleted. Are you sure? (y|n) " -n 1 -r

  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted"
    exit 1
  fi
fi

# 1. Bring ALL services down and cleanup orphans
docker compose down --remove-orphans

# 2. Stop / Remove all db instance and volumes
docker compose rm -sf "$1"

# 3. Remove testdb data volume
docker volume rm $(docker volume ls | grep "$DATABASE_NAME" | awk '{print $2}')

# 2. Bring back up testdb
docker compose up -d "$1"

# 3. Migrate yarn rw prisma migrate dev
yarn rw prisma migrate dev

# 4. Seed yarn rw prisma db seed
yarn rw prisma db seed
