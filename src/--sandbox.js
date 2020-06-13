/**
 * @namespace Sandbox
 */

var Sandbox = {
  Player: require('./player'),
};

//   Merge in the consts
// Phaser = Extend(false, Phaser, CONST);

//  Export it
module.exports = Sandbox;
global.Sandbox = Sandbox;

/*
 * "Documentation is like pizza: when it is good, it is very, very good;
 * and when it is bad, it is better than nothing."
 *  -- Dick Brandon
 */
