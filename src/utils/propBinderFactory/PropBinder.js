import upperFirst from 'lodash.upperfirst';
import isEqual from 'lodash.isequal';

class PropBinder {
  constructor ({ propName, vueComp, ymapsObj }) {
    this.propName = propName;
    this.vueComp = vueComp;
    this.ymapsObj = ymapsObj;
  }

  bind () {
    const unwatchVue = this.vueComp.$watch(() => this.getVueVal(),
      newVal => this.setYMapsVal(newVal));

    if (!this.needTwoWay()) {
      return () => unwatchVue();
    }

    const changeEventName = this.getYMapsChangeEventName();
    const unwatchYMaps = this.vueComp.addYMapsEventListener(changeEventName, () => {
      const ymapsVal = this.getYMapsVal();
      const vueVal = this.getVueVal();
      if (this.isEqual(ymapsVal, vueVal)) {
        return;
      }
      this.vueComp.$emit(`update:${this.propName}`, ymapsVal);
    });

    return () => {
      unwatchVue();
      unwatchYMaps();
    };
  }

  needTwoWay () {
    const eventName = `update:${this.propName}`;
    return (eventName in this.vueComp.$listeners);
  }

  getVueVal () {
    return this.vueComp[this.propName];
  }

  getYMapsVal () {
    const getterName = `get${upperFirst(this.propName)}`;
    return this.ymapsObj[getterName]();
  }

  setYMapsVal (val) {
    const setterName = `set${upperFirst(this.propName)}`;
    this.ymapsObj[setterName](val);
  }

  getYMapsChangeEventName () {
    return `${this.propName}change`;
  }

  isEqual (val1, val2) {
    return isEqual(val1, val2);
  }
}

export default PropBinder;
