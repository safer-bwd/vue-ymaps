import loadYMaps from './utils/load-ymaps';
import createEnum from './utils/create-enum';

const Status = createEnum([
  'NOT_LOAD',
  'LOADING',
  'LOADED',
  'ERROR'
]);

const plugin = {
  name: 'vue-ymaps',

  ymaps: {
    status: Status.NOT_LOADED,
    api: null,
    error: null,
    options: {}
  },

  subscribers: [],

  async install (Vue, options = {}) {
    const { loadImmediate = true } = options;

    this.ymaps.options = options;
    if (loadImmediate) {
      this.loadYMaps();
    }
  },

  ymapsReady () {
    const { api, status, error} = this.ymaps;

    if (status === Status.LOADED) {
      return Promise.resolve(api);
    } else if (status === Status.ERROR) {
      return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
      this.subscribers.push({ resolve, reject });
    });
  },

  async loadYMaps () {
    const { status, options } = this.ymaps;
    if (status === Status.LOADED || status === Status.LOADING) {
      return;
    }

    this.ymaps.status = Status.LOADING;

    try {
      this.ymaps.api = await loadYMaps(options);
      this.ymaps.status = Status.LOADED;
    } catch (err) {
      this.ymaps.error = err;
      this.ymaps.status = Status.ERROR;
    }

    this._notify();
  },

  _notify () {
    const { api, status, error} = this.ymaps;

    switch (status) {
      case Status.LOADED:
        this.subscribers.forEach(s => s.resolve(api));
        break;
      case Status.ERROR:
        this.subscribers.forEach(s => s.reject(error));
        break;
    }

    this.subscribers = [];
  }
};

export default plugin;
