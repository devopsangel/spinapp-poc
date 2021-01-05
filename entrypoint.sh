#!/bin/bash

echo "FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL" > .env
echo "FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" >> .env
echo "APP_HOST=$APP_HOST" >> .env
echo "NODE_ENV=$NODE_ENV" >> .env

npm run start