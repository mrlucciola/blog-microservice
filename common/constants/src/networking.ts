export const PORTS = {
  posts: 8080,
  comments: 8081,
  query: 8082,
  moderation: 8083,
  eventBus: 8085,
};

export const HOSTNAMES = {
  posts: {
    external: "http://posts-clusterip-srv",
    internal: "http://posts-srv",
  },
  comments: {
    external: "http://comments-clusterip-srv",
    internal: "http://comments-srv",
  },
  eventBus: { internal: "http://event-bus-srv" },
};

export const HOST_ADDR_EVENT_BUS = `${HOSTNAMES.eventBus.internal}:${PORTS.eventBus}`;
export const HOST_ADDR_POSTS_EXTERNAL = `${HOSTNAMES.posts.external}:${PORTS.posts}`;
export const HOST_ADDR_POSTS_INTERNAL = `${HOSTNAMES.posts.internal}:${PORTS.posts}`;
export const HOST_ADDR_COMMENTS_EXTERNAL = `${HOSTNAMES.comments.external}:${PORTS.comments}`;
export const HOST_ADDR_COMMENTS_INTERNAL = `${HOSTNAMES.comments.internal}:${PORTS.comments}`;
