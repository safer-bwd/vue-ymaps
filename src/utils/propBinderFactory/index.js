import BoundsBinder from './BoundsBinder';
import StateBinder from './StateBinder';

export default {
  create: (options) => {
    const { propType } = options;

    switch (propType) {
      case 'bounds':
        return new BoundsBinder(options);
      case 'state':
        return new StateBinder(options);
      default:
        throw new Error(`Unknown type of prop: ${propType}`);
    }
  }
};
