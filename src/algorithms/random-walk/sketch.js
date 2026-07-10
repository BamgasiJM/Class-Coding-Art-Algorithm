export default function randomWalkSketch(p, size, params = {}) {
  let walkers = [];
  let accentR, accentG, accentB;

  // 파라미터 실시간 접근자 객체 설정
  const P = {
    numWalkers: () => params.numWalkers ?? 6,
    stepSize: () => params.stepSize ?? 12,
    maxHistory: () => params.maxHistory ?? 100,
    trailAlpha: () => params.trailAlpha ?? 45,
  };

  class Walker {
    constructor(index) {
      this.x = p.width / 2;
      this.y = p.height / 2;
      this.index = index;
      this.history = [];
    }

    step() {
      const speed = P.stepSize();
      const maxH = P.maxHistory();

      // 4방향 무작위 보행 결정[cite: 16]
      let dir = p.floor(p.random(4));
      if (dir === 0) this.y -= speed;
      else if (dir === 1) this.x += speed;
      else if (dir === 2) this.y += speed;
      else if (dir === 3) this.x -= speed;

      // 경계를 벗어나지 않도록 좌표 반사 및 제한 처리[cite: 16]
      if (this.x < 0) this.x = 0;
      if (this.x > p.width) this.x = p.width;
      if (this.y < 0) this.y = 0;
      if (this.y > p.height) this.y = p.height;

      // 현재 좌표를 히스토리 배열에 등록[cite: 16]
      this.history.push({ x: this.x, y: this.y });
      
      // 파라미터 조작으로 maxHistory가 동적으로 변할 수 있으므로 while문을 사용하여 메모리 최적화 유지
      while (this.history.length > maxH) {
        this.history.shift(); // 오래된 기록 제거[cite: 16]
      }
    }

    show() {
      const len = this.history.length;
      if (len < 2) return;

      p.noFill();
      
      // 과거 궤적부터 최신 궤적까지 순회하며 선분 렌더링
      for (let i = 1; i < len; i++) {
        // 먼 과거일수록 투명하고 가늘게 표현되도록 선형 보간[cite: 16]
        let alpha = p.map(i, 0, len, 15, 200);
        let weight = p.map(i, 0, len, 0.5, 2.5);
        
        // CSS 색상 충돌 방지를 위해 분리된 R, G, B 채널과 보간된 알파값 사용
        p.stroke(accentR, accentG, accentB, alpha);
        p.strokeWeight(weight);
        p.line(
          this.history[i - 1].x, this.history[i - 1].y,
          this.history[i].x, this.history[i].y
        );
      }

      // 최신 위치 강조 포인트 렌더링[cite: 16]
      p.noStroke();
      p.fill(accentR, accentG, accentB, 255);
      p.circle(this.x, this.y, 4);
    }
  }

  p.setup = function() {
    p.createCanvas(size, size);

    // CSS 변수 `--accent` 색상을 안전하게 파싱하여 R, G, B로 분해 저장
    const accentColorStr = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
    const c = p.color(accentColorStr);
    accentR = p.red(c);
    accentG = p.green(c);
    accentB = p.blue(c);

    // 초기 워커 인스턴스 배열 동기화[cite: 16]
    syncWalkers();
    p.background(8, 8, 16);
  };

  // 슬라이더 조작에 따라 워커 개수를 즉각적으로 늘리거나 줄이는 메모리 핸들러 함수
  function syncWalkers() {
    const targetNum = P.numWalkers();
    
    // 워커가 부족한 경우 새 인스턴스 할당
    while (walkers.length < targetNum) {
      walkers.push(new Walker(walkers.length));
    }
    
    // 워커가 과도한 경우 배열 길이를 단축하여 가비지 컬렉터(GC)에 의한 메모리 반환 유도
    if (walkers.length > targetNum) {
      walkers.length = targetNum; 
    }
  }

  p.draw = function() {
    // 잔상 트레일 효과의 강도를 trailAlpha 파라미터로 실시간 제어[cite: 16]
    p.background(8, 8, 16, P.trailAlpha());

    // 매 프레임 워커 개수 변경 사항 체크 및 즉각 반영
    syncWalkers();

    for (let walker of walkers) {
      walker.step();
      walker.show();
    }
  };
}