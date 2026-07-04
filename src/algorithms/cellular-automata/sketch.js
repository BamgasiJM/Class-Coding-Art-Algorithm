export default function cellularAutomataSketch(p, size) {
  let cells = []
  let w = 4 // 각 셀의 크기 (정사각형 픽셀)
  let cols, rows
  let generation = 0
  
  // Wolfram Rule 90: 시에르핀스키 가스켓과 같은 프랙탈 구조를 생성하는 규칙
  // [111, 110, 101, 100, 011, 010, 001, 000]
  let ruleset = [0, 1, 0, 1, 1, 0, 1, 0]
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)
    
    cols = p.floor(p.width / w)
    rows = p.floor(p.height / w)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 1차원 그리드 배열 초기화 및 중앙 셀을 1 활성화 상태로 시작
    cells = new Array(cols).fill(0)
    cells[p.floor(cols / 2)] = 1

    p.background(8, 8, 16)
  }

  // 이웃 셀들의 상태를 바탕으로 다음 세대 상태 계산 (Rule 90 적용)
  function rules(a, b, c) {
    let s = '' + a + b + c
    let index = parseInt(s, 2)
    return ruleset[7 - index]
  }

  function generate() {
    let nextgen = new Array(cols).fill(0)
    
    // 경계면을 제외하고 좌우 이웃 상태를 참조하여 다음 세대 전이
    for (let i = 1; i < cols - 1; i++) {
      let left = cells[i - 1]
      let me = cells[i]
      let right = cells[i + 1]
      nextgen[i] = rules(left, me, right)
    }
    
    cells = nextgen
    generation++
  }

  p.draw = function() {
    // 화면 크기를 초과하는 세대에 도달하면 연산 중지 및 대기
    if (generation >= rows) {
      p.noLoop()
      return
    }

    // 현재 세대의 상태를 가로 한 줄로 시각화
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === 1) {
        p.fill(accentColor)
        p.noStroke()
        p.rect(i * w, generation * w, w, w)
      }
    }

    // 다음 세대 연산 진행
    generate()
  }
}