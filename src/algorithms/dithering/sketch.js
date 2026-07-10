export default function ditheringSketch(p, size, params = {}) {
  const BAYER8 = [
    [ 0, 32,  8, 40,  2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44,  4, 36, 14, 46,  6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [ 3, 35, 11, 43,  1, 33,  9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47,  7, 39, 13, 45,  5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ];

  const CELL = 2;
  let cols, rows;
  let brightness;
  let fsBuffer;
  let accentR, accentG, accentB;
  let fsCursor = 0;
  let fsNeedsReset = true;
  let srcImg = null;
  let prevMode = -1;

  const P = {
    ditherMode: () => params.ditherMode ?? 0,
    bayerScale: () => params.bayerScale ?? 8,
    thresholdBias: () => params.thresholdBias ?? 0.5,
    lumMultiplier: () => params.lumMultiplier ?? 255,
    brightnessBias: () => params.brightnessBias ?? 0.0,
  };

  p.setup = function () {
    p.createCanvas(size, size);
    p.pixelDensity(1);
    p.noSmooth();

    cols = p.floor(size / CELL);
    rows = p.floor(size / CELL);

    const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const tmp = p.color(hex);
    accentR = p.red(tmp); accentG = p.green(tmp); accentB = p.blue(tmp);

    p.background(8, 8, 16);

    p.loadImage('/img/image_2.jpg', (img) => {
      srcImg = img;
      buildBrightnessMap();
      fsNeedsReset = true;
    });
  };

  function buildBrightnessMap() {
    brightness = new Float32Array(cols * rows);
    if (!srcImg) return;

    const sample = srcImg.get();
    sample.resize(cols, rows);
    sample.loadPixels();

    const px = sample.pixels;
    const mult = P.lumMultiplier();
    const bias = P.brightnessBias();

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const idx = (j * cols + i) * 4;
        const lum = (0.299 * px[idx] + 0.587 * px[idx + 1] + 0.114 * px[idx + 2]) / mult;
        brightness[j * cols + i] = p.constrain(lum + bias, 0, 1);
      }
    }
  }

  function renderBayer() {
    p.loadPixels();
    const d = p.pixelDensity();
    const buf = p.pixels;
    const w = p.width * d;
    const S = p.constrain(P.bayerScale(), 2, 8);
    const bias = P.thresholdBias();

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const src = brightness[j * cols + i];
        const thr = (BAYER8[j % S][i % S] + 0.5) / 64.0;
        const on = src > (thr * 0.9 + bias * 0.1);
        
        const r = on ? accentR : 8;
        const g = on ? accentG : 8;
        const b = on ? accentB : 16;

        for (let dy = 0; dy < CELL; dy++) {
          const py = j * CELL + dy;
          if (py >= p.height) break;
          const rowOff = py * w;
          for (let dx = 0; dx < CELL; dx++) {
            const px = i * CELL + dx;
            if (px >= p.width) break;
            const off = (rowOff + px * d) * 4;
            buf[off] = r; buf[off+1] = g; buf[off+2] = b; buf[off+3] = 255;
          }
        }
      }
    }
    p.updatePixels();
  }

  function initFSBuffer() {
    fsBuffer = new Float32Array(cols * rows);
    for (let k = 0; k < fsBuffer.length; k++) fsBuffer[k] = brightness[k];
    fsCursor = 0;
    fsNeedsReset = false;
  }

  function stepFS() {
    if (fsNeedsReset || !fsBuffer) initFSBuffer();
    if (fsCursor >= rows) { fsNeedsReset = true; return; }

    const j = fsCursor;
    const bias = P.thresholdBias();
    
    for (let i = 0; i < cols; i++) {
      const idx = j * cols + i;
      const old = p.constrain(fsBuffer[idx], 0, 1);
      const newVal = old >= bias ? 1 : 0;
      const err = old - newVal;

      const r = (newVal === 1) ? accentR : 8;
      const g = (newVal === 1) ? accentG : 8;
      const b = (newVal === 1) ? accentB : 16;
      
      const d = p.pixelDensity();
      const buf = p.pixels;
      const w = p.width * d;
      for (let dy = 0; dy < CELL; dy++) {
        const rowOff = (j * CELL + dy) * w;
        for (let dx = 0; dx < CELL; dx++) {
          const off = (rowOff + (i * CELL + dx) * d) * 4;
          buf[off] = r; buf[off+1] = g; buf[off+2] = b; buf[off+3] = 255;
        }
      }

      if (i + 1 < cols) fsBuffer[idx + 1] += err * 7 / 16;
      if (j + 1 < rows) {
        if (i > 0) fsBuffer[idx + cols - 1] += err * 3 / 16;
        fsBuffer[idx + cols] += err * 5 / 16;
        if (i + 1 < cols) fsBuffer[idx + cols + 1] += err * 1 / 16;
      }
    }
    fsCursor++;
  }

  p.draw = function () {
    const currentMode = P.ditherMode();
    if (currentMode !== prevMode) {
      if (currentMode === 1) fsNeedsReset = true;
      prevMode = currentMode;
    }

    if (currentMode === 0) {
      renderBayer();
    } else {
      p.loadPixels();
      for (let k = 0; k < 6; k++) stepFS();
      p.updatePixels();
    }
  };
}