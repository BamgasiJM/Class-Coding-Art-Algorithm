export default function circlePackingSketch(p, size) {
  let circles = [];
  let maxCircles = 150; // 60fps 유지를 위한 최대 원 개수 제한
  let attemptsPerFrame = 5; // 프레임당 새 원 배치를 시도할 횟수
  let accentColor;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    circles = [];
    p.background(8, 8, 16);
  };

  // 새로운 원을 생성할 수 있는지 검사하는 함수
  function createNewCircle() {
    let x = p.random(p.width);
    let y = p.random(p.height);

    // 기존에 존재하는 원의 내부에 생성되는지 확인
    for (let c of circles) {
      let d = p.dist(x, y, c.x, c.y);
      if (d < c.r + 2) {
        return null; // 겹치면 무효 처리
      }
    }

    // 초기 반지름 1로 시작하는 새 원 객체 반환
    return { x, y, r: 1, growing: true };
  }

  p.draw = function () {
    p.background(8, 8, 16);

    // 1. 설정된 횟수만큼 새로운 원 배치 시도
    if (circles.length < maxCircles) {
      for (let i = 0; i < attemptsPerFrame; i++) {
        let newC = createNewCircle();
        if (newC !== null) {
          circles.push(newC);
        }
      }
    }

    // 2. 원의 크기 확장 및 충돌 처리 연산
    for (let c of circles) {
      if (c.growing) {
        // 캔버스 경계에 닿으면 성장을 멈춤
        if (
          c.x - c.r <= 0 ||
          c.x + c.r >= p.width ||
          c.y - c.r <= 0 ||
          c.y + c.r >= p.height
        ) {
          c.growing = false;
        } else {
          // 다른 원들과 부딪히는지 검사
          for (let other of circles) {
            if (c !== other) {
              let d = p.dist(c.x, c.y, other.x, other.y);
              if (d < c.r + other.r + 2) {
                c.growing = false;
                break;
              }
            }
          }
        }

        // 성장이 멈추지 않았다면 반지름 확장
        if (c.growing) {
          c.r += 0.5;
        }
      }
    }

    // 3. 생성된 모든 원 렌더링
    p.noFill();
    p.stroke(accentColor);
    for (let c of circles) {
      // 크기(반지름)에 비례하여 선의 굵기를 다르게 매핑
      let weight = p.map(c.r, 1, 30, 0.4, 5.5);
      p.strokeWeight(weight);
      p.circle(c.x, c.y, c.r * 2);
    }
  };
}
