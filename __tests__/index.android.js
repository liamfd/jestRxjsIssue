function defineLazyObjectProperty<T>(
  object: Object,
  name: string,
  descriptor: {
    get: () => T,
    enumerable?: boolean,
    writable?: boolean,
  },
): void {
  const {get} = descriptor;
  const enumerable = descriptor.enumerable !== false;
  const writable = descriptor.writable !== false;

  let value;
  let valueSet = false;
  let counter = 0;
  function getValue(): T {
    // WORKAROUND: A weird infinite loop occurs where calling `getValue` calls
    // `setValue` which calls `Object.defineProperty` which somehow triggers
    // `getValue` again. Adding `valueSet` breaks this loop.

    if (!valueSet) {
      debugger;

      setValue(get());
    }
    return get();
  }
  function setValue(newValue: T): void {
    value = newValue;
    valueSet = true;

    debugger;

    Object.defineProperty(object, name, {
      value: newValue,
      configurable: true,
      enumerable,
      writable,
    });
  }

  Object.defineProperty(object, name, {
    get: getValue,
    set: setValue,
    configurable: true,
    enumerable,
  });
}


const defineLazyTimer = name => {
  defineLazyObjectProperty(global, name, {
    get: () => require('../MyJSTimers')[name],
    writable: true,
    enumerable: true,
  });
};
defineLazyTimer('cancelAnimationFrame');
defineLazyTimer('requestAnimationFrame');

// switching the order of the references switches which one of these gets properly defined.
// the first one REFERENCED goes through, the rest dont.
it('has a defined cancelAnimationFrame', () => {
  if (global.cancelAnimationFrame) global.cancelAnimationFrame();
  expect(global.cancelAnimationFrame).toBeDefined(); // fails
});

it('has a defined requestAnimationFrame', () => {
  if (global.requestAnimationFrame) global.requestAnimationFrame();
  expect(global.requestAnimationFrame).toBeDefined(); // passes
});
