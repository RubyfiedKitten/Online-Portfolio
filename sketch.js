let cols, rows;
let tileSize = 50;
let colors;
let grid;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-container');
  cols = width / tileSize;
  rows = height / tileSize;

  colors = [
    color(248, 113, 113), // Red
    color(56, 189, 248),  // Blue
    color(74, 222, 128),  // Green
    color(253, 224, 71)   // Yellow
  ];

  // Initialize grid with random colors
  grid = Array(cols).fill().map(() => 
    Array(rows).fill().map(() => ({
      originalColor: random(colors),
      currentColor: null,
      time: 0
    }))
  );
}

function draw() {
  background(50);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * tileSize;
      let y = j * tileSize;

      if (grid[i][j].currentColor) {
        fill(grid[i][j].currentColor);
        grid[i][j].time -= deltaTime;
        if (grid[i][j].time <= 0) {
          grid[i][j].currentColor = null;
        }
      } else {
        fill(50);
      }

      stroke(200);
      rect(x, y, tileSize, tileSize);
    }
  }
}

function mouseMoved() {
  let i = floor(mouseX / tileSize);
  let j = floor(mouseY / tileSize);

  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    if (!grid[i][j].currentColor) {
      grid[i][j].currentColor = grid[i][j].originalColor;
      grid[i][j].time = 1500;
    }
  }
}
