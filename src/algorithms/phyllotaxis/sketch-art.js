export default function phyllotaxisSketch(p, size) {
  let accentColor;
  let accentRGB;

  // 황금각 (137.5°)
  const goldenAngle = p.PI * (3 - p.sqrt(5));

  // 파라미터
  const pointCount = 500;
  const numLayers = 2;
  const spacing = 8;

  let layers = [];
  let time = 0;
  let pulsePhase = 0;

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // accent 색상을 RGB로 파싱
    let c = p.color(accentColor);
    accentRGB = {
      r: p.red(c),
      g: p.green(c),
      b: p.blue(c),
    };

    buildLayers();
    p.background(8, 8, 16);

    // 마우스 이벤트를 setup 안에서 정의
    p.mousePressed = function () {
      if (
        p.mouseX >= 0 &&
        p.mouseX <= p.width &&
        p.mouseY >= 0 &&
        p.mouseY <= p.height
      ) {
        buildLayers();
      }
    };
  };

  // 다중 레이어 생성 (깊이감 표현)
  function buildLayers() {
    layers = [];

    for (let layer = 0; layer < numLayers; layer++) {
      let points = [];
      let layerOffset = layer * 0.3; // 각 레이어의 위상 오프셋

      for (let i = 0; i < pointCount; i++) {
        const radius = spacing * p.sqrt(i) * (1 + layer * 0.15);
        const angle = i * goldenAngle + layerOffset;

        points.push({
          index: i,
          radius,
          angle,
          baseSize: p.map(i, 0, pointCount, 1.5, 4),
        });
      }

      layers.push({
        points,
        rotationSpeed: 0.02 + layer * 0.02, // 각 레이어 다른 회전 속도
        brightnessScale: 1 - layer * 0.25, // 뒤쪽 레이어일수록 어둡게
        alphaScale: 1 - layer * 0.3, // 뒤쪽 레이어일수록 투명하게
      });
    }
  }

  p.draw = function () {
    p.background(8, 8, 16, 40);

    time += 0.008;
    pulsePhase += 0.03;

    // 마우스 인터랙션: 마우스 위치에 따른 패턴 왜곡
    let mouseInfluence = 0;
    let mouseAngle = 0;
    if (
      p.mouseX > 0 &&
      p.mouseX < p.width &&
      p.mouseY > 0 &&
      p.mouseY < p.height
    ) {
      let dx = p.mouseX - p.width / 2;
      let dy = p.mouseY - p.height / 2;
      mouseInfluence =
        p.min(p.sqrt(dx * dx + dy * dy) / (p.width * 0.5), 1) * 0.3;
      mouseAngle = p.atan2(dy, dx);
    }

    p.push();
    p.translate(p.width / 2, p.height / 2);

    // 각 레이어 렌더링 (뒤에서 앞으로)
    for (let layerIdx = layers.length - 1; layerIdx >= 0; layerIdx--) {
      let layer = layers[layerIdx];

      p.push();
      p.rotate(time * layer.rotationSpeed);

      // 1. 연결선: 피보나치 이웃 (i+1, i+2)
      p.strokeWeight(0.3);
      for (let i = 0; i < layer.points.length - 2; i++) {
        let pt = layer.points[i];

        // 중심부만 연결 (외곽은 너무 복잡해짐)
        if (pt.radius > p.width * 0.25) continue;

        let distRatio = p.constrain(pt.radius / (p.width * 0.45), 0, 1);
        let lineAlpha =
          p.map(distRatio, 0, 1, 60, 10) * layer.alphaScale;

        let cr = accentRGB.r * 0.8;
        let cg = accentRGB.g * 0.8;
        let cb = accentRGB.b * 0.8;
        p.stroke(cr, cg, cb, lineAlpha);

        // i+1, i+2 점과 연결
        for (let offset = 1; offset <= 2; offset++) {
          let next = layer.points[i + offset];

          let wave1 = p.sin(time * 2 + pt.index * 0.05) * 2;
          let wave2 = p.sin(time * 2 + next.index * 0.05) * 2;

          let r1 = pt.radius + wave1;
          let r2 = next.radius + wave2;

          let x1 = p.cos(pt.angle) * r1;
          let y1 = p.sin(pt.angle) * r1;
          let x2 = p.cos(next.angle) * r2;
          let y2 = p.sin(next.angle) * r2;

          p.line(x1, y1, x2, y2);
        }
      }

      // 2. 점 렌더링
      p.noStroke();
      for (let pt of layer.points) {
        // 펄스 파동: 중심에서 바깥으로 퍼지는 파동
        let pulseWave =
          p.sin(pulsePhase - pt.radius * 0.02) * 0.5 + 0.5;

        // 마우스 왜곡
        let distortion = 0;
        if (mouseInfluence > 0) {
          let angleDiff = pt.angle - mouseAngle;
          distortion = p.cos(angleDiff) * mouseInfluence * 20;
        }

        // 진동
        let wave = p.sin(time * 2 + pt.index * 0.05) * 2;

        let r = pt.radius + wave + distortion;
        let x = p.cos(pt.angle) * r;
        let y = p.sin(pt.angle) * r;

        // 색상: 중심→외곽 그라디언트 + 레이어 밝기
        let distRatio = p.constrain(pt.radius / (p.width * 0.45), 0, 1);
        let brightness = (1 - distRatio * 0.7) * layer.brightnessScale;
        brightness *= 0.7 + pulseWave * 0.3;

        let alpha = p.map(distRatio, 0, 1, 255, 80) * layer.alphaScale;
        alpha = p.constrain(alpha, 0, 255);

        let cr = accentRGB.r * brightness;
        let cg = accentRGB.g * brightness;
        let cb = accentRGB.b * brightness;

        // 글로우 효과
        let glowSize = pt.baseSize * (1.0 + pulseWave * 0.5);
        p.fill(cr, cg, cb, alpha * 0.3);
        p.circle(x, y, glowSize * 2);

        // 핵심 점
        p.fill(cr, cg, cb, alpha);
        p.circle(x, y, pt.baseSize);
      }

      p.pop();
    }

    p.pop();
  };
}