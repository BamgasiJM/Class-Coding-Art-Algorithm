import sketch from './sketch'

export default {
  longDescription: {
    ko: 'DFS(깊이 우선 탐색) 기반 백트래킹 알고리즘으로 격자 공간의 벽을 무작위로 허물며 완전한 미로를 생성합니다. 현재 셀에서 방문하지 않은 이웃을 선택해 벽을 제거하고 스택에 경로를 저장하다가, 막다른 길에 도달하면 스택을 되짚어가며 새로운 갈래를 탐색합니다. 이 과정을 시각화하면 미로가 절차적으로 펼쳐지는 모습을 볼 수 있습니다.',
    en: 'This algorithm generates a perfect maze using depth-first search (DFS) with backtracking. Starting from the current cell, it randomly picks an unvisited neighbor, removes the wall between them, and pushes the path onto a stack. When it hits a dead end, it backtracks by popping the stack until a new branch is found. Visualizing this process reveals how the maze procedurally unfolds.',
  },
  sketch,
  related: ['Space Colonization', 'Cellular Automata', 'Diffusion-Limited Aggregation'],
}