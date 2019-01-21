import _keys from 'lodash/fp/keys'
import _upperFirst from 'lodash/upperFirst'
import _isEqual from 'lodash/isEqual'

class PropBinder {
  constructor (options) {
    const { propName, vueComp, ymapsObj } = options
    this.propName = propName
    this.vueComp = vueComp
    this.ymapsObj = ymapsObj
  }

  bind () {
    this.vueComp.$watch(() => this.getVueVal(),
      (newVal) => { this.setYMapsVal(newVal) })

    if (!this.needTwoWay()) {
      return
    }

    const eventName = this.getYMapsChangeEventName()
    this.vueComp.addYMapsEventListener(eventName, () => {
      const ymapsVal = this.getYMapsVal()
      const vueVal = this.getVueVal()
      if (_isEqual(ymapsVal, vueVal)) {
        return
      }
      this.vueComp.$emit(`update:${this.propName}`, ymapsVal)
    })
  }

  needTwoWay () {
    const eventName = `update:${this.propName}`
    return (eventName in this.vueComp.$listeners)
  }

  getVueVal () {
    return this.vueComp[this.propName]
  }

  getYMapsVal () {
    const getterName = `get${_upperFirst(this.propName)}`
    return this.ymapsObj[getterName]()
  }

  setYMapsVal (val) {
    const setterName = `set${_upperFirst(this.propName)}`
    this.ymapsObj[setterName](val)
  }

  getYMapsChangeEventName () {
    return `${this.propName}change`
  }
}

class BoundsPropBinder extends PropBinder {
  constructor (options) {
    super(options)
  }

  getYMapsChangeEventName () {
    return `boundschange`
  }
}

const createPropBinder = (options) => {
  const { propType } = options

  switch (propType) {
    case 'bounds':
      return new BoundsPropBinder(options)
    default:
      return new PropBinder(options)
  }
}

export default {
  methods: {
    bindProps (props) {
      if (!props.length || !this.isYMapsObj()) {
        return
      }

      props
        .filter(({ name }) => {
          return _keys(this.$options.propsData).includes(name)
        })
        .forEach(prop => {
          this.bindProp(prop)
        })
    },

    bindProp (prop) {
      if (!this.isYMapsObj()) {
        return
      }

      const { name: propName, type: propType } = prop

      const binder = createPropBinder({
        propName,
        propType,
        ymapsObj: this.getYMapsObj(),
        vueComp: this
      })
      binder.bind()
    },
  }
}
