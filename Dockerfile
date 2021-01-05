FROM node:14.13.1-buster

LABEL maintainer="shipper@spin.app"

ARG SRC_DIR=.

COPY  $SRC_DIR /server
WORKDIR /server
RUN npm i
RUN npm run build

ENTRYPOINT ["./entrypoint.sh"]