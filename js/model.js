//Model

Game.Model = function(width, height) {
  this._grid = this.createGrid(width,height);
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
};

// driver test
// var matrix = Array.matrix(4,4,0);
// console.log(matrix);
