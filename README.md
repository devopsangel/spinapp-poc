# Turtle

Zoocommerce app built on Shopify platform.

## About

Supports inventory products aging.

## Technologies used

    - Node.js(Express)/Next(React)
    - Firebase/Firestore

## ENV variables

```js
    # Shopify ENVs
    SHOPIFY_API_KEY=""
    SHOPIFY_API_SECRET_KEY=""
    SHOPIFY_API_VERSION="2020-10"

    # Firebase
    FIREBASE_DATABASE_URL="https://zookeeper.firebaseio.com"
    FIREBASE_PROJECT_ID="zookeeper"

    # App envs
    APP_HOST="https://turtle.ngrok.io"
    APP_BILLING_CONFIRM_URL="https://turtle.ngrok.io/billing/activate"
    APP_TEST_CHARGE=true
    APP_WEBHOOKS_TOPICS="app/uninstalled,orders/updated,products/create,products/update,products/delete"
    APP_SCOPE="read_products,write_products,read_orders,write_orders"

    # ENV settings
    NODE_ENV="development"
    PORT=3000
```

## How to use

    - Start ngrok via ngrok http 3000 -subdomain=turtle
        `./ngrok http 3000 -subdomain=turtle -bind-tls=true`

## Repository structure
