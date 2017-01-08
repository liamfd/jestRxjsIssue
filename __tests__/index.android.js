// NOT ADDING RAF TO GLOBAL:
// import rx from 'rxjs';
// import React from 'react';
// import Index from '../index.android.js';
// import renderer from 'react-test-renderer';
// var requestAnimationFrame = require('fbjs/lib/requestAnimationFrame');
// var thing = require('react-native/Libraries/Animated/src/AnimatedImplementation');
// var requestAnimationFrame = require('fbjs');
// var thing = require('fbjs/lib/nativeRequestAnimationFrame');
// var thing = require('react-native/ReactAndroid');

// CONTAINS THE CULPRIT, DOES NOT ADD RAF TO GLOBAL
// import thing from 'react-native/Libraries/Core/Timers/JSTimers'; // <- defines it @ 108

// ADDING RAF TO GLOBAL
// import 'react-native';
import thing from 'react-native/Libraries/Core/initializeCore'; // <- adds to global @ 137
// it tries to do the same with cAF, but doesn't seem to be working


// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  // console.log('raf:', global.requestAnimationFrame)
  // console.log('caf:', global.cancelAnimationFrame)
  // if (typeof thing !== 'undefined') console.log('thing:', thing);

  // console.log(global.requestAnimationFrame());
  // console.log(global.cancelAnimationFrame());



  // const tree = renderer.create(
  //   <Index />
  // );
});
