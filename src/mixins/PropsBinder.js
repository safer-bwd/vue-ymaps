import _keys from 'lodash/fp/keys'
import binderFactory from '../utils/propBinderFactory'

export default {
  created () {
    this.$_ymaps_boundProps = []
  },

  beforeDestroy () {
    this.unbindProps()
  },

  methods: {
    bindProps (props) {
      if (!this.isYMapsObj()) {
        return
      }

      const usedPropNames = _keys(this.$options.propsData)
      if (props.length === 0 || usedPropNames.length === 0) {
        return
      }

      props
        .filter(prop => usedPropNames.includes(prop.name))
        .forEach(prop => this.bindProp(prop))
    },

    bindProp ({ name, type }) {
      if (!this.isYMapsObj()) {
        return
      }

      if (this.isPropBound(name)) {
        return
      }

      const options = {
        propName: name,
        propType: type,
        ymapsObj: this.getYMapsObj(),
        vueComp: this
      }
      const binder = binderFactory.create(options)
      const unbind = binder.bind()

      this.$_ymaps_boundProps.push({ name, unbind })
    },

    unbindProps () {
      if (this.$_ymaps_boundProps.length === 0) {
        return
      }

      this.$_ymaps_boundProps.forEach(p => p.unbind())
      this.$_ymaps_boundProps = []
    },

    isPropBound (name) {
      const found = this.$_ymaps_boundProps
        .find(p => p.name === name)
      return found !== undefined
    }
  }
}
