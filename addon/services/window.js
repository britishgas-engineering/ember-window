import Ember from 'ember';

export default Ember.Service.extend({
  // stub this to another Object when testing
  windowObject: window,

  /**
   * Get the value of an unknown property
   * directly from the window object
   * @param  {String} key   property key
   * @return {Any}          property value
   */
  unknownProperty(key) {
    let mockWindow = this.get('windowObject');

    return mockWindow[key];
  },

  /**
   * Set the value of an unknown property
   * on the window object and trigger a
   * property change accordingly
   * @param {String} key  property name
   * @param {Any} value   value to set
   * @return {Any}        the original (passed) value
   */
  setUnknownProperty(key, value) {
    let mockWindow = this.get('windowObject');

    if (key in mockWindow) {
      // Only create/update the key if the new value is not
      // equal to the old value
      if (!Ember.isEqual(mockWindow[key], value)) {
        mockWindow[key] = value;
        this.notifyPropertyChange(key);
      }
    } else {
      Ember.assert('Can\'t set new property on window using service:window');
    }
    return value;
  }

});
