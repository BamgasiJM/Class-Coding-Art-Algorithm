export default function easingInterpolationSketch(p, size) {
  let currentX, currentY   // 현재 원의 위치
  let targetX, targetY     // 목적지 위치
  let easing = 0.08        // 감속 가중치 (Easing 값)
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 시작 및 목적지 초기 위치 설정
    currentX = p.width / 2
    currentY = p.height / 2
    targetX = p.random(p.width)
    targetY = p.random(p.height)

    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 150) // 잔상 효과를 위한 알파 값 적용

    // 1. 현재 위치와 목적지 사이의 거리 연산
    let dx = targetX - currentX
    let dy = targetY - currentY

    // 2. 이싱(Easing) 수식을 통한 부드러운 위치 보간 연산
    // 목적지에 가까워질수록 dx, dy 값이 작아지므로 속도가 자연스럽게 감속함
    currentX += dx * easing
    currentY += dy * easing

    // 3. 목적지에 충분히 도달했는지 확인 (거리가 1 픽셀 미만인 경우)
    let d = p.dist(currentX, currentY, targetX, targetY)
    if (d < 1) {
      // 새로운 임의의 목적지 갱신
      targetX = p.random(p.width)
      targetY = p.random(p.height)
    }

    // 4. 목적지 guide 시각화
    p.noStroke()
    p.fill(240, 240, 255, 100)
    p.circle(targetX, targetY, 4)

    // 5. easing이 적용되어 움직이는 원
    p.fill(accentColor)
    p.circle(currentX, currentY, 36)
  }
}