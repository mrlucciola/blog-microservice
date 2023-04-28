FROM node:alpine

WORKDIR /app

# add workspace config
COPY *.json ./

# add app source & config
COPY ./services/event-bus/*.json ./services/event-bus/
COPY ./services/event-bus/src ./services/event-bus/src

# add common source & config
COPY ./common ./common
RUN rm -rf common/*/dist*

# install packages
RUN yarn install --pure-lockfile

WORKDIR /app/services/event-bus

# build typescript
RUN yarn build

USER node

EXPOSE 8085

# start in dev mode
ENTRYPOINT ["yarn", "start"]