import _keys from 'lodash/fp/keys'
import binderFactory from '../utils/propBinderFactory'

export default {
  methods: {
    bindProps (props) {
      if (!this.isYMapsObj()) {
        return
      }

      const usedProps = _keys(this.$options.propsData)
      if (!props.length || !usedProps.length) {
        return
      }

      props
        .filter(prop => usedProps.includes(prop.name))
        .forEach(prop => this.bindProp(prop))
    },

    bindProp (prop) {
      if (!this.isYMapsObj()) {
        return
      }

      const options = {
        propName: prop.name,
        propType: prop.type,
        ymapsObj: this.getYMapsObj(),
        vueComp: this
      }

      const binder = binderFactory.create(options)
      binder.bind()
    },
  }
}
