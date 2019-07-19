import keys from 'lodash.keys';
import binderFactory from '../utils/propBinderFactory';

export default {
  created () {
    this.$_ymaps_boundProps = [];
  },

  beforeDestroy () {
    this.unbindProps();
  },

  methods: {
    bindProps (props) {
      if (!this.isYMapsObj()) {
        return;
      }

      const usedPropNames = keys(this.$options.propsData);
      if (props.length === 0 || usedPropNames.length === 0) {
        return;
      }

      props
        .filter(p => usedPropNames.includes(p.name))
        .forEach(p => this.bindProp(p));
    },

    bindProp ({ name, type }) {
      const ymapsObj = this.getYMapsObj();
      if (!ymapsObj) {
        return;
      }

      if (this.isPropBound(name)) {
        return;
      }

      const options = {
        propName: name,
        propType: type,
        ymapsObj,
        vueComp: this
      };
      const binder = binderFactory.create(options);
      const unbind = binder.bind();

      this.$_ymaps_boundProps.push({ name, unbind });
    },

    unbindProps () {
      if (this.$_ymaps_boundProps.length === 0) {
        return;
      }

      this.$_ymaps_boundProps.forEach(p => p.unbind());
      this.$_ymaps_boundProps = [];
    },

    isPropBound (name) {
      return !!this.$_ymaps_boundProps.find(p => p.name === name);
    }
  }
};
