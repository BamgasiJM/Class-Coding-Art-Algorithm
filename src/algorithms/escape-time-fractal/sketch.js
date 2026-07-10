export default function escapeTimeFractalSketch(p, size, params = {}) {
  let accentR, accentG, accentB;
  let time = 0;

  const P = {
    gridSize: () => params.gridSize ?? 60,
    baseMaxIter: () => params.baseMaxIter ?? 20,
    animSpeed: () => params.animSpeed ?? 0.3,
    xyMultiplier: () => params.xyMultiplier ?? 2.0,
    panX: () => params.panX ?? -0.75,
    panY: () => params.panY ?? 0.0,
    zoom: () => params.zoom ?? 1.0,
  };

  p.setup = function() {
    p.createCanvas(size, size);

    const accentColorStr = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
    const c = p.color(accentColorStr);
    accentR = p.red(c);
    accentG = p.green(c);
    accentB = p.blue(c);

    p.background(8, 8, 16);
    p.noStroke();
  };

  p.draw = function() {
    p.background(8, 8, 16);

    const currentGridSize = P.gridSize();
    const cellSize = size / currentGridSize;
    
    time += P.animSpeed();
    const currentMaxIter = P.baseMaxIter() + p.floor(time) % 40;

    const startColor = p.color(20, 20, 35);
    const endColor = p.color(accentR, accentG, accentB);
    const insideColor = p.color(8, 8, 16);

    const xyMult = P.xyMultiplier();
    const z = P.zoom();
    const pX = P.panX();
    const pY = P.panY();

    const mapW = 3.5 / z;
    const mapH = 2.5 / z;

    for (let j = 0; j < currentGridSize; j++) {
      for (let i = 0; i < currentGridSize; i++) {
        let x0 = p.map(i, 0, currentGridSize, pX - mapW / 2, pX + mapW / 2);
        let y0 = p.map(j, 0, currentGridSize, pY - mapH / 2, pY + mapH / 2);

        let x = 0.0;
        let y = 0.0;
        let iter = 0;

        while (x * x + y * y <= 4.0 && iter < currentMaxIter) {
          let xtemp = x * x - y * y + x0;
          y = xyMult * x * y + y0;
          x = xtemp;
          iter++;
        }

        let c;
        if (iter === currentMaxIter) {
          c = insideColor;
        } else {
          let t = iter / currentMaxIter;
          c = p.lerpColor(startColor, endColor, t);
        }

        p.fill(c);
        p.rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  };
}