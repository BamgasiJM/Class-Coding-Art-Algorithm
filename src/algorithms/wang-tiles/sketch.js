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
    tileSize: () => params.tileSize ?? 48,
    numColorVariations: () => params.numColorVariations ?? 5,
    tileComplexity: () => params.tileComplexity ?? 24,
    colorSaturation: () => params.colorSaturation ?? 1.0,
    colorBrightness: () => params.colorBrightness ?? 1.0,

    // 실시간 파라미터
    gridLineWeight: () => params.gridLineWeight ?? 0.4,
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
    // 타일 종류는 최소한 "위 변 × 왼쪽 변" 조합 수(numColors²)만큼 있어야
    // 어떤 칸에서도 맞는 타일이 있다. 그보다 적으면 그만큼 늘린다.
    const target = Math.min(Math.max(complexity, numColors * numColors), maxPossible);

    const used = new Set();

    // 1) 위 변과 왼쪽 변의 모든 조합마다 타일을 하나씩 먼저 넣는다
    for (let top = 0; top < numColors; top++) {
      for (let left = 0; left < numColors; left++) {
        const edges = [
          top,
          p.floor(p.random(numColors)),
          p.floor(p.random(numColors)),
          left,
        ];
        used.add(edges.join(","));
        tileTypes.push({ edges });
      }
    }

    // 2) 나머지는 무작위로 채운다
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

    // 네 변의 색을 각각 삼각형으로 칠한다. 인접한 타일은 맞닿는 변의 색이 같아야 이어진다.
    const cx = x + half;
    const cy = y + half;

    g.fill(edgeColors[tile.edges[0]]); // 위 변
    g.triangle(x, y, x + scl, y, cx, cy);

    g.fill(edgeColors[tile.edges[1]]); // 오른쪽 변
    g.triangle(x + scl, y, x + scl, y + scl, cx, cy);

    g.fill(edgeColors[tile.edges[2]]); // 아래 변
    g.triangle(x + scl, y + scl, x, y + scl, cx, cy);

    g.fill(edgeColors[tile.edges[3]]); // 왼쪽 변
    g.triangle(x, y + scl, x, y, cx, cy);

    let gridColor = p.color(8, 8, 16);
    gridColor.setAlpha(P.gridLineAlpha());

    g.stroke(gridColor);
    g.strokeWeight(P.gridLineWeight());

    // 삼각형이 만나는 대각선만 얇게 그려서 이음새를 보이게 한다
    g.line(x, y, x + scl, y + scl);
    g.line(x + scl, y, x, y + scl);
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