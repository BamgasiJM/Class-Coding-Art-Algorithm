export default function wangTilesSketch(p, size, params = {}) {
  let cols, rows;
  let accentColor;
  let accentR, accentG, accentB;

  let edgeColors = [];
  let tileTypes = [];
  let grid = [];
  let buffer;

  // 파라미터 접근자
  const P = {
    // 구조 파라미터
    tileSize: () => params.tileSize ?? 40,
    numColorVariations: () => params.numColorVariations ?? 4,
    tileComplexity: () => params.tileComplexity ?? 8,
    colorSaturation: () => params.colorSaturation ?? 1.0,
    colorBrightness: () => params.colorBrightness ?? 0.8,

    // 실시간 파라미터
    gridLineWeight: () => params.gridLineWeight ?? 1,
    tileOutlineWeight: () => params.tileOutlineWeight ?? 2,
    gridLineAlpha: () => params.gridLineAlpha ?? 80,
  };

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    const ac = p.color(accentColor);
    accentR = p.red(ac);
    accentG = p.green(ac);
    accentB = p.blue(ac);

    buildSystem();
  };

  // ------------------------------------------------------
  // 전체 시스템 생성
  // ------------------------------------------------------

  function buildSystem() {
    const scl = P.tileSize();

    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);

    generateColorPalette();
    generateTileTypes();
    generateValidPattern();

    buffer = p.createGraphics(size, size);
    buffer.pixelDensity(1);

    renderBuffer();
  }

  // ------------------------------------------------------
  // 색상 팔레트 생성
  // ------------------------------------------------------

  function generateColorPalette() {
    edgeColors = [];

    const numColors = P.numColorVariations();
    const saturation = P.colorSaturation();
    const brightness = P.colorBrightness();

    for (let i = 0; i < numColors; i++) {
      const t = numColors > 1 ? i / (numColors - 1) : 0;

      const r =
        accentR *
        (0.3 + t * saturation * 0.7) *
        brightness;

      const g =
        accentG *
        (0.3 + t * saturation * 0.7) *
        brightness;

      const b =
        accentB *
        (0.3 + t * saturation * 0.7) *
        brightness;

      edgeColors.push(
        p.color(
          p.constrain(r, 0, 255),
          p.constrain(g, 0, 255),
          p.constrain(b, 0, 255),
        ),
      );
    }
  }

  // ------------------------------------------------------
  // 중복되지 않는 타일 세트 생성
  // ------------------------------------------------------

  function generateTileTypes() {
    tileTypes = [];

    const numColors = P.numColorVariations();
    const complexity = P.tileComplexity();

    const maxPossible = Math.pow(numColors, 4);
    const target = Math.min(complexity, maxPossible);

    const used = new Set();

    while (tileTypes.length < target) {
      const edges = [
        p.floor(p.random(numColors)),
        p.floor(p.random(numColors)),
        p.floor(p.random(numColors)),
        p.floor(p.random(numColors)),
      ];

      const key = edges.join(",");

      if (!used.has(key)) {
        used.add(key);
        tileTypes.push({ edges });
      }
    }
  }

  // ------------------------------------------------------
  // Wang 타일 패턴 생성
  // 실패 시 false 반환
  // ------------------------------------------------------

  function generatePattern() {
    grid = [];

    for (let j = 0; j < rows; j++) {
      grid[j] = [];

      for (let i = 0; i < cols; i++) {
        let compatibleTiles = [];

        for (let tileType of tileTypes) {
          let compatible = true;

          // 왼쪽 타일과 비교
          if (i > 0) {
            const leftTile = grid[j][i - 1];

            if (
              leftTile.edges[1] !==
              tileType.edges[3]
            ) {
              compatible = false;
            }
          }

          // 위쪽 타일과 비교
          if (j > 0 && compatible) {
            const topTile = grid[j - 1][i];

            if (
              topTile.edges[2] !==
              tileType.edges[0]
            ) {
              compatible = false;
            }
          }

          if (compatible) {
            compatibleTiles.push(tileType);
          }
        }

        // 배치 가능한 타일이 없으면 실패
        if (compatibleTiles.length === 0) {
          return false;
        }

        grid[j][i] =
          compatibleTiles[
            p.floor(
              p.random(
                compatibleTiles.length,
              ),
            )
          ];
      }
    }

    return true;
  }

  // ------------------------------------------------------
  // 실패하면 여러 번 재시도
  // ------------------------------------------------------

  function generateValidPattern() {
    let success = false;
    let attempts = 0;

    while (!success && attempts < 100) {
      success = generatePattern();
      attempts++;
    }

    // 현재 타일 세트가 너무 제한적이면
    // 타일 세트를 다시 만든다.
    if (!success) {
      generateTileTypes();
      generateValidPattern();
    }
  }

  // ------------------------------------------------------
  // 버퍼에 타일 하나 그리기
  // ------------------------------------------------------

  function drawTileToBuffer(g, x, y, tile) {
    const scl = P.tileSize();
    const half = scl / 2;

    g.noStroke();

    g.fill(edgeColors[tile.edges[0]]);
    g.rect(x, y, half, half);

    g.fill(edgeColors[tile.edges[1]]);
    g.rect(x + half, y, half, half);

    g.fill(edgeColors[tile.edges[2]]);
    g.rect(x + half, y + half, half, half);

    g.fill(edgeColors[tile.edges[3]]);
    g.rect(x, y + half, half, half);

    let gridColor = p.color(8, 8, 16);
    gridColor.setAlpha(P.gridLineAlpha());

    g.stroke(gridColor);
    g.strokeWeight(P.gridLineWeight());

    g.line(x + half, y, x + half, y + scl);
    g.line(x, y + half, x + scl, y + half);
  }

  // ------------------------------------------------------
  // 버퍼 렌더링
  // ------------------------------------------------------

  function renderBuffer() {
    buffer.background(8, 8, 16);

    const scl = P.tileSize();

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        drawTileToBuffer(
          buffer,
          i * scl,
          j * scl,
          grid[j][i],
        );
      }
    }

    buffer.stroke(30);
    buffer.strokeWeight(
      P.tileOutlineWeight(),
    );
    buffer.noFill();

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        buffer.rect(
          i * scl,
          j * scl,
          scl,
          scl,
        );
      }
    }
  }

  p.draw = function () {
    // 실시간 파라미터 반영을 위해
    // 버퍼를 다시 렌더링
    renderBuffer();

    p.background(8, 8, 16);
    p.image(buffer, 0, 0);
  };

  // ------------------------------------------------------
  // 클릭 시 현재 파라미터 상태로 재생성
  // ------------------------------------------------------

  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      buildSystem();
    }
  };
}