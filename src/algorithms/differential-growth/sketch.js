export default function differentialGrowthSketch(p, size, params = {}) {
  let nodes = [];
  let accentR, accentG, accentB;

  const P = {
    maxNodes: () => params.maxNodes ?? 300,
    rInner: () => params.rInner ?? 18,
    rOuter: () => params.rOuter ?? 12,
    maxForce: () => params.maxForce ?? 0.5,
    maxSpeed: () => params.maxSpeed ?? 2,
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

    nodes = [];
    let initRadius = 30;
    let initNodesCount = 40;
    for (let i = 0; i < initNodesCount; i++) {
      let angle = (i / initNodesCount) * p.TWO_PI;
      nodes.push({
        x: p.width / 2 + p.cos(angle) * initRadius,
        y: p.height / 2 + p.sin(angle) * initRadius,
        vx: 0,
        vy: 0,
      });
    }

    p.background(8, 8, 16);
  };

  function updateGrowth() {
    let forces = [];
    for (let i = 0; i < nodes.length; i++) {
      forces.push({ fx: 0, fy: 0, count: 0 });
    }

    const rIn = P.rInner();
    const rOut = P.rOuter();
    const mForce = P.maxForce();
    const mSpeed = P.maxSpeed();
    const mNodes = P.maxNodes();

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        let d = p.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        if (d < rIn && d > 0) {
          let diffX = nodes[i].x - nodes[j].x;
          let diffY = nodes[i].y - nodes[j].y;
          let scale = (rIn - d) / d;

          forces[i].fx += diffX * scale;
          forces[i].fy += diffY * scale;
          forces[i].count++;

          forces[j].fx -= diffX * scale;
          forces[j].fy -= diffY * scale;
          forces[j].count++;
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      let leftIdx = (i - 1 + nodes.length) % nodes.length;
      let rightIdx = (i + 1) % nodes.length;

      let cx = (nodes[leftIdx].x + nodes[rightIdx].x) / 2;
      let cy = (nodes[leftIdx].y + nodes[rightIdx].y) / 2;

      let cohX = cx - nodes[i].x;
      let cohY = cy - nodes[i].y;

      if (forces[i].count > 0) {
        forces[i].fx /= forces[i].count;
        forces[i].fy /= forces[i].count;
      }

      let totalFx = forces[i].fx + cohX * 0.1;
      let totalFy = forces[i].fy + cohY * 0.1;

      let mag = p.dist(0, 0, totalFx, totalFy);
      if (mag > mForce) {
        totalFx = (totalFx / mag) * mForce;
        totalFy = (totalFy / mag) * mForce;
      }

      nodes[i].vx += totalFx;
      nodes[i].vy += totalFy;

      let speed = p.dist(0, 0, nodes[i].vx, nodes[i].vy);
      if (speed > mSpeed) {
        nodes[i].vx = (nodes[i].vx / speed) * mSpeed;
        nodes[i].vy = (nodes[i].vy / speed) * mSpeed;
      }

      nodes[i].x += nodes[i].vx;
      nodes[i].y += nodes[i].vy;

      nodes[i].vx *= 0.8;
      nodes[i].vy *= 0.8;
    }

    if (nodes.length < mNodes) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        let nextIdx = (i + 1) % nodes.length;
        let d = p.dist(
          nodes[i].x,
          nodes[i].y,
          nodes[nextIdx].x,
          nodes[nextIdx].y,
        );

        if (d > rOut) {
          let midX = (nodes[i].x + nodes[nextIdx].x) / 2;
          let midY = (nodes[i].y + nodes[nextIdx].y) / 2;
          nodes.splice(nextIdx, 0, { x: midX, y: midY, vx: 0, vy: 0 });
        }
      }
    } else if (nodes.length > mNodes) {
      nodes.length = mNodes;
    }
  }

  p.draw = function () {
    p.background(8, 8, 16);

    updateGrowth();

    p.noFill();
    p.stroke(accentR, accentG, accentB);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < nodes.length; i++) {
      p.vertex(nodes[i].x, nodes[i].y);
    }
    p.endShape(p.CLOSE);

    p.fill(240, 240, 255);
    p.noStroke();
    for (let i = 0; i < nodes.length; i++) {
      p.circle(nodes[i].x, nodes[i].y, 2);
    }
  };
}