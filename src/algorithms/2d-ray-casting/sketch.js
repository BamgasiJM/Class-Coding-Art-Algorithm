export default function rayCastingSketch(p, size) {
  let walls = []
  let accentR, accentG, accentB
  let light = { x: size / 2, y: size / 2 }
  let time = 0
  const NUM_RAYS = 180
  let mouseActive = false

  p.setup = function () {
    p.createCanvas(size, size)

    const hex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()
    const tmp = p.color(hex)
    accentR = p.red(tmp)
    accentG = p.green(tmp)
    accentB = p.blue(tmp)

    buildWalls()
    p.background(8, 8, 16)
  }

  // 중앙 사각형 기둥 하나만
  function buildWalls() {
    walls = []
    const cs = size * 0.08
    const cx = size / 2
    const cy = size / 2
    walls.push({ a: { x: cx - cs, y: cy - cs }, b: { x: cx + cs, y: cy - cs } })
    walls.push({ a: { x: cx + cs, y: cy - cs }, b: { x: cx + cs, y: cy + cs } })
    walls.push({ a: { x: cx + cs, y: cy + cs }, b: { x: cx - cs, y: cy + cs } })
    walls.push({ a: { x: cx - cs, y: cy + cs }, b: { x: cx - cs, y: cy - cs } })
  }

  function intersect(a1, a2, b1, b2) {
    const denom = (b1.x - b2.x) * (a1.y - a2.y) - (b1.y - b2.y) * (a1.x - a2.x)
    if (p.abs(denom) < 1e-9) return null
    const t = ((b1.x - b2.x) * (a1.y - b1.y) - (b1.y - b2.y) * (a1.x - b1.x)) / denom
    // 벽(b1→b2) 위의 위치를 나타내는 파라미터 (부호 수정: 이전엔 반대 부호라 유효 구간 밖을 통과시킴)
    const u = ((a1.x - a2.x) * (a1.y - b1.y) - (a1.y - a2.y) * (a1.x - b1.x)) / denom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return { x: a1.x + t * (a2.x - a1.x), y: a1.y + t * (a2.y - a1.y), t }
    }
    return null
  }

  function castRay(origin, angle) {
    const farX = origin.x + p.cos(angle) * size * 2
    const farY = origin.y + p.sin(angle) * size * 2
    const far = { x: farX, y: farY }

    let closest = null
    let minT = Infinity
    for (const w of walls) {
      const hit = intersect(origin, far, w.a, w.b)
      if (hit && hit.t < minT) {
        minT = hit.t
        closest = hit
      }
    }
    return closest || { x: farX, y: farY, t: Infinity }
  }

  function collectCriticalAngles() {
    const angles = []
    for (const w of walls) {
      for (const pt of [w.a, w.b]) {
        const base = p.atan2(pt.y - light.y, pt.x - light.x)
        angles.push(base - 0.001) // 오프셋을 약간 키움
        angles.push(base)
        angles.push(base + 0.001)
      }
    }
    return angles
  }

  function updateLightAuto() {
    const rx = size * 0.32
    const ry = size * 0.32
    light.x = size / 2 + p.sin(time * 0.6) * rx
    light.y = size / 2 + p.sin(time * 0.9 + 1.3) * ry
  }

  p.draw = function () {
    time += 0.008

    const mouseIn =
      p.mouseX > 0 && p.mouseX < size &&
      p.mouseY > 0 && p.mouseY < size
    if (mouseIn) {
      light.x = p.mouseX
      light.y = p.mouseY
      mouseActive = true
    } else if (mouseActive) {
      mouseActive = false
    }
    if (!mouseActive) updateLightAuto()

    p.background(8, 8, 16)

    const critical = collectCriticalAngles()
    const rays = []
    for (let i = 0; i < NUM_RAYS; i++) {
      const a = p.map(i, 0, NUM_RAYS, 0, p.TWO_PI)
      rays.push(castRay(light, a))
    }
    for (const a of critical) {
      rays.push(castRay(light, a))
    }

    rays.sort((p1, p2) => {
      const a1 = p.atan2(p1.y - light.y, p1.x - light.x)
      const a2 = p.atan2(p2.y - light.y, p2.x - light.x)
      return a1 - a2
    })

    // visibility polygon: 실제 도형 그대로 한 번만 채우고,
    // 캔버스 shadowBlur로 가장자리에 부드러운 광원 확산을 준다
    const ctx = p.drawingContext
    p.noStroke()
    ctx.shadowColor = `rgba(${accentR}, ${accentG}, ${accentB}, 0.9)`
    ctx.shadowBlur = size * 0.06
    p.fill(accentR, accentG, accentB, 90)
    drawPolygon(rays, 1.0)
    ctx.shadowBlur = 0

    // ⭐ 핵심 수정: 기둥을 배경색으로 채워서 polygon을 가림
    p.fill(8, 8, 16)
    p.stroke(230, 230, 240, 220)
    p.strokeWeight(1.2)
    p.beginShape()
    for (const w of walls) {
      p.vertex(w.a.x, w.a.y)
    }
    p.vertex(walls[0].a.x, walls[0].a.y)
    p.endShape(p.CLOSE)

    // 광원
    p.noStroke()
    p.fill(255, 255, 255, 230)
    p.circle(light.x, light.y, 7)
    p.fill(accentR, accentG, accentB)
    p.circle(light.x, light.y, 3)
  }

  function drawPolygon(rays, scale) {
    p.beginShape()
    p.vertex(light.x, light.y)
    for (const pt of rays) {
      const x = light.x + (pt.x - light.x) * scale
      const y = light.y + (pt.y - light.y) * scale
      p.vertex(x, y)
    }
    const first = rays[0]
    p.vertex(
      light.x + (first.x - light.x) * scale,
      light.y + (first.y - light.y) * scale
    )
    p.endShape(p.CLOSE)
  }

  p.mousePressed = function () {
    if (
      p.mouseX >= 0 && p.mouseX < size &&
      p.mouseY >= 0 && p.mouseY < size
    ) {
      const newCs = p.random(size * 0.04, size * 0.14)
      const cx = size / 2
      const cy = size / 2
      walls[0] = { a: { x: cx - newCs, y: cy - newCs }, b: { x: cx + newCs, y: cy - newCs } }
      walls[1] = { a: { x: cx + newCs, y: cy - newCs }, b: { x: cx + newCs, y: cy + newCs } }
      walls[2] = { a: { x: cx + newCs, y: cy + newCs }, b: { x: cx - newCs, y: cy + newCs } }
      walls[3] = { a: { x: cx - newCs, y: cy + newCs }, b: { x: cx - newCs, y: cy - newCs } }
    }
  }
}