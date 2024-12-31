FROM node:22.12.0-slim

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG DB_HOST

ENV DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:5432/mydb?schema=public"

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl && apt-get clean

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3001

CMD npm run prisma-migrate-prod && npm run start


