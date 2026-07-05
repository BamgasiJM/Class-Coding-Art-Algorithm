export default function ditheringSketch(p, size) {
  // Bayer 8x8 행렬 (값은 0~63, 나중에 64로 나눠 임계값으로 사용)
  const BAYER8 = [
    [ 0, 32,  8, 40,  2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44,  4, 36, 14, 46,  6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [ 3, 35, 11, 43,  1, 33,  9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47,  7, 39, 13, 45,  5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ]

  const CELL = 2              // 한 디더 유닛이 차지하는 픽셀 (2x2)
  let cols, rows
  let brightness              // Float32Array: 원본 밝기 (0~1)
  let fsBuffer                // Float32Array: Floyd-Steinberg용 오류 누적 버퍼
  let accentR, accentG, accentB
  let mode = 'bayer'          // 'bayer' | 'fs'
  let bayerScale = 8          // Bayer 셀 반복 주기 (마우스 X로 조절)
  let thresholdBias = 0.5     // 이진화 기준점 (마우스 Y로 조절)
  let fsCursor = 0            // FS가 현재 처리 중인 행
  let fsNeedsReset = true
  let srcImg = null           // 로드한 원본 이미지

  p.setup = function () {
    p.createCanvas(size, size)
    p.pixelDensity(1)
    p.noSmooth()

    cols = p.floor(size / CELL)
    rows = p.floor(size / CELL)

    // accent 색 파싱
    const hex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    const tmp = p.color(hex)
    accentR = p.red(tmp)
    accentG = p.green(tmp)
    accentB = p.blue(tmp)

    // 이미지 로드가 끝날 때까지는 빈(0) 밝기 맵으로 표시
    brightness = new Float32Array(cols * rows)
    p.background(8, 8, 16)

    // p5 2.0: preload() 제거됨 → setup()에서 콜백으로 로드
    p.loadImage('/img/image_2.jpg', (img) => {
      srcImg = img
      buildBrightnessMap()
      fsNeedsReset = true
    })
  }

  // 로드한 이미지로부터 밝기 맵 생성
  // - 이미지를 cols x rows로 리사이즈한 뒤 픽셀별 luminance 계산
  // - luminance = 0.299*R + 0.587*G + 0.114*B (ITU-R BT.601)
  function buildBrightnessMap() {
    brightness = new Float32Array(cols * rows)
    if (!srcImg) return

    // 이미지를 샘플링 크기로 리사이즈 (한 번만)
    const sample = srcImg.get()
    sample.resize(cols, rows)
    sample.loadPixels()

    const px = sample.pixels
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const idx = (j * cols + i) * 4
        const r = px[idx]
        const g = px[idx + 1]
        const b = px[idx + 2]
        // luminance → 0~1 정규화
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        brightness[j * cols + i] = lum
      }
    }
  }

  // Bayer ordered dithering: 각 셀의 밝기와 행렬 임계값을 비교해 2색으로
  function renderBayer() {
    p.loadPixels()
    const d = p.pixelDensity()
    const buf = p.pixels
    const w = p.width * d
    const S = bayerScale

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const src = brightness[j * cols + i]
        // Bayer 행렬 값 (0~63) → 0~1 임계값으로 정규화 + bias
        const bx = i % S
        const by = j % S
        const thr = (BAYER8[by][bx] + 0.5) / 64.0
        // 밝기가 임계값보다 크면 accent, 아니면 배경
        const on = src > (thr * 0.9 + thresholdBias * 0.1)
        const r = on ? accentR : 8
        const g = on ? accentG : 8
        const b = on ? accentB : 16

        // CELL x CELL 블록 채우기
        for (let dy = 0; dy < CELL; dy++) {
          const py = j * CELL + dy
          if (py >= p.height) break
          const rowOff = py * w
          for (let dx = 0; dx < CELL; dx++) {
            const px = i * CELL + dx
            if (px >= p.width) break
            const off = (rowOff + px * d) * 4
            buf[off]     = r
            buf[off + 1] = g
            buf[off + 2] = b
            buf[off + 3] = 255
          }
        }
      }
    }
    p.updatePixels()
  }

  // Floyd-Steinberg error diffusion
  function initFSBuffer() {
    fsBuffer = new Float32Array(cols * rows)
    for (let k = 0; k < fsBuffer.length; k++) fsBuffer[k] = brightness[k]
    fsCursor = 0
    fsNeedsReset = false
  }

  function stepFS() {
    if (fsNeedsReset || !fsBuffer) initFSBuffer()
    if (fsCursor >= rows) {
      fsNeedsReset = true
      return
    }

    const j = fsCursor
    for (let i = 0; i < cols; i++) {
      const idx = j * cols + i
      const old = p.constrain(fsBuffer[idx], 0, 1)
      const newVal = old >= thresholdBias ? 1 : 0
      const err = old - newVal

      drawCell(i, j, newVal === 1)

      // 오류 확산 (Floyd-Steinberg 계수: 7/16, 3/16, 5/16, 1/16)
      if (i + 1 < cols)               fsBuffer[idx + 1]         += err * 7 / 16
      if (j + 1 < rows) {
        if (i > 0)                    fsBuffer[idx + cols - 1]  += err * 3 / 16
                                      fsBuffer[idx + cols]      += err * 5 / 16
        if (i + 1 < cols)             fsBuffer[idx + cols + 1]  += err * 1 / 16
      }
    }
    fsCursor++
  }

  function drawCell(i, j, on) {
    const r = on ? accentR : 8
    const g = on ? accentG : 8
    const b = on ? accentB : 16
    // 주의: p.pixels는 draw()에서 프레임당 한 번만 load/update 해야 함
    // (셀마다 loadPixels()를 호출하면 getImageData가 반복되어 매우 느려지고,
    //  아직 updatePixels 되지 않은 이전 셀의 변경 내용도 덮어써진다)
    const d = p.pixelDensity()
    const buf = p.pixels
    const w = p.width * d
    for (let dy = 0; dy < CELL; dy++) {
      const py = j * CELL + dy
      if (py >= p.height) break
      const rowOff = py * w
      for (let dx = 0; dx < CELL; dx++) {
        const px = i * CELL + dx
        if (px >= p.width) break
        const off = (rowOff + px * d) * 4
        buf[off]     = r
        buf[off + 1] = g
        buf[off + 2] = b
        buf[off + 3] = 255
      }
    }
  }

  p.draw = function () {
    // 마우스 위치로 파라미터 조절
    if (p.mouseX >= 0 && p.mouseX < size && p.mouseY >= 0 && p.mouseY < size) {
      // BAYER8은 8x8 행렬이므로 bayerScale은 반드시 8 이하여야 함
      // (초과하면 BAYER8[by][bx]가 배열 범위를 벗어나 undefined 참조 에러로 draw()가 멈춘다)
      bayerScale = p.floor(p.map(p.mouseX, 0, size, 2, 8))
      bayerScale = p.constrain(bayerScale, 2, 8)
      thresholdBias = p.map(p.mouseY, 0, size, 0.2, 0.8)
    }

    if (mode === 'bayer') {
      renderBayer()
    } else {
      p.loadPixels()
      const linesPerFrame = 6
      for (let k = 0; k < linesPerFrame; k++) stepFS()
      p.updatePixels()
    }

    // HUD: 현재 모드 + 파라미터
    p.noStroke()
    p.fill(255, 255, 255, 180)
    p.textSize(12)
    p.textAlign(p.LEFT, p.TOP)
    p.text(`mode: ${mode.toUpperCase()}   scale: ${bayerScale}   bias: ${thresholdBias.toFixed(2)}`, 10, 10)
    p.text('drag: scale/bias · click: toggle mode', 10, 26)
  }

  // 클릭으로 모드 전환 + FS 리셋
  p.mousePressed = function () {
    if (p.mouseX < 0 || p.mouseX >= size || p.mouseY < 0 || p.mouseY >= size) return
    if (mode === 'bayer') {
      mode = 'fs'
      fsNeedsReset = true
    } else {
      mode = 'bayer'
    }
  }
}