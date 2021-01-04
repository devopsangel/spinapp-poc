FROM node:14.13.1-buster

LABEL maintainer="docker@spin.app"

COPY  $SRC_DIR /server
WORKDIR /server
RUN npm i
RUN npm run build

ENTRYPOINT ["./entrypoint.sh"]