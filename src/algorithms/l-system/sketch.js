export default function lSystemSketch(p, size, params = {}) {
  let accentR, accentG, accentB;
  let sentence = "X";
  
  const rules = {
    X: "F+[[X]-X]-F[-FX]+X",
    F: "FF",
  };

  const segmentLength = 8;
  let wind = 0;
  let drawScale = 1;
  let offsetX = 0;
  let offsetY = 0;

  // 파라미터 변경 감지를 위한 상태 저장 변수
  let prevIterations = -1;
  let prevAngle = -1;

  const P = {
    iterations: () => params.iterations ?? 5,
    baseAngle: () => params.baseAngle ?? 25,
    windSpeed: () => params.windSpeed ?? 0.02,
  };

  p.setup = function () {
    p.createCanvas(size, size);

    const accentColorStr = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    const c = p.color(accentColorStr);
    accentR = p.red(c);
    accentG = p.green(c);
    accentB = p.blue(c);

    p.background(8, 8, 16);
    p.strokeCap(p.ROUND);
  };

  p.draw = function () {
    p.background(8, 8, 16);

    wind += P.windSpeed();

    const currentIterations = P.iterations();
    const currentAngle = P.baseAngle();

    // 반복 횟수나 각도가 변경되었을 때만 무거운 연산(문자열 생성, 바운딩 박스) 수행
    if (currentIterations !== prevIterations) {
      generate(currentIterations);
      calculateBounds(currentAngle);
      prevIterations = currentIterations;
      prevAngle = currentAngle;
    } else if (currentAngle !== prevAngle) {
      calculateBounds(currentAngle);
      prevAngle = currentAngle;
    }

    p.push();
    p.translate(offsetX, offsetY);
    p.scale(drawScale);
    p.rotate(-p.HALF_PI); // 위쪽으로 성장

    drawSentence(currentAngle);
    p.pop();
  };

  // 문자열 생성 (String Rewriting)
  function generate(iters) {
    sentence = "X"; // 초기 상태(Axiom)로 리셋
    
    for (let i = 0; i < iters; i++) {
      let next = "";
      for (const ch of sentence) {
        next += rules[ch] || ch;
      }
      sentence = next;
    }
  }

  // 화면 중앙 배치를 위한 Bounding Box 계산
  function calculateBounds(angleVal) {
    let x = 0;
    let y = 0;
    let angle = -p.HALF_PI;
    const stack = [];

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const ch of sentence) {
      switch (ch) {
        case "F": {
          const nx = x + p.cos(angle) * segmentLength;
          const ny = y + p.sin(angle) * segmentLength;

          minX = p.min(minX, nx);
          minY = p.min(minY, ny);
          maxX = p.max(maxX, nx);
          maxY = p.max(maxY, ny);

          x = nx;
          y = ny;
          break;
        }
        case "+":
          angle += p.radians(angleVal);
          break;
        case "-":
          angle -= p.radians(angleVal);
          break;
        case "[":
          stack.push({ x, y, angle });
          break;
        case "]": {
          const s = stack.pop();
          x = s.x;
          y = s.y;
          angle = s.angle;
          break;
        }
      }
    }

    const width = maxX - minX;
    const height = maxY - minY;

    // 빈 캔버스 에러 방지
    if (width === 0 || height === 0) return;

    drawScale = p.min((p.width * 0.82) / width, (p.height * 0.82) / height);
    offsetX = p.width * 0.5 - (minX + width * 0.5) * drawScale;
    offsetY = p.height * 0.92 - maxY * drawScale;
  }

  // Turtle Graphics 렌더링
  function drawSentence(angleVal) {
    let depth = 0;
    const stack = [];

    for (const ch of sentence) {
      switch (ch) {
        case "F": {
          // 가지 깊이에 따라 선 굵기 조절
          const weight = p.max(0.7, 3.6 - depth * 0.2);

          p.stroke(accentR, accentG, accentB);
          p.strokeWeight(weight / drawScale);
          p.line(0, 0, segmentLength, 0);
          p.translate(segmentLength, 0);
          break;
        }
        case "+": {
          const sway = p.sin(wind + depth * 0.45) * 5;
          p.rotate(p.radians(angleVal + sway));
          break;
        }
        case "-": {
          const sway = p.sin(wind + depth * 0.45) * 5;
          p.rotate(-p.radians(angleVal + sway));
          break;
        }
        case "[":
          stack.push(depth);
          depth++;
          p.push();
          break;
        case "]":
          // 가지 끝부분(잎) 포인트 렌더링
          p.noStroke();
          p.fill(accentR, accentG, accentB);
          p.circle(0, 0, 3 / drawScale);
          
          p.pop();
          depth = stack.pop();
          break;
        case "X":
          break;
      }
    }
  }
}