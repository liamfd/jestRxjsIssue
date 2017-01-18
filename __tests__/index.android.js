import 'react-native'; // <- adds to global @ 137

it('has a defined requestAnimationFrame', () => {
  if (global.requestAnimationFrame) global.requestAnimationFrame();
  expect(global.requestAnimationFrame).toBeDefined(); // passes
});

it('has a defined cancelAnimationFrame', () => {
  if (global.cancelAnimationFrame) global.cancelAnimationFrame();
  expect(global.cancelAnimationFrame).toBeDefined(); // fails
});
