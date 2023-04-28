FROM node:alpine

WORKDIR /app

# add workspace config
COPY *.json ./

# add app source & config
COPY services/posts/*.json ./services/posts/
COPY services/posts/src ./services/posts/src

# add common source & config
COPY common/ ./common/
RUN rm -rf common/*/dist*

# install packages
RUN yarn install --pure-lockfile

WORKDIR /app/services/posts

# build typescript
RUN yarn build

USER node

EXPOSE 8080

# start in dev mode
ENTRYPOINT ["yarn", "start"]