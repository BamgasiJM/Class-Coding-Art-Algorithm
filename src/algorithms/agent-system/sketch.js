// src/algorithms/agent-system/sketch.js
export default function agentSystemSketch(p, size, params = {}) {
  let agents = [];
  let accentColor;

  // 파라미터 접근자 객체
  const P = {
    count: () => params.count ?? 200,
    perceptionRadius: () => params.perceptionRadius ?? 50,
    maxSpeed: () => params.maxSpeed ?? 2,
    maxForce: () => params.maxForce ?? 0.05, // UI에는 노출하지 않으나 일관성을 위해 접근자로 관리
    separationWeight: () => params.separationWeight ?? 1.5,
    alignmentWeight: () => params.alignmentWeight ?? 1.0,
    cohesionWeight: () => params.cohesionWeight ?? 1.2,
  };

  p.setup = function() {
    p.createCanvas(size, size);
    
    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
    
    // 에이전트 초기화
    agents = [];
    const count = P.count(); // 구조: 초기화 시점에만 읽음
    for (let i = 0; i < count; i++) {
      const angle = p.random(p.TWO_PI);
      agents.push({
        position: p.createVector(p.random(p.width), p.random(p.height)),
        velocity: p.createVector(p.cos(angle), p.sin(angle)).mult(p.random(0.5, P.maxSpeed())),
        acceleration: p.createVector(0, 0)
      });
    }
    p.background(8, 8, 16);
  };

  // 분리 행동: 다른 에이전트와 거리를 유지
  function separate(agent) {
    let steering = p.createVector(0, 0);
    let total = 0;
    
    const percRad = P.perceptionRadius();
    const mSpeed = P.maxSpeed();
    const mForce = P.maxForce();
    const weight = P.separationWeight();

    for (let other of agents) {
      if (other === agent) continue;
      const distance = p.dist(
        agent.position.x, agent.position.y,
        other.position.x, other.position.y
      );
      if (distance < percRad && distance > 0) {
        // 거리에 반비례하는 힘 (가까울수록 강하게 밀치기)
        const diff = p.createVector(
          agent.position.x - other.position.x,
          agent.position.y - other.position.y
        );
        diff.div(distance * distance); // 거리의 제곱으로 나눠 더 강하게
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(mSpeed);
      steering.sub(agent.velocity);
      steering.limit(mForce * weight);
    }
    return steering;
  }

  // 정렬 행동: 주변 에이전트들과 같은 방향으로 이동
  function align(agent) {
    let steering = p.createVector(0, 0);
    let total = 0;
    
    const percRad = P.perceptionRadius();
    const mSpeed = P.maxSpeed();
    const mForce = P.maxForce();
    const weight = P.alignmentWeight();

    for (let other of agents) {
      if (other === agent) continue;
      const distance = p.dist(
        agent.position.x, agent.position.y,
        other.position.x, other.position.y
      );
      if (distance < percRad) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(mSpeed);
      steering.sub(agent.velocity);
      steering.limit(mForce * weight);
    }
    return steering;
  }

  // 응집 행동: 주변 에이전트들 중심으로 이동
  function cohere(agent) {
    let steering = p.createVector(0, 0);
    let total = 0;
    
    const percRad = P.perceptionRadius();
    const mSpeed = P.maxSpeed();
    const mForce = P.maxForce();
    const weight = P.cohesionWeight();

    for (let other of agents) {
      if (other === agent) continue;
      const distance = p.dist(
        agent.position.x, agent.position.y,
        other.position.x, other.position.y
      );
      if (distance < percRad) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(agent.position);
      steering.setMag(mSpeed);
      steering.sub(agent.velocity);
      steering.limit(mForce * weight);
    }
    return steering;
  }

  // 경계 처리: 화면 밖으로 나가면 반대쪽에서 재진입
  function checkBoundaries(agent) {
    if (agent.position.x < 0) agent.position.x = p.width;
    if (agent.position.x > p.width) agent.position.x = 0;
    if (agent.position.y < 0) agent.position.y = p.height;
    if (agent.position.y > p.height) agent.position.y = 0;
  }

  p.draw = function() {
    p.background(8, 8, 16, 45); // 트레일 효과를 위한 반투명 배경
    const mSpeed = P.maxSpeed();

    // 모든 에이전트 업데이트
    for (let agent of agents) {
      // Boids 3가지 규칙 적용
      const separation = separate(agent);
      const alignment = align(agent);
      const cohesion = cohere(agent);

      // 가속도에 규칙 적용
      agent.acceleration.add(separation);
      agent.acceleration.add(alignment);
      agent.acceleration.add(cohesion);

      // 속도와 위치 업데이트
      agent.velocity.add(agent.acceleration);
      agent.velocity.limit(mSpeed);
      agent.position.add(agent.velocity);
      agent.acceleration.set(0, 0);

      // 경계 처리
      checkBoundaries(agent);
    }

    // 에이전트 그리기
    p.fill(accentColor);
    p.noStroke();
    for (let agent of agents) {
      p.push();
      p.translate(agent.position.x, agent.position.y);
      p.rotate(agent.velocity.heading() + p.HALF_PI);
      // 삼각형 그리기 (에이전트 시각화)
      p.beginShape();
      p.vertex(0, -5);
      p.vertex(-3, 5);
      p.vertex(3, 5);
      p.endShape(p.CLOSE);
      p.pop();
    }
  };
}