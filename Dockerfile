FROM node:22.12.0-slim

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG PORT
ARG NODE_ENV

ENV DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@192.168.1.67:5432/mydb?schema=public"

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl && apt-get clean

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3001

CMD npm run prisma-migrate-prod && npm run start


