FROM node:alpine

WORKDIR /app

# add workspace config
COPY *.json ./

# add app source & config
COPY ./services/moderation/*.json ./services/moderation/
COPY ./services/moderation/src ./services/moderation/src

# add common source & config
COPY ./common ./common
RUN rm -rf common/*/dist*

# install packages
RUN yarn install --pure-lockfile

WORKDIR /app/services/moderation

# build typescript
RUN yarn build

USER node

EXPOSE 8083

# start in dev mode
ENTRYPOINT ["yarn", "start"]