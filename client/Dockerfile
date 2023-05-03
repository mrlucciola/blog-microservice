# MUST BE RUN FROM PROJECT ROOT:
# i.e. docker build -t mrlucciola/client:latest -t mrlucciola/client:0.1.0 ../.. --file Dockerfile

FROM node:alpine

# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

# add workspace config
COPY *.json ./

# add app source & config
COPY ./client/*.json ./client/
COPY ./client/src ./client/src
COPY ./client/public ./client/public

# add common source & config
COPY ./common ./common
RUN rm -rf common/*/dist*

# install packages
# RUN yarn install --pure-lockfile

# experimental - add node_modules
COPY ./node_modules ./node_modules
COPY ./yarn.lock ./yarn.lock
COPY ./client/node_modules ./client/node_modules

WORKDIR /app/client

# build typescript
RUN yarn build:ts

USER node

EXPOSE 3000

# start in dev mode
CMD ["yarn", "start"]
