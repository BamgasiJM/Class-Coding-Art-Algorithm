export default function flowMapVisualizationSketch(p, size, params = {}) {
  // 3차원 노이즈 공간을 탐색하기 위한 시간(Z축) 오프셋 변수
  let zoff = 0;
  // 문서 루트에서 지정된 강조 색상을 저장할 변수
  let accentColor;
  // 강조 색상의 개별 RGB 값을 분리하여 저장할 데이터 객체
  let accentRGB;

  // 파라미터 실시간 접근자 객체 설정
  const P = {
    // 화면을 나눌 그리드 셀의 픽셀 단위 크기 반환
    resolution: () => params.resolution ?? 24,
    // 노이즈 필드의 줌 인/아웃(조밀도) 비율 반환
    noiseScale: () => params.noiseScale ?? 0.02,
    // 매 프레임 증가시켜 장(Field)을 일렁이게 할 Z축 시간 변위량 반환
    timeSpeed: () => params.timeSpeed ?? 0.005,
    // 그리드 해상도 대비 렌더링될 벡터 선분의 길이 배율 반환
    lineLengthMult: () => params.lineLengthMult ?? 0.8,
    // 흐름의 각도에 동기화되어 변화하는 투명도의 최대 진폭 반환
    alphaPulse: () => params.alphaPulse ?? 200,
  };

  // p5.js 초기화 함수
  p.setup = function() {
    // 지정된 규격으로 스케치 캔버스 생성
    p.createCanvas(size, size);

    // 전역 CSS 변수에서 강조 색상 문자열 파싱
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
      
    // 문자열을 p5 color 객체로 임시 캐스팅
    const c = p.color(accentColor);
    // 알파 연산을 렌더링 루프에서 실시간으로 처리하기 위해 R, G, B 채널 추출 후 보관
    accentRGB = { r: p.red(c), g: p.green(c), b: p.blue(c) };

    // 화면에 그려질 선의 양 끝점 마감 처리를 둥근 곡선형으로 설정
    p.strokeCap(p.ROUND);
  };

  // 매 프레임 화면 갱신 루프 함수
  p.draw = function() {
    // 이전 프레임의 잔상을 완전히 덮어쓰는 어두운 남색조 배경 도포
    p.background(8, 8, 16);
    
    // 파라미터에서 현재 설정된 그리드 해상도 수치 로드
    const res = P.resolution();
    // 파라미터에서 설정된 선 길이 배율 로드
    const lenMult = P.lineLengthMult();
    // 해상도와 배율을 곱해 실제 캔버스에 그릴 선분의 물리적 픽셀 길이 산출
    const lineLen = res * lenMult;
    // 노이즈 매핑 스케일 계수 로드
    const nScale = P.noiseScale();
    
    // 파라미터의 시간 속도만큼 노이즈 공간의 Z축(시간축) 오프셋 누적 진행
    zoff += P.timeSpeed();

    // 캔버스 가로 영역을 그리드 해상도 간격으로 분할하여 순회
    for (let x = res / 2; x < p.width; x += res) {
      // 캔버스 세로 영역을 그리드 해상도 간격으로 분할하여 순회
      for (let y = res / 2; y < p.height; y += res) {
        
        // 현재 x, y 좌표에 스케일 계수를 적용해 3D 펄린 노이즈 연산
        // 도출된 0~1 사이의 값을 0~4π(두 바퀴) 각도로 증폭 매핑
        const angle = p.noise(x * nScale, y * nScale, zoff) * p.TWO_PI * 2;
        
        // 산출된 각도(방향성)를 활용해 -1~1 구간을 반복하는 사인(Sine) 파동 진폭 계산
        const wave = p.sin(angle);
        // 사인 파동 데이터를 파라미터로 지정된 최대 투명도 범위(20~alphaPulse) 내로 선형 매핑
        const alphaVal = p.map(wave, -1, 1, 20, P.alphaPulse());

        // 현재 순회 중인 그리드 셀의 좌표 및 회전 연산이 다른 셀에 간섭하지 않도록 변환 매트릭스 백업
        p.push();
        
        // 렌더링 원점을 현재 그리드 셀의 정중앙 좌표로 이동 변환
        p.translate(x, y);
        // 벡터 필드의 흐름 방향을 가리키도록 해당 각도만큼 공간계 자체를 회전
        p.rotate(angle);
        
        // 분리해 둔 강조 색상의 RGB 값에 동적으로 연산된 알파값(alphaVal) 결합 부여
        p.stroke(accentRGB.r, accentRGB.g, accentRGB.b, alphaVal);
        // 선의 굵기를 현재 셀 해상도 크기의 15% 비율로 동적 설정
        p.strokeWeight(res * 0.15);
        
        // 변경된 원점(0,0)을 기준으로 좌우 대칭인 선분을 수평으로 렌더링 (회전은 이미 적용됨)
        p.line(-lineLen / 2, 0, lineLen / 2, 0);
        
        // 사용이 끝난 셀 전용 공간 변환 매트릭스를 파기하고 원래 상태로 복원
        p.pop();
      }
    }
  };
}