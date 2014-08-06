// namespace
Game = {}
//===================================================================================

// initializer

$(document).ready(function() {
  var userInputGridWidth = 30 //$('#width').val()
  var userInputGridHeight = 30 //$('#height').val()
  var canvas = $('#canvas').attr({width: 600, height: 600});
  var controller = new Game.Controller(new Game.View(canvas[0]), new Game.Model(userInputGridWidth, userInputGridHeight), canvas[0]);
});
