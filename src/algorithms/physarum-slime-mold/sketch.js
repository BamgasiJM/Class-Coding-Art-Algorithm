export default function physarumSlimeMoldSketch(p, size, params = {}) {
  // 개별 점균 에이전트 객체들을 저장할 배열
  let molds = [];
  // CSS 변수에서 읽어올 텍스트 형태의 강조 색상 변수
  let accentColor;
  // 픽셀 데이터에 직접 주입할 RGB 분할 객체 초기화
  let accentRGB = { r: 255, g: 255, b: 255 };
  // 디바이스 픽셀 밀도를 제어할 변수
  let d;

  // 파라미터 접근자 객체 (실시간 변경 반영 구조)
  const P = {
    // 생성할 총 에이전트 수 반환
    agentCount: () => params.agentCount ?? 4000,
    // 좌우 센서의 시야 각도 오프셋 반환
    sensorAngle: () => params.sensorAngle ?? 35,
    // 에이전트 위치로부터의 센서 전진 배치 거리 반환
    sensorDist: () => params.sensorDist ?? 10,
    // 페로몬 감지 시 무작위 또는 방향 전환을 할 회전 배율 각도 반환
    turnAngle: () => params.turnAngle ?? 45,
    // 매 프레임 기존 트레일 페로몬을 지워나가는 감쇠 투명도(Alpha) 값 반환
    evaporationRate: () => params.evaporationRate ?? 8,
  };

  // 점균 단일 에이전트를 정의하는 클래스
  class Mold {
    constructor() {
      // 캔버스 크기 범위 내에 임의의 x 좌표 초기화
      this.x = p.random(size);
      // 캔버스 크기 범위 내에 임의의 y 좌표 초기화
      this.y = p.random(size);
      // 에이전트의 충돌/크기 반지름 정의 (픽셀 연산용)
      this.r = 0.5;
      // 0도에서 360도 사이의 임의의 시작 진행 각도 설정
      this.heading = p.random(360);
      // 설정된 각도를 기반으로 x축 이동 속도 벡터 성분 계산
      this.vx = p.cos(this.heading);
      // 설정된 각도를 기반으로 y축 이동 속도 벡터 성분 계산
      this.vy = p.sin(this.heading);
      // 특정 상황에서 이동을 멈추게 할 상태 플래그
      this.stop = false;

      // 우측 페로몬 감지 센서의 실시간 좌표 객체 초기화
      this.rSensorPos = { x: 0, y: 0 };
      // 좌측 페로몬 감지 센서의 실시간 좌표 객체 초기화
      this.lSensorPos = { x: 0, y: 0 };
      // 전방 페로몬 감지 센서의 실시간 좌표 객체 초기화
      this.fSensorPos = { x: 0, y: 0 };
    }

    // 매 프레임 에이전트의 위치 상태 및 조향 각도를 갱신하는 메서드
    update() {
      // 정지 플래그가 활성화된 경우 속도를 0으로 변환
      if (this.stop) {
        this.vx = 0;
        this.vy = 0;
      } else {
        // 현재 조향 각도(heading)를 바탕으로 실시간 이동 벡터 가속도 계산
        this.vx = p.cos(this.heading);
        this.vy = p.sin(this.heading);
      }

      // 캔버스 경계를 넘어설 때 반대편 경계로 순간 이동하도록 토로이드(토러스) 경계 처리 적용
      this.x = (this.x + this.vx + size) % size;
      this.y = (this.y + this.vy + size) % size;

      // 실시간 파라미터 파싱 값으로 센서 거리 및 센서 각도 확보
      const sAngle = P.sensorAngle();
      const sDist = P.sensorDist();
      const tAngle = P.turnAngle();

      // 현재 진행 각도에서 지정된 각도 오프셋을 더해 우측 센서 위치 계산
      this.getSensorPos(this.rSensorPos, this.heading + sAngle, sDist);
      // 현재 진행 각도에서 지정된 각도 오프셋을 빼서 좌측 센서 위치 계산
      this.getSensorPos(this.lSensorPos, this.heading - sAngle, sDist);
      // 현재 진행 방향 직선상에 전방 센서 위치 계산
      this.getSensorPos(this.fSensorPos, this.heading, sDist);

      let index, l, r, f;
      
      // 화면 픽셀 배열에서 우측 센서 좌표에 해당하는 R(레드) 채널 인덱스 추출 연산
      index = 4 * (d * p.floor(this.rSensorPos.y)) * (d * size) + 4 * (d * p.floor(this.rSensorPos.x));
      // 우측 센서 아래의 페로몬 농도 강도(픽셀 R값) 추출
      r = p.pixels[index] || 0;

      // 화면 픽셀 배열에서 좌측 센서 좌표에 해당하는 R(레드) 채널 인덱스 추출 연산
      index = 4 * (d * p.floor(this.lSensorPos.y)) * (d * size) + 4 * (d * p.floor(this.lSensorPos.x));
      // 좌측 센서 아래의 페로몬 농도 강도 추출
      l = p.pixels[index] || 0;

      // 화면 픽셀 배열에서 전방 센서 좌표에 해당하는 R(레드) 채널 인덱스 추출 연산
      index = 4 * (d * p.floor(this.fSensorPos.y)) * (d * size) + 4 * (d * p.floor(this.fSensorPos.x));
      // 전방 센서 아래의 페로몬 농도 강도 추출
      f = p.pixels[index] || 0;

      // 전방 페로몬 수치가 가장 높다면 조향 각도를 유지하며 전진
      if (f > l && f > r) {
        this.heading += 0;
      } 
      // 전방보다 좌우 측면 페로몬 수치가 모두 높다면 동등 확률로 좌측 혹은 우측으로 무작위 회전
      else if (f < l && f < r) {
        if (p.random(1) < 0.5) {
          this.heading += tAngle;
        } else {
          this.heading -= tAngle;
        }
      } 
      // 좌측 페로몬 농도가 우측보다 우세하면 좌측으로 조향 각도 수정
      else if (l > r) {
        this.heading -= tAngle;
      } 
      // 우측 페로몬 농도가 좌측보다 우세하면 우측으로 조향 각도 수정
      else if (r > l) {
        this.heading += tAngle;
      }
    }

    // 에이전트의 현재 위치 좌표 정보를 화면 픽셀 데이터에 직접 주입하여 그리기를 처리하는 메서드
    display() {
      // 실수 형태인 좌표를 정수형 변환 처리
      const px = p.floor(this.x);
      const py = p.floor(this.y);
      // 현재 픽셀 위치의 1차원 배열 인덱스 주소 계산
      const idx = py * size * 4 + px * 4;
      
      // 인덱스가 유효 범위를 벗어나지 않는지 검증한 후 강조 색상 데이터 주입
      if (idx >= 0 && idx + 3 < p.pixels.length) {
        // Red 채널에 강조색 R 성분 매핑
        p.pixels[idx] = accentRGB.r;
        // Green 채널에 강조색 G 성분 매핑
        p.pixels[idx + 1] = accentRGB.g;
        // Blue 채널에 강조색 B 성분 매핑
        p.pixels[idx + 2] = accentRGB.b;
        // Alpha 채널을 최대로 설정하여 불투명 트레일 형성
        p.pixels[idx + 3] = 255;
      }
    }

    // 센서 객체 정보와 탐색 매개변수(각도, 거리)를 받아 절대 센서 좌표를 연산하는 메서드
    getSensorPos(sensor, angle, dist) {
      // 지정된 각도와 거리를 삼각함수로 스케일링 후 경계 랩핑을 포함해 x 좌표 설정
      sensor.x = (this.x + dist * p.cos(angle) + size) % size;
      // 지정된 각도와 거리를 삼각함수로 스케일링 후 경계 랩핑을 포함해 y 좌표 설정
      sensor.y = (this.y + dist * p.sin(angle) + size) % size;
    }
  }

  // p5.js 구조적 환경 초기화 함수
  p.setup = function () {
    // 입력 크기에 맞게 스케치 캔버스 영역 선언
    p.createCanvas(size, size);
    // 삼각함수 가속도 연산을 삼각 공식 기반 육십분법(도 단위)으로 전환 설정
    p.angleMode(p.DEGREES);
    // 고속 픽셀 맵 연산을 위해 레티나 등 고해상도 화면 스케일 비율을 1로 강제 제한 고정
    p.pixelDensity(1);
    // 인덱스 연산 승수 1로 고정화
    d = 1;

    // 도큐먼트 전역 스타일에서 하이라이트 CSS 색상 변수 로드
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    // 가져온 색상 정보를 p5 컬러 데이터 구조체로 포맷 변환
    const ac = p.color(accentColor);
    // 픽셀 주입용 단일 채널 성분 객체로 재생성
    accentRGB = { r: p.red(ac), g: p.green(ac), b: p.blue(ac) };

    // 디버그용 로그 출력
    console.log("Setup complete. Accent color:", accentRGB);

    // 파라미터 구조체에 정의된 에이전트 수만큼 인스턴스 배열 루프 할당 생성
    const count = P.agentCount();
    for (let i = 0; i < count; i++) {
      molds[i] = new Mold();
    }
    // 초기 도화지 상태를 순수 검은색으로 도포
    p.background(0);
  };

  // 실시간 애니메이션 루프 주기 제어 함수
  p.draw = function () {
    // 매 프레임 파라미터의 감쇠 알파율을 동적으로 채택하여 화면 배경을 반투명하게 덮어 잔상 생성
    p.background(0, P.evaporationRate());
    // 고속 처리를 위해 프레임 버퍼의 하드웨어 픽셀 배열 로드 활성화
    p.loadPixels();

    // 인스턴스화된 모든 에이전트를 순회 구동
    for (let i = 0; i < molds.length; i++) {
      // 주변 페로몬 측정 및 위치 상태 벡터 값 연산 갱신
      molds[i].update();
      // 연산 결과를 버퍼 배열에 주입
      molds[i].display();
    }

    // 주입이 완료된 픽셀 버퍼 내용을 실제 화면 장치에 최종 드로우 갱신
    p.updatePixels();
  };
}