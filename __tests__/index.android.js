// require('react-native');

const defineLazyObjectProperty = require('defineLazyObjectProperty');

const defineLazyTimer = name => {
  defineLazyObjectProperty(global, name, {
    get: () => {
      const thing = require('JSTimers')[name];
      if (name === 'requestAnimationFrame') debugger;

      return thing;
    },
    enumerable: true,
    writable: true,
  });
};
defineLazyTimer('requestAnimationFrame');
defineLazyTimer('cancelAnimationFrame');

it('has a defined requestAnimationFrame', () => {
  expect(global.requestAnimationFrame).toBeDefined();
});

it('has a defined cancelAnimationFrame', () => {
  expect(global.cancelAnimationFrame).toBeDefined();
});
