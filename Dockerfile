# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 14 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
#
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

#
# TS -> transpilation to JS in dist/
#
FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build

#
# npm ci with producation NODE_ENV
# to get node_modules without dev dependencies
#
FROM node:14-alpine as npm-container

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/cert/ /home/node/cert/

RUN npm ci

###
### Slim Node Image
###
FROM mhart/alpine-node:slim-14 as node-container

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=npm-container /home/node/package*.json /home/node/
COPY --from=npm-container /home/node/dist ./dist
COPY --from=npm-container /home/node/cert ./cert
COPY --from=npm-container /home/node/node_modules ./node_modules

EXPOSE 3000/tcp

CMD ["node", "dist/main"]
