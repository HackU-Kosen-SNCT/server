FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache make gcc g++ python3 && \
  yarn install && \
  apk del make gcc g++ python3

