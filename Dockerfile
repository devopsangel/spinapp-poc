FROM node:14.7.0-buster

LABEL maintainer="zookeeper@zoocommerce.tech"

COPY  . /server
WORKDIR /server
RUN npm i
RUN npm run build

# CMD ["npm", "run", "start"]
ENTRYPOINT ["./entrypoint.sh"]