export default function quadtreeSketch(p, size, params = {}) {
  // 캔버스 내에서 움직일 파티클들을 저장하는 배열 선언
  let particles = [];
  // 매 프레임마다 생성될 쿼드트리의 루트 노드를 담을 변수
  let quadtree;
  // CSS 변수에서 가져올 강조 색상 변수 선언
  let accentColor;

  // 파라미터 접근자 객체 설정 (기본값 포함)
  const P = {
    // 캔버스에 생성할 총 파티클의 개수 반환
    particleCount: () => params.particleCount ?? 300,
    // 쿼드트리의 한 노드가 분할 없이 수용할 수 있는 최대 파티클 수 반환
    capacity: () => params.capacity ?? 4,
    // 쿼드트리가 분할될 수 있는 최대 재귀 깊이 반환
    maxDepth: () => params.maxDepth ?? 6,
    // 파티클의 기본 이동 벡터에 곱해질 속도 배율 반환
    speed: () => params.speed ?? 1,
    // 배경을 다시 그릴 때 적용할 투명도(잔상 효과) 반환
    trailAlpha: () => params.trailAlpha ?? 40,
  };

  // 2D 공간의 직사각형 영역을 정의하는 클래스
  class Rectangle {
    // x, y 좌표와 너비(w), 높이(h)를 받아 초기화
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    // 특정 점(point)이 이 직사각형 영역 내부에 포함되는지 판정하는 메서드
    contains(point) {
      // 점의 좌표가 경계값 내에 있는지 논리 연산하여 반환
      return (
        point.x >= this.x &&
        point.x < this.x + this.w &&
        point.y >= this.y &&
        point.y < this.y + this.h
      );
    }
  }

  // 공간을 재귀적으로 4분할하여 데이터를 관리하는 쿼드트리 노드 클래스
  class Quadtree {
    // 노드가 담당하는 영역(boundary), 수용량(capacity), 현재 깊이(depth) 초기화
    constructor(boundary, capacity, depth = 0) {
      this.boundary = boundary;
      this.capacity = capacity;
      // 노드에 현재 저장된 파티클 배열 초기화
      this.points = [];
      // 현재 노드가 4개의 자식 노드로 분할되었는지 여부 상태 플래그
      this.divided = false;
      // 현재 노드의 트리 계층 깊이 저장
      this.depth = depth;
      // 분할 시 생성될 4개의 자식 노드 배열 초기화
      this.children = [];
    }

    // 새로운 점을 쿼드트리에 삽입하는 메서드
    insert(point) {
      // 점이 현재 노드의 영역에 포함되지 않으면 삽입 실패 반환
      if (!this.boundary.contains(point)) return false;

      // 노드가 아직 하위 노드로 분할되지 않은 상태일 경우
      if (!this.divided) {
        // 현재 노드의 점 개수가 수용량보다 적거나, 설정된 최대 깊이에 도달했을 경우
        if (this.points.length < this.capacity || this.depth >= P.maxDepth()) {
          // 점을 현재 노드의 배열에 추가하고 삽입 성공 반환
          this.points.push(point);
          return true;
        }
        // 용량을 초과했고 최대 깊이가 아니라면 현재 노드를 4개로 분할
        this.subdivide();
        // 분할 후, 기존에 노드가 가지고 있던 점들을 자식 노드들에게 재분배
        for (let pt of this.points) {
          this.insertToChildren(pt);
        }
        // 점들이 자식으로 넘어갔으므로 현재 노드의 배열 비우기
        this.points = [];
      }
      // 새로 삽입된 점 역시 자식 노드들에게 전달
      return this.insertToChildren(point);
    }

    // 4개의 자식 노드 중 해당하는 곳에 점을 전달하여 삽입하는 헬퍼 메서드
    insertToChildren(point) {
      for (let child of this.children) {
        // 자식 노드 중 삽입에 성공하는 곳이 있으면 즉시 true 반환
        if (child.insert(point)) return true;
      }
      return false;
    }

    // 현재 노드의 영역을 4개의 균등한 직사각형 영역으로 나누고 자식 노드 생성
    subdivide() {
      // 부모 영역의 기준점 저장
      let x = this.boundary.x;
      let y = this.boundary.y;
      // 자식 영역이 될 절반의 너비와 높이 계산
      let w = this.boundary.w / 2;
      let h = this.boundary.h / 2;
      // 파라미터에서 현재 설정된 수용량 값 확보
      let cap = this.capacity;
      // 현재 깊이에 1을 더해 자식 노드의 깊이 지정
      let d = this.depth + 1;

      // 좌상단(NW) 영역 자식 노드 생성 후 배열 추가
      this.children.push(new Quadtree(new Rectangle(x, y, w, h), cap, d));
      // 우상단(NE) 영역 자식 노드 생성 후 배열 추가
      this.children.push(new Quadtree(new Rectangle(x + w, y, w, h), cap, d));
      // 좌하단(SW) 영역 자식 노드 생성 후 배열 추가
      this.children.push(new Quadtree(new Rectangle(x, y + h, w, h), cap, d));
      // 우하단(SE) 영역 자식 노드 생성 후 배열 추가
      this.children.push(new Quadtree(new Rectangle(x + w, y + h, w, h), cap, d));
      // 분할 완료 상태 플래그 활성화
      this.divided = true;
    }

    // 쿼드트리의 구조 및 포함된 점들을 화면에 렌더링하는 메서드
    show() {
      // 쿼드트리 경계선은 면적을 채우지 않도록 설정
      p.noFill();
      // 파라미터의 최대 깊이를 기준으로 현재 깊이에 따른 선의 투명도 보간 계산
      let alpha = p.map(this.depth, 0, P.maxDepth(), 120, 30);
      // CSS에서 가져온 강조 색상으로 p5 Color 객체 생성
      let c = p.color(accentColor);
      // 계산된 투명도(Alpha) 값 적용
      c.setAlpha(alpha);
      // 선 색상 적용
      p.stroke(c);
      // 계층이 깊어질수록 선 굵기를 얇게 보간하여 공간 분할 시각화 강화
      p.strokeWeight(p.map(this.depth, 0, P.maxDepth(), 2, 0.5));
      // 현재 노드의 경계 영역에 맞추어 사각형 렌더링
      p.rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);

      // 하위 노드로 분할된 상태라면 재귀적으로 자식 노드들의 show() 호출
      if (this.divided) {
        for (let child of this.children) {
          child.show();
        }
      } else {
        // 리프 노드(더 이상 분할되지 않은 노드)인 경우 내부에 속한 파티클들 렌더링
        p.noStroke(); // 점을 그리기 위해 외곽선 제거
        p.fill(accentColor); // 점 색상 설정
        for (let pt of this.points) {
          // 파티클의 좌표에 반지름 2.5인 원 렌더링
          p.circle(pt.x, pt.y, 2.5);
        }
      }
    }
  }

  // p5.js 환경 설정 초기화
  p.setup = function() {
    // 지정된 크기로 캔버스 생성
    p.createCanvas(size, size);

    // 문서 루트에서 지정된 변수('--accent')를 읽어와 앞뒤 공백 제거 후 저장
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();

    // setup 시 이전 파티클 배열을 초기화 (restart: true 적용 대비)
    particles = [];
    
    // 파라미터에 정의된 파티클 수만큼 무작위 초기화
    const count = P.particleCount();
    for (let i = 0; i < count; i++) {
      particles.push({
        // 캔버스 내 무작위 x, y 시작 좌표 설정
        x: p.random(p.width),
        y: p.random(p.height),
        // x, y 축으로의 기본 이동 벡터 (방향과 속도)
        vx: p.random(-0.8, 0.8),
        vy: p.random(-0.8, 0.8),
      });
    }

    // 초기 배경색 설정 (짙은 푸른 회색조)
    p.background(8, 8, 16);
  };

  // 매 프레임마다 호출되어 애니메이션을 그리는 함수
  p.draw = function() {
    // 배경을 그릴 때 파라미터에서 잔상(alpha) 값을 가져와 적용
    p.background(8, 8, 16, P.trailAlpha()); 

    // 파라미터로 설정된 전체 파티클 이동 속도 배율
    const currentSpeed = P.speed();

    // 모든 파티클의 위치 갱신 및 화면 경계 충돌 처리
    for (let pt of particles) {
      // 속도 배율을 반영하여 파티클의 x, y 좌표 이동
      pt.x += pt.vx * currentSpeed;
      pt.y += pt.vy * currentSpeed;
      
      // X축 화면 경계를 벗어날 시 이동 방향 반전
      if (pt.x < 0 || pt.x > p.width) pt.vx *= -1;
      // Y축 화면 경계를 벗어날 시 이동 방향 반전
      if (pt.y < 0 || pt.y > p.height) pt.vy *= -1;
    }

    // 매 프레임마다 전체 캔버스 영역을 담당하는 새 쿼드트리 경계 생성
    let boundary = new Rectangle(0, 0, p.width, p.height);
    // 파라미터에서 가져온 수용량(capacity)을 적용하여 루트 노드 초기화
    quadtree = new Quadtree(boundary, P.capacity(), 0);
    
    // 현재 프레임의 모든 파티클 위치를 바탕으로 쿼드트리에 삽입 연산 수행
    for (let pt of particles) {
      quadtree.insert(pt);
    }

    // 트리 구조 및 각 공간에 속한 파티클들을 화면에 출력
    quadtree.show();
  };
}