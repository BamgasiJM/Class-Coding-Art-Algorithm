**Double Pendulum**(이중 진자)는 **진자의 끝에 또 다른 진자를 매단** 장치입니다. 움직임을 계산하기 어려울 만큼 복잡하지만, 규칙은 중력뿐입니다. 가장 큰 특징은 **카오스**입니다. 출발할 때 각도가 아주 조금만 달라도 시간이 지나면 전혀 다른 궤적을 그립니다.

### 1. 핵심 원리

이중 진자의 상태는 두 각도 $\theta_1$, $\theta_2$와 두 각속도 $\omega_1$, $\omega_2$로 나타냅니다. 각도는 수직 방향에서 얼마나 기울었는지를, 각속도는 그 각도가 얼마나 빨리 변하는지를 뜻합니다.

**(1) 가속도 계산**: 두 진자의 질량, 길이, 중력, 각도를 넣으면 각속도가 얼마나 변할지 구하는 식이 나옵니다. 식이 길어서 이 예제에서는 식을 그대로 옮겨서 계산합니다.

**(2) 시간 한 칸 나아가기**: 계산한 가속도로 각속도를 바꾸고, 바뀐 각속도로 각도를 바꿉니다.

$$\omega \leftarrow \omega + \alpha \,\Delta t, \qquad \theta \leftarrow \theta + \omega \,\Delta t$$

- $\alpha$는 가속도, $\Delta t$는 **시간 간격**입니다.

**(3) 카오스**: 진자를 여러 개 두고 시작 각도를 아주 조금만 다르게 주면, 처음에는 거의 같게 움직이다가 점점 완전히 다른 모양이 됩니다. 이것이 초기 조건에 민감하다는 뜻입니다.

이 예제는 보기 좋은 움직임을 위해 시간 간격을 크게 잡았습니다. 그래서 실제 물리와 조금 다르게 움직일 수 있습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 진자들을 같은 각도에서 출발시킵니다. 진자마다 시작 각도를 아주 조금씩 다르게 줍니다.
2. 매 프레임 각 진자의 가속도를 계산하고, 각속도와 각도를 한 칸씩 나아가게 합니다.
3. 두 번째 추의 위치를 계산해서 궤적을 기록합니다.
4. 첫 번째 진자의 막대와 추를 그리고, 모든 진자의 궤적을 색을 달리해서 그립니다.

### 3. 이 알고리즘의 장점

- **단순한 장치**가 매우 복잡한 움직임을 만든다는 것을 직접 볼 수 있습니다.
- **카오스**의 대표 예로, 예측이 어려운 시스템의 성질을 이해하기 좋습니다.
- 각도와 각속도를 시간에 따라 계산하는 방법을 배울 수 있습니다.

### 4. 구현할 때 주의할 점

- 시간 간격이 너무 크면 계산이 불안정해져서 움직임이 실제와 많이 달라집니다. 반대로 너무 작으면 같은 시간을 보는 데 더 많은 계산이 필요합니다.
- 진자 개수를 늘리면 궤적이 겹쳐서 잘 안 보일 수 있습니다.

### 5. 활용 분야

- **물리 교육**: 진자 운동과 카오스 이론 설명.
- **로봇 공학**: 여러 관절이 달린 팔의 움직임 연구.
- **제너레이티브 아트**: 얽히는 궤적으로 그린 작품.

### 직접 실험해 보기

- **카오스 계수**를 0과 0.01로 바꿔 보세요. 시작 각도가 같을 때와 조금 다를 때 궤적이 어떻게 달라지는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **진자 개수**를 1과 8로 바꿔 보세요. 한 개일 때와 여러 개일 때 궤적이 얼마나 달라 보이는지 확인해 보세요. 이 값도 바꾸면 다시 시작합니다.
- **중력**을 1과 6으로 바꿔 보세요. 중력이 셀수록 진자가 얼마나 빨리 흔들리는지 관찰해 보세요.

<!-- en -->

**Double Pendulum** is a pendulum with a second pendulum hanging from its end. Its motion is very hard to predict, even though the only force is gravity. Its most famous property is chaos: if two copies start with almost the same angle, they soon move in completely different ways.

**How it works.** Each frame, the sketch computes how fast each angular speed changes, then moves the speeds and angles one small step forward. Several pendulums start with slightly different angles, so their trails separate over time. The time step is set large to keep the motion lively, so the motion is not a perfect physical simulation.

**Try it.** Change the chaos value and the number of pendulums to see how the trails separate.
