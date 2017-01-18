// grabbed from https://github.com/facebook/react-native/blob/292cc82d0ebc437a6f1cdd2e972b3917b7ee05a4/Libraries/Core/Timers/JSTimers.js#L108
module.exports = {
  cancelAnimationFrame: function() {
    console.log('this is cancel!');
  },
  requestAnimationFrame: function() {
    console.log('this is request!');
  },
}
