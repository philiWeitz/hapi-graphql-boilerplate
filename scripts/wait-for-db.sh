#!/bin/bash
# wait-for-postgres.sh

until nc -z db 5432; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd