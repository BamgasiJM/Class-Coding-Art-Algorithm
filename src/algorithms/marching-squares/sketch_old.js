export default function marchingSquaresSketch(p, size) {
  let accentRGB = { r: 255, g: 255, b: 255 }
  const GRID_SCALE = 16      // 격자 셀 크기
  const PERLIN_SCALE = 0.2 // 노이즈 주파수

  // Marching Squares 16-case lookup table
  // 코너 비트: TL=1, TR=2, BR=4, BL=8
  // 엣지: 0=top, 1=right, 2=bottom, 3=left
  const TABLE = [
    [],            // 0  : 0000
    [[3,0]],       // 1  : 0001 (TL)
    [[0,1]],       // 2  : 0010 (TR)
    [[3,1]],       // 3  : 0011 (TL,TR)
    [[1,2]],       // 4  : 0100 (BR)
    [[0,1],[2,3]], // 5  : 0101 (TL,BR) — ambiguous
    [[0,2]],       // 6  : 0110 (TR,BR)
    [[3,2]],       // 7  : 0111 (TL,TR,BR)
    [[2,3]],       // 8  : 1000 (BL)
    [[0,2]],       // 9  : 1001 (TL,BL)
    [[0,3],[1,2]], // 10 : 1010 (TR,BL) — ambiguous
    [[1,2]],       // 11 : 1011 (TL,TR,BL)
    [[1,3]],       // 12 : 1100 (BR,BL)
    [[0,1]],       // 13 : 1101 (TL,BR,BL) — 수정됨
    [[3,2]],       // 14 : 1110 (TL,TR,BR) — 수정됨
    []             // 15 : 1111
  ]

  // 스칼라 필드: 3D Perlin noise (시간 축으로 부드럽게 변화)
  function field(x, y, t) {
    return p.noise(x * PERLIN_SCALE, y * PERLIN_SCALE, t * 0.003)
  }

  // 두 스칼라값 사이에서 임계값 0.5가 위치하는 비율(0~1) 반환
  function lerpThresh(a, b) {
    const ISO = 0.5
    if (p.abs(b - a) < 0.0001) return 0.5
    return (ISO - a) / (b - a)
  }

  p.setup = function() {
    p.createCanvas(size, size)

    // accent 색 읽기 및 RGB 변환
    const accentHex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    const ac = p.color(accentHex)
    accentRGB = { r: p.red(ac), g: p.green(ac), b: p.blue(ac) }

    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 60)

    const cols = p.floor(p.width / GRID_SCALE)
    const rows = p.floor(p.height / GRID_SCALE)
    const t = p.frameCount

    p.stroke(accentRGB.r, accentRGB.g, accentRGB.b)
    p.strokeWeight(1.5)

    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const v00 = field(x,     y,     t)
        const v10 = field(x + 1, y,     t)
        const v11 = field(x + 1, y + 1, t)
        const v01 = field(x,     y + 1, t)

        const idx = (v00 > 0.5 ? 1 : 0) |
                    (v10 > 0.5 ? 2 : 0) |
                    (v11 > 0.5 ? 4 : 0) |
                    (v01 > 0.5 ? 8 : 0)

        let segs = TABLE[idx]
        if (segs.length === 0) continue

        // Ambiguous case (5, 10) 해결: 셀 중심값으로 대각선 선택
        if (idx === 5 || idx === 10) {
          const center = field(x + 0.5, y + 0.5, t)
          if (idx === 5) {
            // TL과 BR: 중심이 높으면 한 대각선, 낮으면 다른 대각선
            segs = center > 0.5 ? [[0,1],[2,3]] : [[0,3],[1,2]]
          } else if (idx === 10) {
            // TR과 BL
            segs = center > 0.5 ? [[0,3],[1,2]] : [[0,1],[2,3]]
          }
        }

        const pts = [
          [x + lerpThresh(v00, v10), y],
          [x + 1, y + lerpThresh(v10, v11)],
          [x + 1 - lerpThresh(v11, v01), y + 1],
          [x, y + 1 - lerpThresh(v01, v00)]
        ]

        for (const [a, b] of segs) {
          const x0 = pts[a][0] * GRID_SCALE
          const y0 = pts[a][1] * GRID_SCALE
          const x1 = pts[b][0] * GRID_SCALE
          const y1 = pts[b][1] * GRID_SCALE
          p.line(x0, y0, x1, y1)
        }
      }
    }
  }
}