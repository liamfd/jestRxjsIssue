module.exports = {
  requestAnimationFrame: function() {
    console.log('this is request!');
  },
  cancelAnimationFrame: function() {
    console.log('this is cancel!');
  }
}
