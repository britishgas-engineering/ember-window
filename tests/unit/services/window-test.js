import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:window', 'Unit | Service | window');

test('.get(key)', function (assert) {

  var service = this.subject();

  window.myProperty = '';
  assert.equal(service.get('myProperty'), window.myProperty, 'can retrieve custom properties');

  assert.equal(service.get('location'), window.location, 'can retrieve native window properties');

  delete window.myProperty;

});

test('.set(key, value)', function (assert) {

  var count = 0;

  var service = this.subject();
  var object = Ember.Object.extend({
    service: service,
    computedProperty: Ember.computed('service.myProperty', function () {
      count++;
      return !!this.get('service.myProperty');
    })
  }).create();

  window.myProperty = '';

  assert.throws(() => {
    service.set(
      'myUnknownProperty',
      'Can\'t set new property on window using service:window',
      'should fail for CREATE operations'
    );
  });

  service.set('myProperty', 'should pass');

  assert.equal(
    service.get('myProperty'),
    'should pass',
    'should succeed for UDPATE operations'
  );

  assert.ok(object.get('computedProperty'), 'Computed properties work');
  object.get('computedProperty');

  assert.equal(count, 1, 'The computed properties are still cached as expected');

  service.set('myProperty', null);
  object.get('computedProperty');

  assert.equal(count, 2, 'The computed properties are notified of changes');

  delete window.myProperty;

});
