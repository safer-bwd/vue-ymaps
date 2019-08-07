import plugin from '../';

export default {
  methods: {
    getYMapsApi () {
      return plugin.ymapsReady();
    }
  }
};
