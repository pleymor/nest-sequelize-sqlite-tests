#
# Base build image
#
FROM node:16-alpine as base-build

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./

#
# Prod Libs
#
FROM base-build as install-prod-libs
RUN npm ci --only=production

#
# Dev Libs
#
FROM install-prod-libs as install-dev-libs
RUN npm ci --prefer-offline

#
# sources
#
FROM install-dev-libs as src

COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY src ./src

#
# tests (does not need transpilation to JS)
#
FROM src as tests

COPY test ./test
RUN npm run test
RUN npm run test:e2e

#
# transpilation to JS in dist/
#
FROM src as make-dist

RUN npm run build

#
# Runtime
#
FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /home/node

RUN apk --no-cache add shadow
RUN usermod -u 1000 node
RUN groupmod -g 1000 node

COPY --from=make-dist /home/node/dist ./dist
COPY --from=install-prod-libs /home/node/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
