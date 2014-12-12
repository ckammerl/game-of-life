// Controller

Game.Controller = function(view, model, canvas) {
  this._canvas = canvas;
  this._view = view;
  this._model = model;
  var canvasWidth = canvas.attributes.width.value;
  var canvasHeight = canvas.attributes.height.value;
  var gridColumns = this._model.getColumns();
  var gridRows = this._model.getRows();
  this._cellDimX = Math.floor(canvasWidth / gridColumns);
  this._cellDimY = Math.floor(canvasHeight / gridRows);
  this._canvas.addEventListener("click", this.clickHandler.bind(this));
  this.initGridCanvas();
  this._timer;
  this._timerActive = false;
  $("#run_animation").on("click", this.startTimerAnimation.bind(this));
  $("#reset_game").on("click", this.resetGame.bind(this));
}


Game.Controller.prototype.initGridCanvas = function() {
  this._view.drawGridCanvas(this._model);
  this._view.drawCellsCanvas(this._model);
}

Game.Controller.prototype.clickHandler = function(event) {
  var canvasOffset = $(this._canvas).offset();
  var canvasClickXPos = event.pageX - canvasOffset.left;
  var canvasClickYPos = event.pageY - canvasOffset.top;
  var clickedCellX = Math.floor(canvasClickXPos / this._cellDimX);
  var clickedCellY = Math.floor(canvasClickYPos / this._cellDimY);

  var clickedCellValue = this._model.getCell(clickedCellY, clickedCellX);
  var updatedClickedCellValue = !clickedCellValue;
  this._model.setCell(clickedCellY, clickedCellX, updatedClickedCellValue);
  this._view.drawCellsCanvas(this._model);
}

Game.Controller.prototype.startTimerAnimation = function() {
  if(this._timerActive === false) {
    var TimerCallback = function() {
      this.runAnimation();
    };
    this._timer = setInterval(TimerCallback.bind(this), 500);
    this._timerActive = true;
  } else {
    this.stopTimerAnimation();
    this._timerActive = false;
  };
}

Game.Controller.prototype.runAnimation = function() {
  this._model.updateGridState();
  this._view.drawCellsCanvas(this._model);
}

Game.Controller.prototype.stopTimerAnimation = function () {
  clearInterval(this._timer);
}

Game.Controller.prototype.resetGame = function() {
  var newUserInputGridWidth = 20
  var newUserInputGridHeight = 20
  var newCanvas = $('#canvas').attr({width: 400, height: 400});
  new_controller = new Game.Controller(new Game.View(newCanvas[0]), new Game.Model(newUserInputGridWidth, newUserInputGridHeight), newCanvas[0]);
}
