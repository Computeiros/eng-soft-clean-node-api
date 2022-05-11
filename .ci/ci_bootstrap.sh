#!/bin/sh

echo "Yarn Install"
(yarn install)

echo "Yarn Audit"
(yarn audit)

echo "Lint Code"
(yarn lint)

echo "Run migrations"
(yarn prisma migrate deploy)

echo "Run Tests"
(yarn test:all)
