class Pathfinder {
  constructor() {
    this.path = [];
  }

  findPath(startPoint, endPoint) {
    let inSearch = [grid.getCell(startPoint)];
    let closed = [];

    grid.resetG();

    grid.getCell(startPoint).setG(0);
    grid
      .getCell(startPoint)
      .setH(grid.getCell(startPoint).getDistance(grid.getCell(endPoint)));

    while (inSearch.length > 0) {
      let current = inSearch[0];
      inSearch.forEach((t) => {
        t.setColor(startColor);
        if (t.f < current.f || (t.f == current.f && t.h < current.h))
          current = t;
      });

      closed.push(current);
      current.setColor(closedColor);
      inSearch.filter((c) => {
        return !c.equals(current.gPos);
      });

      if (current.equals(endPoint)) {
        let currentPathTile = grid.getCell(endPoint);
        let path = [];

        while (!currentPathTile.equals(startPoint)) {
          path.push(currentPathTile);
          currentPathTile = currentPathTile.connection;
        }
        path.push(currentPathTile);

        return path;
      }

      current.getNeigbors().forEach((n) => {
        if (n.type !== "obstacle" && !closed.includes(n)) {
          let searching = inSearch.includes(n);

          let costToN = current.g + current.getDistance(n);

          if (!searching || costToN < n.g) {
            n.setG(costToN);
            n.setConnection(current);

            if (!searching) {
              n.setH(n.getDistance(grid.getCell(endPoint)));
              inSearch.push(n);
              console.log(n);
            }
          }
        }
      });
    }
  }
}
