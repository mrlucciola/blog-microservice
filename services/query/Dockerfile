FROM node:alpine

WORKDIR /app

# add workspace config
COPY *.json ./

# add app source & config
COPY ./services/query/*.json ./services/query/
COPY ./services/query/src ./services/query/src

# add common source & config
COPY ./common ./common
RUN rm -rf common/*/dist*

# install packages
RUN yarn install --pure-lockfile

WORKDIR /app/services/query

# build typescript
RUN yarn build

USER node

EXPOSE 8082

# start in dev mode
ENTRYPOINT ["yarn", "start"]