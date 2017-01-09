const defineLazyObjectProperty = require('defineLazyObjectProperty');

const defineLazyTimer = name => {
  defineLazyObjectProperty(global, name, {
    get: () => require('../MyJSTimers')[name],
    enumerable: true,
    writable: true,
  });
};
defineLazyTimer('requestAnimationFrame');
defineLazyTimer('cancelAnimationFrame');

it('has a defined requestAnimationFrame', () => {
  expect(global.requestAnimationFrame).toBeDefined(); // passes
});

it('has a defined cancelAnimationFrame', () => {
  expect(global.cancelAnimationFrame).toBeDefined(); // fails
});
