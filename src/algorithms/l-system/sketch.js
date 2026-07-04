export default function lSystemSketch(p, size) {
  let accentColor;

  let sentence = "X";

  const rules = {
    X: "F+[[X]-X]-F[-FX]+X",
    F: "FF",
  };

  const iterations = 5;

  const baseAngle = 25;

  // 기준 선 길이 (더 이상 generate에서 줄이지 않음)
  const segmentLength = 8;

  let wind = 0;

  let drawScale = 1;
  let offsetX = 0;
  let offsetY = 0;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    generate();

    calculateBounds();

    p.background(8, 8, 16);

    p.strokeCap(p.ROUND);
    p.noFill();
  };

  p.draw = function () {
    p.background(8, 8, 16);

    wind += 0.02;

    p.push();

    p.translate(offsetX, offsetY);
    p.scale(drawScale);

    // 위쪽으로 성장
    p.rotate(-p.HALF_PI);

    drawSentence();

    p.pop();
  };

  //--------------------------------------------------
  // 문자열 생성
  //--------------------------------------------------

  function generate() {
    for (let i = 0; i < iterations; i++) {
      let next = "";

      for (const ch of sentence) {
        next += rules[ch] || ch;
      }

      sentence = next;
    }
  }

  //--------------------------------------------------
  // Bounding Box 계산
  //--------------------------------------------------

  function calculateBounds() {
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
          angle += p.radians(baseAngle);
          break;

        case "-":
          angle -= p.radians(baseAngle);
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

    drawScale = p.min((p.width * 0.82) / width, (p.height * 0.82) / height);

    offsetX = p.width * 0.5 - (minX + width * 0.5) * drawScale;

    offsetY = p.height * 0.92 - maxY * drawScale;
  }

  //--------------------------------------------------
  // Turtle Graphics
  //--------------------------------------------------

  function drawSentence() {
    let depth = 0;
    const stack = [];

    for (const ch of sentence) {
      switch (ch) {
        case "F": {
          const weight = p.max(0.7, 3.6 - depth * 0.2);

          p.stroke(accentColor);
          p.strokeWeight(weight / drawScale);

          p.line(0, 0, segmentLength, 0);

          p.translate(segmentLength, 0);

          break;
        }

        case "+": {
          const sway = p.sin(wind + depth * 0.45) * 5;

          p.rotate(p.radians(baseAngle + sway));

          break;
        }

        case "-": {
          const sway = p.sin(wind + depth * 0.45) * 5;

          p.rotate(-p.radians(baseAngle + sway));

          break;
        }

        case "[":
          stack.push(depth);
          depth++;

          p.push();

          break;

        case "]":
          p.noStroke();
          p.fill(accentColor);

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
