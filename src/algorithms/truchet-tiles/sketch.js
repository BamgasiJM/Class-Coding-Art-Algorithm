export default function truchetTilesSketch(p, size) {
  let cols, rows
  let scl = 40
  let accentColor
  let time = 0

  p.setup = function() {
    p.createCanvas(size, size)
    cols = p.floor(p.width / scl)
    rows = p.floor(p.height / scl)
    accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16)
    time += 0.002

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * scl
        let y = j * scl
        
        // 노이즈를 이용해 타일의 방향(0, 1, 2, 3)을 결정
        let n = p.noise(i * 0.2, j * 0.2, time)
        let orientation = p.floor(n * 6)
        
        p.stroke(accentColor)
        p.strokeWeight(2)
        p.noFill()
        
        p.push()
        p.translate(x + scl/2, y + scl/2)
        p.rotate(orientation * p.HALF_PI)
        
        // 대각선으로 연결되는 호(arc)를 그려 타일 패턴 생성
        p.arc(-scl/2, -scl/2, scl, scl, 0, p.HALF_PI)
        p.arc(scl/2, scl/2, scl, scl, p.PI, p.PI + p.HALF_PI)
        
        p.pop()
      }
    }
  }
}