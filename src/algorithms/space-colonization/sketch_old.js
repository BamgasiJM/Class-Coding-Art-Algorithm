export default function spaceColonizationSketch(p, size) {
  let leaves = [];
  let branches = [];
  let maxLeaves = 500; // 잎(먹이) 개수
  let minDist = 10; // 먹이 섭취 완료 반경
  let maxDist = 80; // 먹이를 인식할 수 있는 최대 반경
  let branchLength = 3; // 한 번에 자라나는 나뭇가지 마디의 길이
  let accentColor;

  p.setup = function () {
    p.createCanvas(size, size);

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 1. 임의의 영역에 나뭇가지가 찾아갈 먹이(잎) 소스 생성
    leaves = [];
    for (let i = 0; i < maxLeaves; i++) {
      // 상단의 둥근 구형태 내에 잎들을 밀집되게 분포
      let angle = p.random(p.TWO_PI);
      let r = p.random(0, size * 0.38);
      leaves.push({
        x: size / 2 + p.cos(angle) * r,
        y: size * 0.45 + p.sin(angle) * r * 0.8,
        reached: false,
      });
    }

    // 2. 나무의 시작점인 뿌리 노드(Root Node) 설정
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

    // 3. 뿌리에서부터 첫 번째 먹이가 감지될 때까지 위로 초기 생장 연산
    let current = root;
    let found = false;
    while (!found) {
      for (let leaf of leaves) {
        let d = p.dist(current.x, current.y, leaf.x, leaf.y);
        if (d < maxDist) {
          found = true;
        }
      }
      if (!found) {
        let nextBranch = {
          x: current.x + current.dirX * branchLength,
          y: current.y + current.dirY * branchLength,
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

    // Space Colonization 알고리즘 메인 루프 연산
    // 각 나뭇가지 노드 방향 벡터 초기화
    for (let branch of branches) {
      branch.dirX = 0;
      branch.dirY = 0;
      branch.count = 0;
    }

    // 1. 각 먹이(잎)에 대해 가장 가까운 나뭇가지 탐색 및 인력 방향 누적
    for (let i = leaves.length - 1; i >= 0; i--) {
      let leaf = leaves[i];
      let closestBranch = null;
      let recordDist = maxDist;

      for (let branch of branches) {
        let d = p.dist(leaf.x, leaf.y, branch.x, branch.y);
        if (d < minDist) {
          leaf.reached = true;
          break;
        } else if (d < recordDist) {
          closestBranch = branch;
          recordDist = d;
        }
      }

      if (leaf.reached) {
        leaves.splice(i, 1); // 섭취된 먹이는 배열에서 제거
        continue;
      }

      if (closestBranch != null) {
        let dx = leaf.x - closestBranch.x;
        let dy = leaf.y - closestBranch.y;
        let d = p.dist(0, 0, dx, dy);
        // 인력 방향 정규화 후 누적
        closestBranch.dirX += dx / d;
        closestBranch.dirY += dy / d;
        closestBranch.count++;
      }
    }

    // 2. 인력을 받은 나뭇가지 노드에서 새로운 마디 확장 생성
    let newBranches = [];
    for (let branch of branches) {
      if (branch.count > 0) {
        let avgX = branch.dirX / branch.count;
        let avgY = branch.dirY / branch.count;
        let d = p.dist(0, 0, avgX, avgY);

        let nextBranch = {
          x: branch.x + (avgX / d) * branchLength,
          y: branch.y + (avgY / d) * branchLength,
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

    // 3. 나뭇가지 네트워크 렌더링
    p.stroke(accentColor);
    for (let branch of branches) {
      if (branch.parent) {
        p.strokeWeight(1.8);
        p.line(branch.x, branch.y, branch.px, branch.py);
      }
    }

    // 4. 아직 남아있는 먹이(잎) 소스 포인트 시각화
    p.noStroke();
    p.fill(240, 240, 255, 120);
    for (let leaf of leaves) {
      p.circle(leaf.x, leaf.y, 2);
    }

    // 먹이를 모두 소모했거나 성장이 끝나면 루프 중단
    if (leaves.length === 0 || newBranches.length === 0) {
      p.noLoop();
    }
  };
}
