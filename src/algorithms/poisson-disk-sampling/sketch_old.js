export default function poissonDiskSamplingSketch(p, size) {
  let points = []; // 생성된 점 목록
  let activeList = []; // 아직 후보를 생성할 수 있는 활성 점 인덱스
  let grid = []; // 공간 해시 그리드 (빠른 충돌 검사용)
  let gridCols, gridRows;
  let cellSize;
  let minDist = 25; // 점 간 최소 거리 (블루 노이즈 특성 제어)
  let k = 30; // 점당 후보 생성 시도 횟수 (Bridson 알고리즘 파라미터)
  let accentColor;
  let done = false;
  let animTimer = 0;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();

    // 셀 크기를 minDist / √2로 설정하면 각 셀에 최대 1개의 점만 존재함이 보장됨
    cellSize = minDist / Math.sqrt(2);
    gridCols = p.ceil(p.width / cellSize);
    gridRows = p.ceil(p.height / cellSize);

    initAlgorithm();
    p.background(8, 8, 16);
  };

  // 알고리즘 초기화 및 시드 포인트 생성
  function initAlgorithm() {
    points = [];
    activeList = [];
    done = false;
    animTimer = 0;

    // 공간 해시 그리드 초기화 (-1 = 빈 셀)
    grid = [];
    for (let i = 0; i < gridCols; i++) {
      grid[i] = [];
      for (let j = 0; j < gridRows; j++) {
        grid[i][j] = -1;
      }
    }

    // 최초 시드 포인트를 화면 중앙 근처에 배치
    let x = p.width / 2 + p.random(-20, 20);
    let y = p.height / 2 + p.random(-20, 20);
    addPoint(x, y);
  }

  // 새 점을 목록과 그리드에 등록
  function addPoint(x, y) {
    let idx = points.length;
    points.push({ x: x, y: y });
    activeList.push(idx);

    let gi = p.floor(x / cellSize);
    let gj = p.floor(y / cellSize);
    if (gi >= 0 && gi < gridCols && gj >= 0 && gj < gridRows) {
      grid[gi][gj] = idx;
    }
  }

  // 후보 점이 최소 거리 제약을 만족하는지 검사
  function isValid(x, y) {
    // 화면 경계 밖이면 무효
    if (x < 5 || x >= p.width - 5 || y < 5 || y >= p.height - 5) return false;

    let gi = p.floor(x / cellSize);
    let gj = p.floor(y / cellSize);

    // 주변 5×5 셀 범위만 검사 (공간 해시로 O(1)에 가까운 충돌 판정)
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        let ci = gi + i;
        let cj = gj + j;
        if (ci >= 0 && ci < gridCols && cj >= 0 && cj < gridRows) {
          let idx = grid[ci][cj];
          if (idx !== -1) {
            let pt = points[idx];
            let dx = x - pt.x;
            let dy = y - pt.y;
            // 거리 제곱 비교 (sqrt 생략으로 성능 향상)
            if (dx * dx + dy * dy < minDist * minDist) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  p.draw = function () {
    p.background(8, 8, 16);

    // Bridson 알고리즘: 프레임당 여러 점 처리 (시각적 애니메이션)
    if (!done) {
      let iterationsPerFrame = 8;

      for (let iter = 0; iter < iterationsPerFrame; iter++) {
        if (activeList.length === 0) {
          done = true;
          break;
        }

        // 활성 목록에서 랜덤하게 점 선택
        let randIdx = p.floor(p.random(activeList.length));
        let ptIdx = activeList[randIdx];
        let pt = points[ptIdx];
        let found = false;

        // 환형 영역(annular ring) [minDist, 2*minDist]에서 k개의 후보 생성
        for (let attempt = 0; attempt < k; attempt++) {
          let angle = p.random(p.TWO_PI);
          let radius = p.random(minDist, minDist * 2);
          let nx = pt.x + p.cos(angle) * radius;
          let ny = pt.y + p.sin(angle) * radius;

          if (isValid(nx, ny)) {
            addPoint(nx, ny);
            found = true;
            break;
          }
        }

        // k번 시도 후에도 유효한 후보가 없으면 활성 목록에서 제거
        if (!found) {
          activeList.splice(randIdx, 1);
        }
      }
    }

    // 점 렌더링
    p.noStroke();
    for (let i = 0; i < points.length; i++) {
      let pt = points[i];
      let age = points.length - i; // 생성된 순서 (작을수록 최근)

      // 최근 생성된 점은 밝고 크게 (파동 효과)
      let alpha, ptSize;
      if (age < 15) {
        alpha = p.map(age, 0, 15, 255, 160);
        ptSize = p.map(age, 0, 15, 8, 4);
      } else {
        alpha = 160;
        ptSize = 4;
      }

      let c = p.color(accentColor);
      c.setAlpha(alpha);
      p.fill(c);
      p.circle(pt.x, pt.y, ptSize);
    }

    // 알고리즘 완료 시 최소 거리 원(배제 영역) 시각화
    if (done) {
      animTimer++;

      if (animTimer < 150) {
        // 2.5초간 배제 영역 원을 페이드인/아웃으로 표시
        let showAlpha;
        if (animTimer < 60) {
          showAlpha = p.map(animTimer, 0, 60, 0, 35);
        } else if (animTimer < 100) {
          showAlpha = 35;
        } else {
          showAlpha = p.map(animTimer, 100, 150, 35, 0);
        }

        p.noFill();
        let circleColor = p.color(accentColor);
        circleColor.setAlpha(showAlpha);
        p.stroke(circleColor);
        p.strokeWeight(0.5);

        // 각 점 주위에 최소 거리 원 그리기 (블루 노이즈 분포 확인)
        for (let pt of points) {
          p.circle(pt.x, pt.y, minDist);
        }
      }

      // 4초 후 알고리즘 재시작
      if (animTimer > 240) {
        initAlgorithm();
      }
    }
  };
}