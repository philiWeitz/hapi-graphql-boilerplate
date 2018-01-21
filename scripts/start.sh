
echo ""

if [ "$NODE_ENV" == "production" ]
then
    echo "Starting production server..."
    yarn
else
    echo "Starting debug server..."
    yarn migrate:dev
    yarn seed:dev
    yarn start-debug
fi