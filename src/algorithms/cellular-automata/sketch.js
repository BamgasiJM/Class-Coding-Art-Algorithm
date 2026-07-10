export default function cellularAutomataSketch(p, size, params = {}) {
  let cells = [];
  let w; // 각 셀의 크기 (정사각형 픽셀)
  let cols, rows;
  let generation = 0;

  // Wolfram Rule 90: 시에르핀스키 가스켓과 같은 프랙탈 구조를 생성하는 규칙
  // [111, 110, 101, 100, 011, 010, 001, 000]
  let ruleset;
  let accentColor;

  const P = {
    cellSize: () => params.cellSize ?? 4,
    ruleNumber: () => params.ruleNumber ?? 90,
    startMode: () => params.startMode ?? 0,
    drawSpeed: () => params.drawSpeed ?? 1,
  };

  p.setup = function () {
    p.createCanvas(size, size);

    w = P.cellSize();
    cols = p.floor(p.width / w);
    rows = p.floor(p.height / w);

    ruleset = buildRuleset(P.ruleNumber());

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    initCells();

    p.background(8, 8, 16);
  };

  function initCells() {
    generation = 0;
    cells = new Array(cols).fill(0);

    // 시작 패턴 선택
    if (P.startMode() === 0) {
      // 중앙 단일 셀
      cells[p.floor(cols / 2)] = 1;
    } else {
      // 랜덤 초기 상태
      for (let i = 0; i < cols; i++) {
        cells[i] = p.random() > 0.5 ? 1 : 0;
      }
    }
  }

  function buildRuleset(ruleNumber) {
    const bits = [];

    for (let i = 7; i >= 0; i--) {
      bits.push((ruleNumber >> i) & 1);
    }

    return bits;
  }

  // 이웃 셀들의 상태를 바탕으로 다음 세대 상태 계산
  function rules(a, b, c) {
    let s = "" + a + b + c;
    let index = parseInt(s, 2);
    return ruleset[7 - index];
  }

  function generate() {
    let nextgen = new Array(cols).fill(0);

    // 경계면을 제외하고 좌우 이웃 상태를 참조하여 다음 세대 전이
    for (let i = 1; i < cols - 1; i++) {
      let left = cells[i - 1];
      let me = cells[i];
      let right = cells[i + 1];
      nextgen[i] = rules(left, me, right);
    }

    cells = nextgen;
    generation++;
  }

  p.draw = function () {
    const speed = P.drawSpeed();

    for (let step = 0; step < speed; step++) {
      // 화면 크기를 초과하는 세대에 도달하면 연산 중지 및 대기
      if (generation >= rows) {
        p.noLoop();
        return;
      }

      // 현재 세대의 상태를 가로 한 줄로 시각화
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] === 1) {
          p.fill(accentColor);
          p.noStroke();
          p.rect(i * w, generation * w, w, w);
        }
      }

      // 다음 세대 연산 진행
      generate();
    }
  };
}