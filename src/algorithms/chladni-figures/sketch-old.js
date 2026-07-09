export default function chladniFiguresSketch(p, size) {
  // 렌더링 성능을 위해 화면을 픽셀 단위가 아닌 8x8 블록 단위로 처리하도록 셀 크기를 설정합니다.
  const CELL = 8
  // 화면을 덮기 위해 필요한 가로(cols)와 세로(rows) 셀의 개수를 저장할 변수입니다.
  let cols, rows
  // CSS 변수에서 추출할 액센트 컬러의 R, G, B 값을 저장할 변수입니다.
  let accentR, accentG, accentB
  // 배경색으로 사용할 어두운 남색 계열의 R, G, B 값을 상수로 고정합니다.
  const bgR = 8, bgG = 8, bgB = 16
  // 클라드니 패턴의 복잡도를 결정하는 주파수 파라미터 n과 m의 초기값을 설정합니다.
  let n = 3, m = 5
  // 자동 애니메이션에 사용될 시간 누적 변수입니다.
  let time = 0

  // p5.js의 초기화 함수로, 스케치가 시작될 때 한 번 실행됩니다.
  p.setup = function () {
    // 전달받은 size 변수를 바탕으로 정사각형 형태의 캔버스를 생성합니다.
    p.createCanvas(size, size)
    // 픽셀 배열 조작 시 디스플레이 배율(Retina 등)에 의한 계산 복잡도를 줄이기 위해 픽셀 밀도를 1로 고정합니다.
    p.pixelDensity(1)
    
    // 전체 캔버스 크기를 셀 크기로 나누어 가로 방향의 셀 개수를 계산합니다.
    cols = p.floor(size / CELL)
    // 전체 캔버스 크기를 셀 크기로 나누어 세로 방향의 셀 개수를 계산합니다.
    rows = p.floor(size / CELL)

    // 웹 문서의 최상위 요소(html)에 적용된 CSS 스타일을 가져옵니다.
    const hex = getComputedStyle(document.documentElement)
      // '--accent'라는 이름의 CSS 사용자 지정 속성(변수) 값을 추출합니다.
      .getPropertyValue('--accent')
      // 추출한 문자열 앞뒤의 공백을 제거합니다.
      .trim()
      
    // 추출한 HEX 색상 코드를 p5.js의 color 객체로 변환합니다. (값이 없을 경우 기본 핑크색 적용)
    const tmp = p.color(hex || '#ff5588')
    // color 객체에서 Red 채널 값을 추출하여 저장합니다.
    accentR = p.red(tmp)
    // color 객체에서 Green 채널 값을 추출하여 저장합니다.
    accentG = p.green(tmp)
    // color 객체에서 Blue 채널 값을 추출하여 저장합니다.
    accentB = p.blue(tmp)

    // 캔버스의 초기 배경색을 bgR, bgG, bgB 상수를 사용하여 칠합니다.
    p.background(bgR, bgG, bgB)
  }

  // 2차원 평면에서의 클라드니(Chladni) 고유모드 함수를 정의합니다.
  // x와 y는 0부터 1 사이로 정규화된 좌표계이며, n과 m은 공진 주파수를 나타냅니다.
  function chladni(x, y, n, m) {
    // 첫 번째 진동 성분: x축 방향으로 n번, y축 방향으로 m번 진동하는 코사인 파형의 곱입니다.
    const a = p.cos(n * p.PI * x) * p.cos(m * p.PI * y)
    // 두 번째 진동 성분: x축 방향으로 m번, y축 방향으로 n번 진동하는 코사인 파형의 곱입니다.
    const b = p.cos(m * p.PI * x) * p.cos(n * p.PI * y)
    // 두 성분의 차이를 반환하여 대칭성을 가진 간섭 패턴을 생성합니다.
    return a - b
  }

  // p5.js의 드로우 루프로, 매 프레임마다 화면을 갱신하기 위해 실행됩니다.
  p.draw = function () {
    // 매 프레임마다 time 변수를 미세하게 증가시켜 애니메이션의 진행을 만듭니다.
    time += 0.005

    // 마우스 커서가 캔버스 영역 내부에 있는지 여부를 판별하여 boolean 값으로 저장합니다.
    const mouseIn = p.mouseX > 0 && p.mouseX < size && p.mouseY > 0 && p.mouseY < size
    
    // 마우스가 캔버스 안에 있을 경우, 수동 제어 모드로 전환합니다.
    if (mouseIn) {
      // 마우스의 X 좌표(0~size)를 1부터 10 사이의 n 값으로 선형 매핑합니다.
      n = p.map(p.mouseX, 0, size, 1, 10)
      // 마우스의 Y 좌표(0~size)를 1부터 10 사이의 m 값으로 선형 매핑합니다.
      m = p.map(p.mouseY, 0, size, 1, 10)
    } 
    // 마우스가 캔버스 밖에 있을 경우, 자동 애니메이션 모드로 동작합니다.
    else {
      // 사인(sin) 함수를 사용하여 n 값을 0.5부터 5.5 사이에서 부드럽게 왕복시킵니다.
      n = 3 + p.sin(time * 0.7) * 2.5
      // 코사인(cos) 함수를 사용하여 m 값을 2부터 8 사이에서 부드럽게 왕복시킵니다. (n과 주기를 다르게 하여 변화를 줌)
      m = 5 + p.cos(time * 0.53) * 3
    }

    // 픽셀 배열을 직접 조작하기 위해 현재 캔버스의 픽셀 데이터를 메모리에 로드합니다.
    p.loadPixels()
    // 디스플레이의 픽셀 밀도 값을 가져옵니다. (setup에서 1로 고정함)
    const d = p.pixelDensity()
    // 로드된 픽셀 데이터 배열의 참조를 buf 변수에 할당합니다.
    const buf = p.pixels
    // 픽셀 배열에서 한 줄(row)이 차지하는 실제 메모리 너비를 계산합니다.
    const w = p.width * d

    // 세로 방향의 셀 개수만큼 반복문을 실행합니다.
    for (let j = 0; j < rows; j++) {
      // 현재 행의 인덱스를 전체 행 개수로 나누어 y 좌표를 0~1 사이로 정규화합니다.
      const y = j / rows
      // 가로 방향의 셀 개수만큼 반복문을 실행합니다.
      for (let i = 0; i < cols; i++) {
        // 현재 열의 인덱스를 전체 열 개수로 나누어 x 좌표를 0~1 사이로 정규화합니다.
        const x = i / cols
        // 정규화된 x, y 좌표와 현재의 n, m 값을 사용하여 클라드니 함수 값을 계산합니다.
        const v = chladni(x, y, n, m)
        // 계산된 파동 값의 절대값을 취하여 진폭의 크기만을 추출합니다.
        const av = p.abs(v)

        // 진폭(av)이 0에 가까울수록(노드 라인) t는 0에 가까워지고, 진폭이 클수록 t는 1에 수렴하도록 지수 감쇠를 적용합니다.
        const t = 1 - p.exp(-av * 6)

        // t 값이 0에 가까울 때(모래가 모이는 곳)는 액센트 컬러, 1에 가까울 때는 배경색(bgR)이 되도록 보간합니다.
        const r = p.lerp(accentR, bgR, t)
        // Green 채널에 대해서도 동일하게 액센트 컬러와 배경색(bgG) 사이를 보간합니다.
        const g = p.lerp(accentG, bgG, t)
        // Blue 채널에 대해서도 동일하게 액센트 컬러와 배경색(bgB) 사이를 보간합니다.
        const b = p.lerp(accentB, bgB, t)

        // 하나의 셀(CELL x CELL) 영역을 방금 계산한 색상으로 채우기 위해 y축 방향으로 반복합니다.
        for (let dy = 0; dy < CELL; dy++) {
          // 캔버스 상의 실제 픽셀 y 좌표를 계산합니다.
          const py = j * CELL + dy
          // y 좌표가 캔버스 높이를 벗어나면 내부 반복문을 종료합니다.
          if (py >= p.height) break
          // 현재 픽셀 행이 1차원 픽셀 배열에서 시작하는 오프셋을 계산합니다.
          const rowOff = py * w
          // 셀 영역을 채우기 위해 x축 방향으로 반복합니다.
          for (let dx = 0; dx < CELL; dx++) {
            // 캔버스 상의 실제 픽셀 x 좌표를 계산합니다.
            const px = i * CELL + dx
            // x 좌표가 캔버스 너비를 벗어나면 내부 반복문을 종료합니다.
            if (px >= p.width) break
            // 1차원 배열(RGBA 구조)에서 현재 픽셀의 정확한 시작 인덱스를 계산합니다.
            const off = (rowOff + px * d) * 4
            // 계산된 색상의 Red 값을 픽셀 배열에 할당합니다.
            buf[off]     = r
            // 계산된 색상의 Green 값을 픽셀 배열에 할당합니다.
            buf[off + 1] = g
            // 계산된 색상의 Blue 값을 픽셀 배열에 할당합니다.
            buf[off + 2] = b
            // Alpha 값을 255(완전 불투명)로 할당합니다.
            buf[off + 3] = 255
          }
        }
      }
    }
    // 조작이 완료된 픽셀 배열 데이터를 실제 화면에 반영합니다.
    p.updatePixels()

    // HUD 텍스트를 그릴 때 테두리 선을 사용하지 않도록 설정합니다.
    p.noStroke()
    // HUD 텍스트의 색상을 흰색(약간 투명함)으로 설정합니다.
    p.fill(255, 255, 255, 200)
    // 텍스트의 크기를 12 픽셀로 설정합니다.
    p.textSize(12)
    // 텍스트의 정렬 기준을 왼쪽 상단으로 설정합니다.
    p.textAlign(p.LEFT, p.TOP)
    // 현재의 n, m 파라미터 값과 제어 상태(수동/자동)를 화면 좌측 상단에 텍스트로 출력합니다.
    p.text(`n: ${n.toFixed(2)}   m: ${m.toFixed(2)}   ${mouseIn ? 'manual' : 'auto'}`, 10, 10)
    // 조작 방법에 대한 안내 문구를 첫 번째 텍스트 아래에 출력합니다.
    p.text('hover: control n/m · leave: auto-animate', 10, 26)
  }

  // 캔버스 위에서 마우스 클릭 이벤트가 발생했을 때 실행되는 함수입니다.
  p.mousePressed = function () {
    // 마우스 클릭 위치가 캔버스 영역 밖이라면 아무 작업도 하지 않고 함수를 종료합니다.
    if (p.mouseX < 0 || p.mouseX >= size || p.mouseY < 0 || p.mouseY >= size) return
    // 현재 n 값을 가장 가까운 정수로 반올림하여 가장 뚜렷하고 대칭적인 패턴이 나타나게 합니다.
    n = p.round(n)
    // 현재 m 값을 가장 가까운 정수로 반올림합니다.
    m = p.round(m)
    // 정수 상태에서 애니메이션이 멈춰있는 것처럼 보이지 않도록 아주 작은 오프셋을 더해줍니다.
    n += 0.001
    m += 0.001
  }
}