import sketch from "./sketch";

export default {
  longDescription: {
    en: "Space Colonization is an algorithmic approach used to simulate the growth patterns of venation networks, such as tree branches, leaf veins, and blood vessels. It operates by distributing a field of attraction points—representing resources or leaves—and iteratively growing branch segments toward their nearest attractors. Once an attraction point is reached, it is consumed and removed, resulting in a naturally adapting, optimized, and organic dendritic network structure.",
    ko: "Space Colonization(공간 개척)은 나뭇가지의 분기 구조, 나뭇잎의 인맥, 혈관 계통과 같은 망상 조직의 생장 패턴을 모사하는 알고리즘입니다. 공간 상에 자원이나 잎을 상징하는 여러 개의 인력점(Attraction Point)을 뿌려두고, 각 나뭇가지의 마디가 자신과 가장 가까운 인력점들을 향해 유기적으로 뻗어나가도록 연산합니다. 나뭇가지가 인력점에 도달하면 해당 자원은 소멸되며, 이 과정을 통해 한정된 공간 안에서 스스로 최적화되며 뻗어 나가는 수지상 네트워크 구조가 완성됩니다.",
  },
  sketch,
  related: ["L-System", "Differential Growth", "Reaction-Diffusion"],
};
