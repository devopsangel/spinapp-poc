FROM node:14.13.1-buster

LABEL maintainer="zookeeper@zoocommerce.tech"

ARG SRC_DIR=.

ARG SHOPIFY_API_KEY_ARG=""
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY_ARG

COPY  $SRC_DIR /server
WORKDIR /server
RUN npm i
RUN npm run build

# CMD ["npm", "run", "start"]
ENTRYPOINT ["./entrypoint.sh"]