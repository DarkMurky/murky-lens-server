FROM node:22.12.0-slim

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl && apt-get clean

COPY . .

RUN npm ci

RUN npm run build

EXPOSE ${PORT}

CMD npm run prisma-migrate-prod && npm run start
