// namespace
Game = {}
//===================================================================================

// initializer

$(document).ready(function() {
  var userInputGridWidth = 10; //$('#width').val()
  var userInputGridHeight = 10; //$('#height').val()
  var canvas = $('<canvas/>').attr({width: 320, height: 320}).appendTo('body');
  var controller = new Game.Controller(new Game.View(canvas[0]), new Game.Model(userInputGridWidth, userInputGridHeight), canvas[0]);
});
