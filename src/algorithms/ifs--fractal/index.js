import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { 
      key: 'maxPoints', 
      label: '최대 정밀도', 
      min: 10000, 
      max: 100000, 
      step: 5000, 
      default: 40000, 
      restart: true 
    },
    { 
      key: 'pointsPerFrame', 
      label: '그리기 속도', 
      min: 10, 
      max: 1000, 
      step: 10, 
      default: 300 
    },
    { 
      key: 'pointSize', 
      label: '점 크기', 
      min: 0.1, 
      max: 3, 
      step: 0.1, 
      default: 1 
    },
    { 
      key: 'mainShrink', 
      label: '잎 축소 비율', 
      min: 0.5, 
      max: 0.95, 
      step: 0.01, 
      default: 0.85 
    },
    { 
      key: 'branchAngle', 
      label: '가지 휨 정도', 
      min: -0.2, 
      max: 0.2, 
      step: 0.01, 
      default: 0.04 
    },
    { 
      key: 'stemHeight', 
      label: '줄기 높이', 
      min: 0.5, 
      max: 3.0, 
      step: 0.1, 
      default: 1.6 
    },
    { 
      key: 'chaosFactor', 
      label: '무질서도', 
      min: 0, 
      max: 0.5, 
      step: 0.01, 
      default: 0 
    },
  ],
  related: ["Phyllotaxis", "L-System", "Cellular Automata"],
};
