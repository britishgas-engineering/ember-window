# Ember-window

This service exists as a layer on top of the javascript `window` Object, to be able to mock it easily in tests (without mocking this service in tests, the `https://localhost:4200/tests` page would be redirected when using `window.location.href=xxx` in our code). It may also be useful if we want to run the app outside a browser at some point . In this service we can `get` and `set` the properties applied to the `window` Object, so this allows observing them / adding CPs if ever needed.

Usage is the same as for the javascript `window` Object:

instead of:

```
window.location.href = '/Your_Account/Account_Details/';
```

use:

```js
window: Ember.inject.service(),
..
this.get('window.location').href = '/Your_Account/Account_Details/';
```

In your tests, you can use something like:

```js
// tests/helpers/start-app.js
export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    let windowService;

    application = Application.create(attributes);
    windowService = application.resolveRegistration('service:window');

    // Mock the window service
    windowService.reopen({
      windowObject: {
        location: {
          pathname: 'my-account',
          href: null
        }
      }
    });

    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
```

