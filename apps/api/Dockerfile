# Base image
FROM node:20-alpine AS base
WORKDIR /app
COPY ./package.json ./package.json

FROM base AS builder
WORKDIR /app
COPY . .
RUN apk add --no-cache git \
  && npm install -g pnpm turbo \
  && turbo prune --scope=api --docker \
  && pnpm install \
  && turbo build --filter=api 

CMD pnpm run start
