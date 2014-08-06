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
}

Game.Controller.prototype.initGridCanvas = function() {
  this._view.drawGridCanvas(this._model);
  this._view.drawCellsCanvas(this._model);
}

Game.Controller.prototype.clickHandler = function(event) {
  var canvasClickXPos = event.pageX - this._canvas.offsetLeft;
  var canvasClickYPos = event.pageY - this._canvas.offsetTop;
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