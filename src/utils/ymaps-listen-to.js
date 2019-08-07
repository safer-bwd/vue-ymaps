// https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/IEventManager-docpage
export default (obj, eventName, callback) => {
  const eventManager = obj.events.add(eventName, callback);
  return () => eventManager.remove(eventName, callback);
};
