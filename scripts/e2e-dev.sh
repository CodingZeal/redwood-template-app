#!/bin/bash

yarn db:test:prepare &&
# Sleep for 5 to let rw start
npx concurrently 'yarn rw dev' 'sleep 5 && yarn web:e2e:dev'
