import plugin from '../';

export default {
  methods: {
    readyYMapsApi () {
      return plugin.ymapsReady();
    }
  }
};
