# Spin App

Poc for Firestore

## About

Comments support

## Technologies used

    - Node.js(Koa)/Next(React)
    - Firebase/Firestore

## ENV variables

```shell

    # Firebase
    FIREBASE_DATABASE_URL="https://spinapp-poc.firebaseio.com"
    FIREBASE_PROJECT_ID="spinapp-poc"

    # App envs
    APP_HOST="https://spinapp-poc.ngrok.io"

    # ENV settings
    NODE_ENV="development"
    PORT=3000
```

## How to use via Proxy

    - Start ngrok via ngrok http 3000 -subdomain=spinapp-poc
        `./ngrok http 3000 -subdomain=spinapp-poc -bind-tls=true`

## Repository structure
