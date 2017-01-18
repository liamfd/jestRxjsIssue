// grabbed from https://github.com/facebook/react-native/blob/a6844bdf7589b38297328e69f61e2986a129ab30/Libraries/Utilities/defineLazyObjectProperty.js
function defineLazyObjectProperty(
  object,
  name,
  descriptor,
){
  const {get} = descriptor;
  const enumerable = descriptor.enumerable !== false;
  const writable = descriptor.writable !== false;

  let value;
  let valueSet = false;
  let counter = 0;
  function getValue() {
    // WORKAROUND: A weird infinite loop occurs where calling `getValue` calls
    // `setValue` which calls `Object.defineProperty` which somehow triggers
    // `getValue` again. Adding `valueSet` breaks this loop.

    if (!valueSet) {
      setValue(get());
    }
    return get();
  }
  function setValue(newValue) {
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

// grabbed from https://github.com/facebook/react-native/blob/4252ac75eaf04aa9d57027e91bf7665717ed4eab/Libraries/Core/InitializeCore.js#L129
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
it('has a defined requestAnimationFrame', () => {
  if (global.requestAnimationFrame) global.requestAnimationFrame();
  expect(global.requestAnimationFrame).toBeDefined(); // passes
});

it('has a defined cancelAnimationFrame', () => {
  if (global.cancelAnimationFrame) global.cancelAnimationFrame();
  expect(global.cancelAnimationFrame).toBeDefined(); // fails
});
