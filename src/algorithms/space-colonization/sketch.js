export default function spaceColonizationSketch(p, size, params = {}) {
  let leaves = [];
  let branches = [];
  let accentColor;

  // === 파라미터 접근자
  const P = {
    maxLeaves: () => params.maxLeaves ?? 500,              // 구조
    minDist: () => params.minDist ?? 10,                   // 실시간
    maxDist: () => params.maxDist ?? 80,                   // 실시간
    branchLength: () => params.branchLength ?? 3,          // 구조
    leafSize: () => params.leafSize ?? 2,                  // 실시간
    leafSpreadRadius: () => params.leafSpreadRadius ?? 0.38, // 구조
  };

  p.setup = function () {
    p.createCanvas(size, size);

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 1. 잎(먹이) 생성
    leaves = [];
    const maxL = P.maxLeaves();
    const spreadR = P.leafSpreadRadius();

    for (let i = 0; i < maxL; i++) {
      let angle = p.random(p.TWO_PI);
      let r = p.random(0, size * spreadR);
      leaves.push({
        x: size / 2 + p.cos(angle) * r,
        y: size * 0.45 + p.sin(angle) * r * 0.8,
        reached: false,
      });
    }

    // 2. 뿌리 노드 설정 (위치 고정)
    let root = {
      x: size / 2,
      y: size * 0.95,
      px: size / 2,
      py: size * 0.95,
      dirX: 0,
      dirY: -1,
      parent: null,
      count: 0,
    };
    branches.push(root);

    // 3. 초기 생장 연산
    let current = root;
    let found = false;
    const maxD = P.maxDist();
    const brLen = P.branchLength();

    // 먹이에 닿을 때까지 줄기를 키운다. 무한 반복을 막기 위해 최대 2000번까지만 시도한다.
    for (let step = 0; !found && step < 2000; step++) {
      for (let leaf of leaves) {
        let d = p.dist(current.x, current.y, leaf.x, leaf.y);
        if (d < maxD) {
          found = true;
        }
      }
      if (!found) {
        let nextBranch = {
          x: current.x + current.dirX * brLen,
          y: current.y + current.dirY * brLen,
          px: current.x,
          py: current.y,
          dirX: current.dirX,
          dirY: current.dirY,
          parent: current,
          count: 0,
        };
        branches.push(nextBranch);
        current = nextBranch;
      }
    }

    p.background(8, 8, 16);
  };

  p.draw = function () {
    p.background(8, 8, 16);

    const minD = P.minDist();
    const maxD = P.maxDist();
    const brLen = P.branchLength();
    const leafSz = P.leafSize();

    // 각 나뭇가지 방향 벡터 초기화
    for (let branch of branches) {
      branch.dirX = 0;
      branch.dirY = 0;
      branch.count = 0;
    }

    // 1. 각 먹이에 대해 가장 가까운 나뭇가지 탐색
    for (let i = leaves.length - 1; i >= 0; i--) {
      let leaf = leaves[i];
      let closestBranch = null;
      let recordDist = maxD;

      for (let branch of branches) {
        let d = p.dist(leaf.x, leaf.y, branch.x, branch.y);
        if (d < minD) {
          leaf.reached = true;
          break;
        } else if (d < recordDist) {
          closestBranch = branch;
          recordDist = d;
        }
      }

      if (leaf.reached) {
        leaves.splice(i, 1);
        continue;
      }

      if (closestBranch != null) {
        let dx = leaf.x - closestBranch.x;
        let dy = leaf.y - closestBranch.y;
        let d = p.dist(0, 0, dx, dy);
        closestBranch.dirX += dx / d;
        closestBranch.dirY += dy / d;
        closestBranch.count++;
      }
    }

    // 2. 새로운 마디 확장 생성
    let newBranches = [];
    for (let branch of branches) {
      if (branch.count > 0) {
        let avgX = branch.dirX / branch.count;
        let avgY = branch.dirY / branch.count;
        let d = p.dist(0, 0, avgX, avgY);
        if (d === 0) continue; // 가지가 서로 상쇄되어 방향이 없으면 건너뛴다 (0으로 나누기 방지)

        let nextBranch = {
          x: branch.x + (avgX / d) * brLen,
          y: branch.y + (avgY / d) * brLen,
          px: branch.x,
          py: branch.y,
          dirX: avgX / d,
          dirY: avgY / d,
          parent: branch,
          count: 0,
        };
        newBranches.push(nextBranch);
      }
    }
    branches = branches.concat(newBranches);

    // 3. 나뭇가지 렌더링
    p.stroke(accentColor);
    for (let branch of branches) {
      if (branch.parent) {
        p.strokeWeight(1.8);
        p.line(branch.x, branch.y, branch.px, branch.py);
      }
    }

    // 4. 잎 렌더링
    p.noStroke();
    p.fill(240, 240, 255, 120);
    for (let leaf of leaves) {
      p.circle(leaf.x, leaf.y, leafSz);
    }

    // 시뮬레이션 종료
    if (leaves.length === 0 || newBranches.length === 0) {
      p.noLoop();
    }
  };
}