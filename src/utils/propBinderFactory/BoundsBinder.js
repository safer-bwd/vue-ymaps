import PropBinder from './PropBinder';

class BoundsBinder extends PropBinder {
  constructor (options) {
    super(options);
  }

  getYMapsChangeEventName () {
    return `boundschange`;
  }
}

export default BoundsBinder;
