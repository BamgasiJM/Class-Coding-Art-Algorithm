// 각 알고리즘 폴더의 index.js를 모아 slug → 상세 정보 맵을 구성한다.
// 새 알고리즘을 완성하려면: src/algorithms/<slug>/ 폴더를 만들고
// (index.js + sketch.js), 아래에 한 줄로 등록하면 된다.
import flowField from './flow-field'

export const ALGORITHM_DETAILS = {
  'flow-field': flowField,
}

export function getAlgorithmDetail(slug) {
  return ALGORITHM_DETAILS[slug] || null
}
