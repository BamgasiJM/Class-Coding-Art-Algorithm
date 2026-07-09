export default function penroseTilingSketch(p, size, params = {}) {
  // 생성된 삼각형들을 저장할 배열 초기화
  let triangles = [];
  // CSS 변수에서 가져올 강조 색상 변수 선언
  let accentColor;
  // 전체 캔버스의 누적 회전 각도 상태 관리
  let totalRotation = 0;

  // 파라미터 접근자 객체 (기본값 설정 포함)
  const P = {
    // 분할 세대 수 (기본 5)
    generations: () => params.generations ?? 5,
    // 초기 도형의 화면 대비 반지름 비율 (기본 0.52)
    initialRadius: () => params.initialRadius ?? 0.52,
    // 펜로즈 타일링의 기반이 되는 황금비 설정
    goldenRatio: () => params.goldenRatio ?? 1.6180339887,
    // 렌더링 시 그려질 외곽선의 두께
    lineWeight: () => params.lineWeight ?? 0.8,
    // 매 프레임마다 더해질 캔버스 전체 회전 속도
    rotationSpeed: () => params.rotationSpeed ?? 0,
  };

  // x, y 좌표를 가진 벡터 객체를 반환하는 헬퍼 함수
  function vec(x, y) {
    return { x, y };
  }

  // 두 벡터 v1과 v2 사이를 t 비율만큼 선형 보간(Linear Interpolation)하는 함수
  function lerpVec(v1, v2, t) {
    return vec(v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t);
  }

  // 타입(thick/thin)과 세 꼭짓점(A, B, C)을 받아 삼각형 객체를 생성하는 함수
  // 마름모 렌더링 규칙을 위해 A는 항상 Apex(중심각 꼭짓점)로 유지되어야 함
  function createTriangle(type, A, B, C) {
    return { type, A, B, C };
  }

  // 현재 세대의 삼각형 배열을 P3 마름모 분할 규칙에 따라 다음 세대로 분할하는 함수
  function subdivide(tris) {
    // 분할된 새로운 삼각형들을 담을 결과 배열 선언
    const result = [];
    // 파라미터에서 현재 설정된 황금비 값을 가져옴
    const PHI = P.goldenRatio(); 
    
    // 전달받은 모든 삼각형에 대해 반복
    for (const tri of tris) {
      // 삼각형의 타입과 세 꼭짓점 추출
      const { type, A, B, C } = tri;
      
      // Thick 마름모의 반쪽(Fat Triangle)인 경우
      if (type === 'thick') {
        // 선분 BC를 1/PHI 비율로 분할하는 점 P_pt 계산
        const P_pt = lerpVec(B, C, 1 / PHI);
        // 선분 BA를 1/PHI 비율로 분할하는 점 Q 계산
        const Q = lerpVec(B, A, 1 / PHI);
        
        // 1개의 새로운 Thick 마름모 반쪽 생성 (Q가 Apex)
        result.push(createTriangle('thick', Q, B, P_pt));
        // 1개의 새로운 Thick 마름모 반쪽 생성 (P_pt가 Apex)
        result.push(createTriangle('thick', P_pt, A, Q));
        // 1개의 새로운 Thin 마름모 반쪽 생성 (A가 Apex)
        result.push(createTriangle('thin', A, C, P_pt));
      } 
      // Thin 마름모의 반쪽(Skinny Triangle)인 경우
      else {
        // 선분 CB를 1/PHI 비율로 분할하는 점 P_pt 계산
        const P_pt = lerpVec(C, B, 1 / PHI);
        
        // 1개의 새로운 Thick 마름모 반쪽 생성 (P_pt가 Apex)
        result.push(createTriangle('thick', P_pt, C, A));
        // 1개의 새로운 Thin 마름모 반쪽 생성 (A가 Apex)
        result.push(createTriangle('thin', A, P_pt, B));
      }
    }
    // 분할이 완료된 새로운 삼각형 배열 반환
    return result;
  }

  // 단일 삼각형을 마름모 형태로 화면에 그리는 함수
  // 내부 대각선(B-C)을 그리지 않음으로써 두 삼각형이 합쳐져 하나의 완벽한 마름모로 렌더링되게 함
  function drawTriangle(tri, thickColor, thinColor, edgeColor) {
    // 삼각형 객체 분해
    const { type, A, B, C } = tri;
    
    // 도형 내부에만 색을 채우기 위해 기본 선 없음 설정
    p.noStroke();
    // 타입에 따라 Thick 색상 또는 Thin 색상 적용
    p.fill(type === 'thick' ? thickColor : thinColor);
    
    // 삼각형 도형 그리기 시작
    p.beginShape();
    p.vertex(A.x, A.y); // 꼭짓점 A 연결
    p.vertex(B.x, B.y); // 꼭짓점 B 연결
    p.vertex(C.x, C.y); // 꼭짓점 C 연결
    p.endShape(p.CLOSE); // 도형 닫기 및 색 채우기 완료

    // 마름모의 외곽선을 표현하기 위해 선 색상 지정
    p.stroke(edgeColor);
    // 선의 굵기 파라미터 적용
    p.strokeWeight(P.lineWeight());
    
    // Apex인 A에서 B로 이어지는 첫 번째 외곽선 렌더링
    p.line(A.x, A.y, B.x, B.y);
    // Apex인 A에서 C로 이어지는 두 번째 외곽선 렌더링
    p.line(A.x, A.y, C.x, C.y);
    // 내부 대각선인 B-C 라인은 그리지 않아 마름모 시각적 결합 완성
  }

  // p5.js 초기화 함수
  p.setup = function() {
    // 지정된 size로 정사각형 캔버스 생성
    p.createCanvas(size, size);
    
    // 문서의 루트 요소에서 CSS 변수 '--accent' 값을 읽어와 여백 제거 후 저장
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();

    // 캔버스의 중심점 X 좌표 계산
    const cx = p.width / 2;
    // 캔버스의 중심점 Y 좌표 계산
    const cy = p.height / 2;
    // 화면 크기에 비례하는 초기 도형의 반지름 한계 길이 계산
    const r = p.min(p.width, p.height) * P.initialRadius();

    // 생성할 삼각형을 담을 배열 초기화
    triangles = [];
    
    // 중앙을 중심으로 5개의 Thick 마름모(10개의 삼각형)를 배치하여 '별(Sun)' 형태 생성
    for (let i = 0; i < 5; i++) {
      // i번째 마름모의 시작 각도 (72도 간격, -90도 오프셋으로 12시 방향부터 시작)
      const a1 = (i * 72 - 90) * (p.PI / 180);
      // 다음 마름모와 이어지는 경계 각도
      const a2 = ((i + 1) * 72 - 90) * (p.PI / 180);
      
      // 중심에서 a1 각도 방향으로 r 길이만큼 떨어진 꼭짓점 V1 계산
      const V1 = vec(cx + r * p.cos(a1), cy + r * p.sin(a1));
      // 중심에서 a2 각도 방향으로 r 길이만큼 떨어진 꼭짓점 V3 계산
      const V3 = vec(cx + r * p.cos(a2), cy + r * p.sin(a2));
      // V1과 V3의 벡터 합을 통해 생성되는 평행사변형(마름모)의 외부 바깥 꼭짓점 V2 계산
      const V2 = vec(V1.x + V3.x - cx, V1.y + V3.y - cy);
      
      // 마름모의 왼쪽 반절: 중심(cx, cy)과 V1, V2를 잇는 첫 번째 Thick 반쪽 삼각형 추가
      triangles.push(createTriangle('thick', V1, vec(cx, cy), V2));
      // 마름모의 오른쪽 반절: 중심(cx, cy)과 V3, V2를 잇는 두 번째 Thick 반쪽 삼각형 추가
      triangles.push(createTriangle('thick', V3, V2, vec(cx, cy)));
    }

    // 파라미터로 설정된 세대 수만큼 반복
    const gens = P.generations();
    for (let g = 0; g < gens; g++) {
      // 현재 세대의 삼각형들을 하위 세대로 분할하여 교체
      triangles = subdivide(triangles);
    }

    // 초기 배경색 설정 (어두운 푸른 회색조)
    p.background(8, 8, 16);
  };

  // 매 프레임마다 화면을 렌더링하는 draw 주기 함수
  p.draw = function() {
    // 이전 프레임의 잔상을 지우기 위해 배경색 다시 칠하기
    p.background(8, 8, 16);

    // 파라미터에서 회전 속도를 읽어 누적 회전값에 더함
    totalRotation += P.rotationSpeed();

    // 마름모 외곽선(Edge)의 색상 지정 (어두운 배경색과 동일한 대비용 색)
    const edgeCol = p.color(8, 8, 16);
    // Thick 마름모의 색상 (CSS에서 가져온 강조색 적용)
    const thickCol = p.color(accentColor);
    // Thin 마름모의 색상 (지정된 어두운 푸른 계열 고정값)
    const thinCol = p.color(50, 55, 80);

    // 현재 캔버스의 좌표계 및 변환 상태 저장
    p.push();
    // 회전 중심을 캔버스 중앙으로 이동
    p.translate(p.width / 2, p.height / 2);
    // 누적된 각도만큼 캔버스 전체 회전 적용
    p.rotate(totalRotation);
    // 회전 후 원래 그리기 기준점(0,0)으로 복귀
    p.translate(-p.width / 2, -p.height / 2);

    // 배열에 저장된 모든 최종 세대 삼각형(마름모 반쪽) 렌더링
    for (const tri of triangles) {
      // 마름모 외곽선 렌더링 규칙이 포함된 개별 삼각형 그리기 함수 호출
      drawTriangle(tri, thickCol, thinCol, edgeCol);
    }

    // 저장했던 변환 상태 복구하여 다음 프레임 대기
    p.pop();
  };
}