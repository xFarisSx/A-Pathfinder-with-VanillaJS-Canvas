class Cell {
  constructor(position, size, color, gPos) {
    this.size = size;
    this.color = color;
    this.position = position;
    this.gPos = gPos;
    this.h = null;
    this.g = null;
    this.f = null;
    this.type = "normal";
    this.connection = null;
  }

  equals(pos) {
    return this.gPos[0] == pos[0] && this.gPos[1] == pos[1];
  }

  getDistance(c) {
    let dist = [
      Math.abs(this.gPos[0] - c.gPos[0]),
      Math.abs(this.gPos[1] - c.gPos[1]),
    ];

    let lowest = Math.min(dist[0], dist[1]);
    let highest = Math.max(dist[0], dist[1]);

    let horizontalMovesRequired = highest - lowest;

    return lowest * 14 + horizontalMovesRequired * 10;
  }

  getNeigbors() {
    let neigbors = [];

    if (this.gPos[0] > 0) {
      neigbors.push(grid.getCell([this.gPos[0] - 1, this.gPos[1]]));

      if (this.gPos[1] > 0) {
        neigbors.push(grid.getCell([this.gPos[0] - 1, this.gPos[1] - 1]));
      }
      if (this.gPos[1] < grid.height - 1) {
        neigbors.push(grid.getCell([this.gPos[0] - 1, this.gPos[1] + 1]));
      }
    }

    if (this.gPos[0] < grid.width - 1) {
      neigbors.push(grid.getCell([this.gPos[0] + 1, this.gPos[1]]));

      if (this.gPos[1] > 0) {
        neigbors.push(grid.getCell([this.gPos[0] + 1, this.gPos[1] - 1]));
      }
      if (this.gPos[1] < grid.height - 1) {
        neigbors.push(grid.getCell([this.gPos[0] + 1, this.gPos[1] + 1]));
      }
    }

    if (this.gPos[1] > 0) {
      neigbors.push(grid.getCell([this.gPos[0], this.gPos[1] - 1]));
    }
    if (this.gPos[1] < grid.height - 1) {
      neigbors.push(grid.getCell([this.gPos[0], this.gPos[1] + 1]));
    }

    return neigbors;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position[0], this.position[1], this.size, this.size);
  }

  setType(type) {
    this.type = type;

    if (type == "start") this.setColor(startColor);
    if (type == "end") this.setColor(endColor);
    if (type == "obstacle") this.setColor(obstacleColor);
    if (type == "path") this.setColor(pathColor);
  }

  setConnection(cell) {
    this.connection = cell;
  }

  setColor(color) {
    this.color = color;
  }

  setG(g) {
    this.g = g;

    this.calculateF();
  }

  setH(h) {
    this.h = h;

    this.calculateF();
  }

  calculateF() {
    this.f = this.g + this.h;
  }
}
