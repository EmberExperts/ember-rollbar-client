## Module Report
### Unknown Global

**Global**: `Ember.onerror`

**Location**: `addon/services/rollbar.js` at line 56

```js
  registerLogger() {
    if (this.get('enabled')) {
      let oldOnError = Ember.onerror || function() {};

      Ember.onerror = (...args) => {
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `addon/services/rollbar.js` at line 58

```js
      let oldOnError = Ember.onerror || function() {};

      Ember.onerror = (...args) => {
        oldOnError(...args);
        this.error(...args);
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/unit/services/rollbar-test.js` at line 61

```js
  });
  service.registerLogger();
  Ember.onerror('foo');
});

```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/unit/services/rollbar-test.js` at line 75

```js
    }
  });
  Ember.onerror = function(message) {
    assert.ok(true, 'previous hook is called');
    assert.equal(message, 'foo', 'error is passed to previous hook as argument');
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/unit/services/rollbar-test.js` at line 80

```js
  };
  service.registerLogger();
  Ember.onerror('foo');
});

```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/unit/services/rollbar-test.js` at line 93

```js
    }
  });
  Ember.onerror = function() {
    assert.ok(true);
  };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/unit/services/rollbar-test.js` at line 97

```js
  };
  service.registerLogger();
  Ember.onerror();
})

```
