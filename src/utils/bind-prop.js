import upperFirst from 'lodash.upperfirst';
import isEqual from 'lodash.isequal';
import listenTo from './ymaps-listen-to';

const getter = (propName) => `get${upperFirst(propName)}`;
const setter = (propName) => `set${upperFirst(propName)}`;

const defaultGetterVue = (vue, name) => vue[name];
const defaultSetterVue = (vue, name, val) => vue.$emit(`update:${name}`, val);
const defaultGetterYMaps= (ymaps, name) => ymaps[getter(name)]();
const defaultSetterYMaps= (ymaps, name, val) => ymaps[setter(name)](val);

const bindOptions = {
  boundary: {
    updateEventYMaps: 'boundschange'
  },
  geometry: {
    getterYMaps: (ymaps, name) => ymaps.geometry[getter(name)](),
    setterYMaps: (ymaps, name, val) => ymaps.geometry[setter(name)](val),
    updateEventYMaps: 'geometrychange',
  },
  options: {
    getterVue: vue => vue.options,
    getterYMaps: (ymaps) => ymaps.options.getAll(),
    setterYMaps: (ymaps, name, val) => ymaps.options.set(val),
    updateEventYMaps: 'optionschange'
  }
};

export default (prop, vue, ymaps) => {
  const { type, name } = prop;

  const {
    getterVue = defaultGetterVue,
    setterVue = defaultSetterVue,
    updateEventVue = `update:${name}`,
    getterYMaps = defaultGetterYMaps,
    setterYMaps = defaultSetterYMaps,
    updateEventYMaps = `${name}change`,
  } = bindOptions[type] || {};

  const getVue = () => getterVue(vue, name);
  const setVue = val => setterVue(vue, name, val);
  const getYMaps = () => getterYMaps(ymaps, name);
  const setYMaps = val => setterYMaps(ymaps, name, val);

  const unwatchVue = vue.$watch(getVue, setYMaps, {
    deep: true
  });

  const needTwoWay = (updateEventVue in vue.$listeners);
  if (!needTwoWay) {
    return () => unwatchVue();
  }

  const unwatchYMaps = listenTo(ymaps, updateEventYMaps, () => {
    const valYMaps = getYMaps();
    const valVue = getVue();
    const changed = !isEqual(valYMaps, valVue);
    if (changed) {
      setVue(valYMaps);
    }
  });

  return () => {
    unwatchVue();
    unwatchYMaps();
  };
};
