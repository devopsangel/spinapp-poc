FROM node:14.7.0-buster

LABEL maintainer="zookeeper@zoocommerce.tech"

ARG SRC_DIR=.

COPY  $SRC_DIR /server
WORKDIR /server
RUN npm i
RUN npm run build

CMD ["npm", "run", "start"]
