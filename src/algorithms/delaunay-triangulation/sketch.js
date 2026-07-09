export default function delaunayTriangulationSketch(p, size, params = {}) {
  let points = [];
  let triangles = [];
  let accentR, accentG, accentB;
  let time = 0;

  const P = {
    numPoints: () => params.numPoints ?? 120,
    baseAlpha: () => params.baseAlpha ?? 40,
    jitterSpeed: () => params.jitterSpeed ?? 0.005,
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

    generateInitialPoints();
    p.background(8, 8, 16);
  };

  function generateInitialPoints() {
    points = [];
    let margin = 50;
    for (let i = 0; i < P.numPoints(); i++) {
      points.push({
        x: p.random(margin, p.width - margin),
        y: p.random(margin, p.height - margin),
        noiseOffset: p.random(1000)
      });
    }
  }

  // Bowyer-Watson 알고리즘[cite: 12]
  function bowyerWatson(pts) {
    let superTri = [
      { x: -p.width * 2, y: -p.height * 2 },
      { x: p.width * 3, y: -p.height * 2 },
      { x: p.width / 2, y: p.height * 3 },
    ];
    let tris = [superTri];

    for (let pt of pts) {
      let badTriangles = [];
      for (let tri of tris) {
        let cc = circumcircle(tri);
        let distSq = (pt.x - cc.x) ** 2 + (pt.y - cc.y) ** 2;
        if (distSq < cc.r * cc.r) badTriangles.push(tri);
      }
      let polygon = [];
      for (let tri of badTriangles) {
        for (let i = 0; i < 3; i++) {
          let edge = [tri[i], tri[(i + 1) % 3]];
          let shared = false;
          for (let other of badTriangles) {
            if (other === tri) continue;
            for (let j = 0; j < 3; j++) {
              let otherEdge = [other[j], other[(j + 1) % 3]];
              if (sameEdge(edge, otherEdge)) { shared = true; break; }
            }
            if (shared) break;
          }
          if (!shared) polygon.push(edge);
        }
      }
      for (let tri of badTriangles) {
        let idx = tris.indexOf(tri);
        if (idx !== -1) tris.splice(idx, 1);
      }
      for (let edge of polygon) {
        tris.push([edge[0], edge[1], pt]);
      }
    }
    return tris.filter(tri => !tri.some(v => superTri.includes(v)));
  }

  function circumcircle(tri) {
    let ax = tri[0].x, ay = tri[0].y;
    let bx = tri[1].x, by = tri[1].y;
    let cx = tri[2].x, cy = tri[2].y;
    let d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) < 0.0001) return { x: 0, y: 0, r: Infinity };
    let a2 = ax * ax + ay * ay, b2 = bx * bx + by * by, c2 = cx * cx + cy * cy;
    let ux = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d;
    let uy = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d;
    return { x: ux, y: uy, r: Math.sqrt((ax - ux) ** 2 + (ay - uy) ** 2) };
  }

  function sameEdge(e1, e2) {
    return (e1[0] === e2[0] && e1[1] === e2[1]) || (e1[0] === e2[1] && e1[1] === e2[0]);
  }

  p.draw = function () {
    p.background(8, 8, 16);
    
    // 시간축은 일정하게 증가시키고, 움직임의 강도를 jitterSpeed로 조절
    time += 0.01; 
    let speed = P.jitterSpeed();

    if (points.length !== P.numPoints()) {
      generateInitialPoints();
    }

    for (let pt of points) {
      // 파라미터 적용: 속도(speed)를 Displacement(이동량)의 배율로 사용
      pt.x += p.map(p.noise(pt.noiseOffset, time), 0, 1, -1, 1) * speed * 20;
      pt.y += p.map(p.noise(pt.noiseOffset + 100, time), 0, 1, -1, 1) * speed * 20;
    }

    triangles = bowyerWatson(points);

    for (let tri of triangles) {
      let cx = (tri[0].x + tri[1].x + tri[2].x) / 3;
      let cy = (tri[0].y + tri[1].y + tri[2].y) / 3;
      
      let d = p.dist(cx, cy, p.width / 2, p.height / 2);
      let alpha = p.map(d, 0, p.width / 2, 255, P.baseAlpha(), true);

      p.stroke(accentR, accentG, accentB, 100); 
      p.fill(accentR, accentG, accentB, alpha);
      p.strokeWeight(0.5);
      
      p.beginShape();
      p.vertex(tri[0].x, tri[0].y);
      p.vertex(tri[1].x, tri[1].y);
      p.vertex(tri[2].x, tri[2].y);
      p.endShape(p.CLOSE);
    }
  };
}