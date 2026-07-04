import sketch from "./sketch";

export default {
  longDescription: {
    en: "Curl Noise is an algorithmic technique that generates divergence-free, incompressible fluid-like velocity fields by taking the curl of a scalar potential field (typically Perlin or Simplex noise). Because the divergence is mathematically zero, particles flowing through this field naturally warp and navigate around virtual obstacles without clumping together. This implementation derives velocity vectors using numerical differentiation, resulting in elegant, turbulent, and non-intersecting pathways.",
    ko: "Curl Noise는 스칼라 잠재 필드(일반적으로 Perlin 또는 Simplex 노이즈)의 컬(Curl) 연산을 통해 발산이 없고(Divergence-free) 압축되지 않는 유체 역학적 속도 필드를 생성하는 기법입니다. 수학적으로 발산이 0이기 때문에, 이 필드를 흐르는 파티클들은 서로 뭉치지 않고 가상의 장애물을 휘감아 도는 듯한 자연스러운 유동을 보여줍니다. 본 구현체는 수치 미분을 통해 회전 벡터를 유도하여, 엉키지 않고 우아하게 소용돌이치는 터뷸런스 경로를 시각화합니다.",
  },
  sketch,
  related: ["Perlin / Simplex Noise", "Flow Field", "Fractal Brownian Motion"],
};
