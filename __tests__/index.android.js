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
      setValue(get());
    }
    return get();
  }
  function setValue(newValue: T): void {
    value = newValue;
    valueSet = true;

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
defineLazyTimer('requestAnimationFrame');
defineLazyTimer('cancelAnimationFrame');

it('has a defined requestAnimationFrame', () => {
  if (global.requestAnimationFrame) console.log(global.requestAnimationFrame());
  expect(global.requestAnimationFrame).toBeDefined(); // passes
});

it('has a defined cancelAnimationFrame', () => {
  if (global.cancelAnimationFrame) console.log(global.cancelAnimationFrame());
  expect(global.cancelAnimationFrame).toBeDefined(); // fails
});
