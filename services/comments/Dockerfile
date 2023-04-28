FROM node:alpine

WORKDIR /app

# add workspace config
COPY *.json ./

# add app source & config
COPY ./services/comments/*.json ./services/comments/
COPY ./services/comments/src ./services/comments/src

# add common source & config
COPY ./common ./common
RUN rm -rf common/*/dist*

# install packages
RUN yarn install --pure-lockfile

WORKDIR /app/services/comments

# build typescript
RUN yarn build

USER node

EXPOSE 8081

# start in dev mode
ENTRYPOINT ["yarn", "start"]