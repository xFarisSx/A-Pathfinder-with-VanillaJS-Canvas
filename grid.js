class Grid {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cellNumber = this.width + this.height;
    this.cells = [];

    this.init();
  }

  init() {
    let color = "white";
    for (let i = 0; i < this.width; i++) {
      let cellRow = [];
      for (let j = 0; j < this.height; j++) {
        let pos = [1 + (this.cellSize + 1) * j, 1 + (1 + this.cellSize) * i];
        let gPos = [
          Math.floor((pos[0] / canvas.width) * this.width),
          Math.floor((pos[1] / canvas.height) * this.height),
        ];
        cellRow.push(new Cell(pos, this.cellSize, color, gPos));
      }
      this.cells.push(cellRow);
    }
  }

  resetG() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        let cell = this.cells[i][j];
        cell.setG(999999);
      }
    }
  }

  getCell(pos) {
    let cell = null;
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        cell =
          this.cells[i][j].gPos[0] == pos[0] &&
          this.cells[i][j].gPos[1] == pos[1]
            ? this.cells[i][j]
            : null;
        if (cell) {
          break;
        }
      }
      if (cell) {
        break;
      }
    }
    return cell;
  }

  update() {}
  draw(ctx) {
    // console.log(path);
    for (let i = 0; i < path.length; i++) {
      path[i].setType("path");
    }
    this.cells.forEach((r) =>
      r.forEach((c) => {
        c.draw(ctx);
      })
    );
  }
}
