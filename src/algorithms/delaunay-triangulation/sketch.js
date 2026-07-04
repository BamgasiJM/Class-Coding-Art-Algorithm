export default function delaunayTriangulationSketch(p, size) {
  let points = [];
  let triangles = [];
  let numPoints = 120;
  let accentColor;
  let edgeColor;
  let fillColor;
  let pointColor;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 색상 설정 (accent color 기반)
    edgeColor = p.color(accentColor);
    edgeColor.setAlpha(200);

    fillColor = p.color(accentColor);
    fillColor.setAlpha(35);

    pointColor = p.color(255);
    pointColor.setAlpha(230);

    generate();
    p.background(8, 8, 16);
  };

  // 랜덤 점 생성 + Delaunay triangulation 수행
  function generate() {
    points = [];
    let margin = 40;
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: p.random(margin, p.width - margin),
        y: p.random(margin, p.height - margin),
      });
    }
    triangles = bowyerWatson(points);
  }

  // Bowyer-Watson 알고리즘으로 Delaunay Triangulation 계산
  function bowyerWatson(points) {
    // super triangle: 모든 점을 감싸는 충분히 큰 삼각형
    let superTri = [
      { x: -p.width * 10, y: -p.height * 10 },
      { x: p.width * 20, y: -p.height * 10 },
      { x: p.width / 2, y: p.height * 20 },
    ];

    let tris = [superTri];

    // 각 점을 순차적으로 삽입
    for (let pt of points) {
      let badTriangles = [];
      let polygon = [];

      // 현재 점의 외접원 내부에 있는 삼각형("bad triangles") 찾기
      for (let tri of tris) {
        let cc = circumcircle(tri);
        let dx = pt.x - cc.x;
        let dy = pt.y - cc.y;
        if (dx * dx + dy * dy < cc.r * cc.r) {
          badTriangles.push(tri);
        }
      }

      // bad triangle들의 경계 중 다른 bad triangle과 공유되지 않는 edge 추출
      for (let tri of badTriangles) {
        for (let i = 0; i < 3; i++) {
          let edge = [tri[i], tri[(i + 1) % 3]];
          let shared = false;

          for (let other of badTriangles) {
            if (other === tri) continue;
            for (let j = 0; j < 3; j++) {
              let otherEdge = [other[j], other[(j + 1) % 3]];
              if (sameEdge(edge, otherEdge)) {
                shared = true;
                break;
              }
            }
            if (shared) break;
          }

          if (!shared) polygon.push(edge);
        }
      }

      // bad triangle 제거
      for (let tri of badTriangles) {
        let idx = tris.indexOf(tri);
        if (idx !== -1) tris.splice(idx, 1);
      }

      // 새 점과 polygon의 edge로 새 삼각형 생성
      for (let edge of polygon) {
        tris.push([edge[0], edge[1], pt]);
      }
    }

    // super triangle의 꼭짓점을 포함하는 삼각형 제거
    let result = [];
    for (let tri of tris) {
      let usesSuper = tri.some((v) => superTri.includes(v));
      if (!usesSuper) result.push(tri);
    }

    return result;
  }

  // 삼각형의 외접원(center, radius) 계산
  function circumcircle(tri) {
    let ax = tri[0].x, ay = tri[0].y;
    let bx = tri[1].x, by = tri[1].y;
    let cx = tri[2].x, cy = tri[2].y;

    let d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) < 0.0001) {
      return { x: 0, y: 0, r: Infinity };
    }

    let a2 = ax * ax + ay * ay;
    let b2 = bx * bx + by * by;
    let c2 = cx * cx + cy * cy;

    let ux = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d;
    let uy = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d;

    let dx = ax - ux;
    let dy = ay - uy;
    return { x: ux, y: uy, r: Math.sqrt(dx * dx + dy * dy) };
  }

  // 두 edge가 동일한지 확인 (방향 무관)
  function sameEdge(e1, e2) {
    return (
      (e1[0] === e2[0] && e1[1] === e2[1]) ||
      (e1[0] === e2[1] && e1[1] === e2[0])
    );
  }

  p.draw = function () {
    p.background(8, 8, 16);

    // 삼각형 렌더링 (내부 채움 + 변 그리기)
    p.fill(fillColor);
    p.stroke(edgeColor);
    p.strokeWeight(1);

    for (let tri of triangles) {
      p.triangle(
        tri[0].x, tri[0].y,
        tri[1].x, tri[1].y,
        tri[2].x, tri[2].y,
      );
    }

    // 꼭짓점(점) 시각화
    p.noStroke();
    p.fill(pointColor);
    for (let pt of points) {
      p.circle(pt.x, pt.y, 4);
    }
  };

  // 클릭 시 새로운 패턴 생성
  p.mousePressed = function () {
    if (
      p.mouseX >= 0 && p.mouseX <= p.width &&
      p.mouseY >= 0 && p.mouseY <= p.height
    ) {
      generate();
    }
  };
}