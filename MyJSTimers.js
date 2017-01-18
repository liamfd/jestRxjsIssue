module.exports = {
  cancelAnimationFrame: function() {
    console.log('this is cancel!');
  },
  requestAnimationFrame: function() {
    console.log('this is request!');
  },
}
