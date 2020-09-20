FROM node:12.18.4-stretch-slim as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY src/. src/.

RUN npm run build

FROM node:12.18.4-stretch-slim as deploy
WORKDIR /app

COPY --from=build /app/lib /app/lib
COPY --from=build /app/node_modules /app/node_modules

CMD ["node", "/app/lib/index.js"]