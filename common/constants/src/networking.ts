export const PORTS = {
  posts: 8080,
  comments: 8081,
  query: 8082,
  moderation: 8083,
  eventBus: 8085,
};

export const HOST_ADDR_EVENT_BUS = `http://event-bus-srv:${PORTS.eventBus}`;
