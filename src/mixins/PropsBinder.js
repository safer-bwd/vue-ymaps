import keys from 'lodash.keys';
import bind from '../utils/bind-prop';

export default {
  created () {
    this.$_ymaps_boundProps = [];
  },

  beforeDestroy () {
    this.unbindProps();
  },

  methods: {
    bindProps (props) {
      const usedPropNames = keys(this.$options.propsData);
      if (props.length === 0 || usedPropNames.length === 0) {
        return;
      }

      props
        .filter(p => usedPropNames.includes(p.name))
        .forEach(p => this.bindProp(p));
    },

    bindProp (prop) {
      const ymapsObj = this.getYMapsObj();
      if (!ymapsObj) {
        return;
      }

      const { name } = prop;
      if (this.isPropBound(name)) {
        return;
      }

      const unbind = bind(prop, this, ymapsObj);
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
