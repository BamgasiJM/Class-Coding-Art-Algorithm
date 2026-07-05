export default function wangTilesSketch(p, size) {
  let cols, rows;
  let scl = 40; // 타일 크기
  let accentColor;
  let edgeColors = []; // 변 색상 팔레트
  let tileTypes = []; // 타일 타입 정의
  let grid = []; // 배치된 타일 그리드

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 변 색상 팔레트 (4가지 색상)
    edgeColors = [
      p.color(accentColor), // accent
      p.color(255, 100, 150), // 핑크
      p.color(100, 200, 255), // 하늘색
      p.color(255, 200, 100), // 노란색
    ];

    // 타일 타입 정의 (상, 우, 하, 좌 변의 색상 인덱스)
    // 다양한 조합으로 비주기 패턴 생성
    tileTypes = [
      { edges: [0, 1, 2, 3] }, // 상:0, 우:1, 하:2, 좌:3
      { edges: [1, 2, 3, 0] },
      { edges: [2, 3, 0, 1] },
      { edges: [3, 0, 1, 2] },
      { edges: [0, 0, 1, 1] },
      { edges: [1, 1, 2, 2] },
      { edges: [2, 2, 3, 3] },
      { edges: [3, 3, 0, 0] },
    ];

    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);

    generatePattern();
    p.background(8, 8, 16);
  };

  // Wang Tile 패턴 생성
  function generatePattern() {
    grid = [];

    for (let j = 0; j < rows; j++) {
      grid[j] = [];
      for (let i = 0; i < cols; i++) {
        let compatibleTiles = [];

        // 호환되는 타일 찾기
        for (let tileType of tileTypes) {
          let compatible = true;

          // 왼쪽 타일의 오른쪽 변과 일치해야 함
          if (i > 0) {
            let leftTile = grid[j][i - 1];
            if (leftTile.edges[1] !== tileType.edges[3]) {
              compatible = false;
            }
          }

          // 위쪽 타일의 아래쪽 변과 일치해야 함
          if (j > 0 && compatible) {
            let topTile = grid[j - 1][i];
            if (topTile.edges[2] !== tileType.edges[0]) {
              compatible = false;
            }
          }

          if (compatible) {
            compatibleTiles.push(tileType);
          }
        }

        // 호환되는 타일 중 랜덤 선택
        if (compatibleTiles.length > 0) {
          let chosen =
            compatibleTiles[p.floor(p.random(compatibleTiles.length))];
          grid[j][i] = chosen;
        } else {
          // 호환되는 타일이 없으면 첫 번째 타입 사용 (fallback)
          grid[j][i] = tileTypes[0];
        }
      }
    }
  }

  // 타일 렌더링
  function drawTile(x, y, tile) {
    let half = scl / 2;

    // 타일 내부를 4분면으로 나누어 각 변의 색상으로 채움
    // 상단-좌측: 상 변 색상
    p.noStroke();
    p.fill(edgeColors[tile.edges[0]]);
    p.rect(x, y, half, half);

    // 상단-우측: 우 변 색상
    p.fill(edgeColors[tile.edges[1]]);
    p.rect(x + half, y, half, half);

    // 하단-우측: 하 변 색상
    p.fill(edgeColors[tile.edges[2]]);
    p.rect(x + half, y + half, half, half);

    // 하단-좌측: 좌 변 색상
    p.fill(edgeColors[tile.edges[3]]);
    p.rect(x, y + half, half, half);

    // 변 경계선 (타일 구분 명확히)
    p.stroke(8, 8, 16);
    p.strokeWeight(1);
    p.line(x + half, y, x + half, y + scl);
    p.line(x, y + half, x + scl, y + half);
  }

  p.draw = function () {
    p.background(8, 8, 16);

    // 모든 타일 렌더링
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let x = i * scl;
        let y = j * scl;
        drawTile(x, y, grid[j][i]);
      }
    }

    // 타일 외곽선
    p.stroke(8, 8, 16);
    p.strokeWeight(2);
    p.noFill();
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        p.rect(i * scl, j * scl, scl, scl);
      }
    }
  };

  // 클릭 시 새로운 패턴 생성
  p.mousePressed = function () {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      generatePattern();
    }
  };
}
