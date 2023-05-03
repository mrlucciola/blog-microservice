export const PORTS = {
  posts: 8080,
  comments: 8081,
  query: 8082,
  moderation: 8083,
  eventBus: 8085,
};

export const HOSTNAMES = {
  posts: {
    external: "http://posts.docker",
    internal: "http://posts-srv",
  },
  comments: {
    external: "http://posts.docker",
    internal: "http://comments-srv",
  },
  eventBus: { internal: "http://event-bus-srv" },
  moderation: { internal: "http://moderation-srv" },
  query: {
    external: "http://posts.docker",
    internal: "http://query-srv",
  },
};

export const HOST_ADDR_MODERATION = `${HOSTNAMES.moderation.internal}:${PORTS.moderation}`;
export const HOST_ADDR_EVENT_BUS = `${HOSTNAMES.eventBus.internal}`;
export const HOST_ADDR_POSTS_EXTERNAL = `${HOSTNAMES.posts.external}`;
export const HOST_ADDR_POSTS_INTERNAL = `${HOSTNAMES.posts.internal}:${PORTS.posts}`;
export const HOST_ADDR_COMMENTS_EXTERNAL = `${HOSTNAMES.comments.external}`;
export const HOST_ADDR_COMMENTS_INTERNAL = `${HOSTNAMES.comments.internal}:${PORTS.comments}`;
export const HOST_ADDR_QUERY_EXTERNAL = `${HOSTNAMES.query.external}`;
export const HOST_ADDR_QUERY_INTERNAL = `${HOSTNAMES.query.internal}:${PORTS.query}`;
