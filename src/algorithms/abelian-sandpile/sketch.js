export default function abelianSandpileSketch(p, size, params = {}) {
  // 그리드의 열(가로)과 행(세로) 개수를 담을 변수
  let cols, rows;
  // 각 셀의 모래 알갱이 수를 저장할 1차원 데이터 배열 명시
  let grid;
  // 루트 도큐먼트에서 읽어올 강조 색상 스트링
  let accentColor;
  // 강조 색상의 Red 성분 변수
  let accentR;
  // 강조 색상의 Green 성분 변수
  let accentG;
  // 강조 색상의 Blue 성분 변수
  let accentB;
  // 비동기적인 파라미터 셋업 및 초기화 완료 상태를 체크할 플래그
  let initialized = false;
  // 모래 알갱이 수(0~4+)에 매핑될 색상 배열들을 저장할 파레트
  let palette = [];

  // 전역 파라미터 제어를 위한 실시간 접근자 인터페이스 객체 정의
  const P = {
    // 그리드를 구성할 정사각형 셀 한 변의 픽셀 크기 반환
    cellSize: () => params.cellSize ?? 6,
    // 초기 구동 시 그리드 정중앙에 쌓아둘 모래의 누적 총수량 반환
    initialGrains: () => params.initialGrains ?? 15000,
    // 화면 갱신 프레임당 토플링 연산 회프(반복 횟수) 스케일 반환
    iterationsPerFrame: () => params.iterationsPerFrame ?? 2,
    // 마우스 누름 인터랙션 발생 시 해당 좌표에 투하할 모래 알갱이 양 반환
    clickGrains: () => params.clickGrains ?? 10000,
  };

  // p5.js 초기 환경 셋업 함수
  p.setup = function () {
    // 입력받은 정형 규격 사이즈에 맞추어 스케치 캔버스 영역 선언
    p.createCanvas(size, size);
    // 버퍼 픽셀 맵 고속 쓰기를 위해 하드웨어 픽셀 스케일 비율을 1로 제한 설정
    p.pixelDensity(1);

    // 파라미터 변수로 획득한 셀 크기를 기반으로 가로 영역의 총 열 개수 정수형 계산
    cols = p.floor(size / P.cellSize());
    // 파라미터 변수로 획득한 셀 크기를 기반으로 세로 영역의 총 행 개수 정수형 계산
    rows = p.floor(size / P.cellSize());

    // 도큐먼트 전역 테마 스타일에서 시스템 하이라이트 CSS 색상 변수 파싱 로드
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
    
    // 가져온 문자열 형식을 p5 내부 컬러 데이터 구조체로 임시 포맷 변경
    const tmp = p.color(accentColor);
    // 픽셀 인덱스 직접 주입용 Red 단일 채널 수치 추출
    accentR = p.red(tmp);
    // 픽셀 인덱스 직접 주입용 Green 단일 채널 수치 추출
    accentG = p.green(tmp);
    // 픽셀 인덱스 직접 주입용 Blue 단일 채널 수치 추출
    accentB = p.blue(tmp);

    // 알갱이 적재 밀도(안정 상태 0~3 및 임계치 붕괴 상태 4+)에 따른 기하학적 파레트 정의
    palette = [
      [8, 8, 16],                                                                  // 0개: 빈 공간 배경색
      [p.floor(accentR * 0.25), p.floor(accentG * 0.25), p.floor(accentB * 0.35)], // 1개 적재 상태 색상
      [p.floor(accentR * 0.60), p.floor(accentG * 0.60), p.floor(accentB * 0.70)], // 2개 적재 상태 색상
      [accentR, accentG, accentB],                                                 // 3개: 붕괴 직전의 최대 임계치 상태 색상
      [255, 255, 255],                                                             // 4개 이상: 현재 토플링 연쇄가 진행 중인 역동적 활성 구역 색상
    ];

    // 모래 더미 격자 데이터를 구조적으로 배치하기 위해 전용 초기화 함수 실행
    resetGrid();
    // 초기화 과정이 정상 완료되었으므로 드로우 루프 허용 플래그 전환
    initialized = true;
    // 캔버스 도화지의 배경을 짙은 푸른 회색조로 채움
    p.background(8, 8, 16);
  };

  // 격자 내부 메모리를 청소하고 정중앙에 모래를 배치하는 초기화 헬퍼 함수
  function resetGrid() {
    // 수만 개 단위의 누적 연산 시 메모리 오버플로우를 억제하기 위해 부호 있는 32비트 정수형 형식 배열 선언
    grid = new Int32Array(cols * rows);

    // 가로 열의 정중앙 인덱스 주소 좌표 계산
    const cx = p.floor(cols / 2);
    // 세로 행의 정중앙 인덱스 주소 좌표 계산
    const cy = p.floor(rows / 2);
    // 2차원 평면 좌표를 1차원 데이터 배열 주소값으로 맵핑 전환
    const idx = cy * cols + cx;
    
    // 대칭 프랙탈 패턴 소스를 유도하기 위해 설정된 파라미터 양만큼 중앙 격자에 대량 모래 주입
    grid[idx] = P.initialGrains(); 
  }

  // 매 프레임 내부 연산 및 화면 렌더링을 갱신하는 주기 구동 함수
  p.draw = function () {
    // 전역 배열 및 타겟 셋업이 완료되지 않았다면 드로우 연산 우회 처리
    if (!initialized) return;

    // 실시간 파라미터 구조체로부터 프레임당 시뮬레이션할 반복 속도 수치 로드
    const speed = P.iterationsPerFrame(); 
    
    // 비주기적 대칭 물리 연산을 보장하기 위해 한 프레임 내에서 지정된 루프 횟수만큼 토플링 연쇄 처리
    for (let iter = 0; iter < speed; iter++) {
      // 가로 행 루프 순회
      for (let j = 0; j < rows; j++) {
        // 세로 열 루프 순회
        for (let i = 0; i < cols; i++) {
          // 탐색 중인 현재 격자의 1차원 인덱스 주소 획득
          const idx = j * cols + i;
          // 해당 격자 주소에 적재된 현재 모래 양 확인
          const v = grid[idx];
          
          // 임계 상전이 기준치인 4개 이상의 모래 알갱이가 모였을 경우 토플링 수행
          if (v >= 4) {
            // 수학적 아벨 성질(Abelian Property) 보존을 위해 현재 쌓인 양을 사분할한 붕괴 단위 계산
            const drops = p.floor(v / 4); 
            // 사방으로 분산되어 유실되는 총량을 현재 셀 데이터에서 차감 처리
            grid[idx] -= drops * 4;
            
            // 좌측 경계를 벗어나지 않는 오픈 바운더리 조건하에서 좌측 인접 셀에 분산 알갱이 가산
            if (i > 0)        grid[idx - 1] += drops;
            // 우측 경계를 벗어나지 않는 오픈 바운더리 조건하에서 우측 인접 셀에 분산 알갱이 가산
            if (i < cols - 1) grid[idx + 1] += drops;
            // 상단 경계를 벗어나지 않는 오픈 바운더리 조건하에서 상단 인접 셀에 분산 알갱이 가산
            if (j > 0)        grid[idx - cols] += drops;
            // 하단 경계를 벗어나지 않는 오픈 바운더리 조건하에서 하단 인접 셀에 분산 알갱이 가산
            if (j < rows - 1) grid[idx + cols] += drops;
          }
        }
      }
    }

    // 픽셀 다이렉트 버퍼 연산을 위해 프레임 버퍼 내부의 로우(Raw) 픽셀 배열 상태 호출
    p.loadPixels();
    // 디바이스의 고유 픽셀 밀도 변수 로드
    const d = p.pixelDensity();
    // 가속 제어를 위한 포인터 참조 변수 할당
    const buf = p.pixels;
    // 고해상도 처리를 위한 스케일링된 전역 너비 바운더리 값 계산
    const w = p.width * d;
    // 실시간 변경이 가능한 셀의 크기를 로컬 상수로 고정 적용
    const currentCellSize = P.cellSize();

    // 완성된 수치 시뮬레이션 격자 데이터를 순회하며 버퍼 배열에 다이렉트 매핑 색칠 가동
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        // 탐색 타겟 셀의 현재 최종 적재 잔여량 확인
        const v = grid[j * cols + i];
        
        // 데이터 양에 따라 색상 파레트에 매칭할 인덱스 스위칭 연산
        let palIdx = v;
        // 음수형 데이터 방지 0 최소값 보정
        if (v <= 0) palIdx = 0;
        // 임계값 초과 상태는 모두 활성 붕괴 상태 파레트 번호(4번)로 강제 병합 고정
        else if (v >= 4) palIdx = 4;

        // 최종 선별된 파레트의 RGB 배열 요소를 로컬 변수에 보관
        const c = palette[palIdx];

        // 셀 크기(cellSize)만큼의 면적을 정사각형 형태로 채우기 위한 2차원 고속 픽셀 도포 맵 가동
        for (let dy = 0; dy < currentCellSize; dy++) {
          // 현재 행 좌표에 픽셀 오프셋 높이 가산
          const py = j * currentCellSize + dy;
          // 화면의 최대 물리 세로 높이를 초과하여 연산 주소가 깨지는 현상 방지 예외 처리
          if (py >= p.height) break;
          // 1차원 화면 배열 상의 가로축 행 시작 위치 라인 오프셋 주소 계산
          const rowOff = py * w;
          for (let dx = 0; dx < currentCellSize; dx++) {
            // 현재 열 좌표에 픽셀 오프셋 너비 가산
            const px = i * currentCellSize + dx;
            // 화면의 최대 물리 가로 너비를 초과하여 연산 주소가 깨지는 현상 방지 예외 처리
            if (px >= p.width) break;
            // RGBA 채널 구조체(4바이트 단위)에 정합하는 최종 1차원 메모리 주소 인덱스 연산
            const off = (rowOff + px * d) * 4;
            // 버퍼 Red 채널 주입
            buf[off]     = c[0];
            // 버퍼 Green 채널 주입
            buf[off + 1] = c[1];
            // 버퍼 Blue 채널 주입
            buf[off + 2] = c[2];
            // 투명도 수치 최대 채움 고정
            buf[off + 3] = 255;
          }
        }
      }
    }
    // 내부 버퍼 메모리에 고속 기입된 최종 데이터 스트림을 그래픽 장치 화면으로 전송 출력
    p.updatePixels();
  };

  // 사용자의 마우스 클릭 다운 액션을 감지하는 p5 인터랙션 함수
  p.mousePressed = function () {
    // 클릭된 마우스의 포인터 좌표가 스케치 캔버스 유효 가동 범위 안인지 경계 안전성 검사
    if (p.mouseX < 0 || p.mouseX >= p.width || p.mouseY < 0 || p.mouseY >= p.height) return;
    // 현재 클릭된 하드웨어 마우스 X 좌표를 셀 스케일 단위의 열 인덱스로 역산 변환
    const ci = p.floor(p.mouseX / P.cellSize());
    // 현재 클릭된 하드웨어 마우스 Y 좌표를 셀 스케일 단위의 행 인덱스로 역산 변환
    const cj = p.floor(p.mouseY / P.cellSize());
    // 격자 데이터 처리를 위한 1차원 배열의 정수형 맵 인덱스 타겟 산출
    const idx = cj * cols + ci;
    // 파라미터 구조체에서 정의된 마우스 드롭 분량만큼 선택 격자 배열에 모래 강제 수혈 가산
    grid[idx] += P.clickGrains(); 
  };
}