export const PORTS = {
  posts: 8080,
  comments: 8081,
  query: 8082,
  moderation: 8083,
  eventBus: 8085,
};
export const HOSTNAMES = {
  posts: "http://posts-clusterip-srv",
  eventBus: "http://event-bus-srv",
};

export const HOST_ADDR_EVENT_BUS = `${HOSTNAMES.eventBus}:${PORTS.eventBus}`;
export const HOST_ADDR_POSTS = `${HOSTNAMES.posts}:${PORTS.posts}`;
