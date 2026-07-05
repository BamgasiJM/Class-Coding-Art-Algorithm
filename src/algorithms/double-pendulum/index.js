import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Double Pendulum은 두 개의 진자가 연결된 시스템으로, 라그랑주 역학으로부터 유도된 비선형 연립 미분방정식으로 기술됩니다. 초기 각도의 아주 미세한 차이(0.001 rad 수준)도 시간이 지남에 따라 기하급수적으로 증폭되어 완전히 다른 궤적으로 발산하는데, 이는 결정론적 카오스(deterministic chaos)의 대표적인 예입니다. 끝점의 궤적은 절대로 반복되지 않는 복잡한 패턴을 그리며, 나비효과를 시각적으로 잘 보여줍니다.",
    en: "Double Pendulum is a system of two connected pendulums described by non-linear coupled differential equations derived from Lagrangian mechanics. Tiny differences in initial angles (around 0.001 rad) amplify exponentially over time, diverging into completely different trajectories — a classic example of deterministic chaos. The trajectory of the endpoint traces a complex, never-repeating pattern that beautifully illustrates the butterfly effect.",
  },
  sketch,
  related: ["N-Body Gravity", "Spring & Constraint", "Attractor System"],
};
