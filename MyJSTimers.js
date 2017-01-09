module.exports = {
  requestAnimationFrame: function() {
    console.log('this is it!!!');
  },
  cancelAnimationFrame: function() {
    console.log('this the other one');
  }
}
