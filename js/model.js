//Model

Game.Model = function(width, height) {
  this._grid = this.createGrid(width,height);
}

// 2dim grid with inital value
Array.matrix = function(num_columns, num_rows, initial) {
  var a, i, j, mat = [];
  for(i = 0; i < num_rows; i++) {
    a = [];
    for(j = 0; j < num_columns; j++) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
}

Game.Model.prototype.createGrid = function(width, height) {
  var grid = Array.matrix(width, height, false); // add initial value false to indicate dead cell
  return grid;
}

Game.Model.prototype.getColumns = function() {
  return this._grid[0].length;
}

Game.Model.prototype.getRows = function() {
  return this._grid.length;
}

Game.Model.prototype.setCell = function(row, col, value) {
  this._grid[row][col] = value;
}

Game.Model.prototype.getCell = function(row,col) {
  return this._grid[row][col];
}

Game.Model.prototype.updateGridState = function()  {
  var numNeighbours;
  var cellAlive = true;
  var cellDead = false;
  var minNeighbours = 2;
  var maxNeighbours = 3;
  var numNeighboursToGetAlive = 3;
  var nextGenGrid = Array.matrix(this.getColumns(), this.getRows());

  for(var row = 0; row < this.getRows(); row++) {
    for(var col = 0; col < this.getColumns(); col++) {
      numNeighbours = countNeighbours(row, col, this._grid, cellDead, cellAlive);
      if(this._grid[row][col] === cellDead) {
        if(numNeighbours === numNeighboursToGetAlive) {
          nextGenGrid[row][col] = cellAlive;
        } else {
          nextGenGrid[row][col] = cellDead;
        }
      } else {
        if(numNeighbours >= minNeighbours && numNeighbours <= maxNeighbours) {
          nextGenGrid[row][col] = cellAlive;
        } else {
          nextGenGrid[row][col] = cellDead;
        }
      }
    }
  }
  this._grid = nextGenGrid;
}

// defining modolo operation
var getModRow = function(row, grid) {
  return ((row % grid.length) + grid.length) % grid.length;
}

var getModCol = function(row, col, grid) {
  return ((col % grid[row].length) + grid[row].length) % grid.length;
}

var countNeighbours = function(y, x, grid, cellDead, cellAlive) {
  var total = 0;
  var neighbours = [];

  // top
  var neighbourTop = grid[ getModRow( y - 1, grid ) ][ x ];
  var neighbourDiagTopLeft = grid[ getModRow( y - 1, grid ) ][ getModCol( y, x - 1, grid ) ];
  var neighbourDiagTopRight = grid[ getModRow( y - 1, grid ) ][ getModCol( y, x + 1, grid ) ];

  // bottom
  var neighbourBottom = grid[ getModRow( y + 1, grid ) ][x];
  var neighbourDiagBottomLeft = grid[ getModRow( y + 1, grid ) ][ getModCol( y, x - 1, grid ) ];
  var neighbourDiagBottomRight = grid[ getModRow( y + 1, grid ) ][ getModCol( y, x + 1, grid ) ];

  // right
  var neighbourRight = grid[y][ getModCol( y, x + 1, grid ) ];

  // left
  var neighbourLeft = grid[y][ getModCol( y, x - 1, grid ) ];

  neighbours.push(neighbourTop, neighbourDiagTopLeft, neighbourDiagTopRight, neighbourBottom, neighbourDiagBottomLeft, neighbourDiagBottomRight, neighbourRight, neighbourLeft);

  for(var i in neighbours) {
    if(neighbours[i] == cellAlive) {
      total+= 1;
    }
  }
  return total;
}


