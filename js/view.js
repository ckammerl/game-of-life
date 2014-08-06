//View

Game.View = function(canvas) {
  this._canvasContext = canvas.getContext('2d');
  this._canvasWidth = canvas.attributes.width.value;
  this._canvasHeight = canvas.attributes.height.value;
}

Game.View.prototype.drawGridCanvas = function(model) {
  var gridColumns = model.getColumns();
  var gridRows = model.getRows();
  var cellDimX = Math.floor(this._canvasWidth / gridColumns);
  var cellDimY = Math.floor(this._canvasHeight / gridRows);

  for (var x = 0; x <= this._canvasWidth; x += cellDimX) {
    this._canvasContext.moveTo(x, 0);
    this._canvasContext.lineTo(x, this._canvasHeight);
  }

  for (var y = 0; y <= this._canvasHeight; y += cellDimY) {
    this._canvasContext.moveTo(0, y);
    this._canvasContext.lineTo(this._canvasWidth, y);
  }

  this._canvasContext.strokeStyle = "#fffff";
  this._canvasContext.lineWidth = 0.5;
  this._canvasContext.stroke();
}

Game.View.prototype.drawCellsCanvas = function(model) {
  var gridColumns = model.getColumns();
  var gridRows = model.getRows();
  var cellDimX = Math.floor(this._canvasWidth / gridColumns);
  var cellDimY = Math.floor(this._canvasHeight / gridRows);

  for(var c = 0; c < gridColumns; c++) {
    for(var r = 0; r < gridRows; r++) {
      if(model.getCell(r,c) === false) {
        this._canvasContext.fillStyle = "green";
        this._canvasContext.fillRect(c * cellDimX + 1 , r * cellDimY + 1, cellDimX - 2, cellDimY - 2);
      } else {
        this._canvasContext.fillStyle = "black";
        this._canvasContext.fillRect(c * cellDimX + 1 , r * cellDimY + 1, cellDimX - 2, cellDimY - 2);
      }
    }
  }
}