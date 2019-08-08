import plugin from '../';

export default {
  methods: {
    readyYMaps () {
      return plugin.ymapsReady();
    }
  }
};
