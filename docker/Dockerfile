FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package*.json /usr/src/app/

RUN apk add --no-cache make gcc g++ python3 && \
  yarn install && \
  apk del make gcc g++ python3

COPY . .

CMD ["yarn", "start:dev"]