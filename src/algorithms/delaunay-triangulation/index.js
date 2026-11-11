import sketch from './sketch';
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'numPoints',
      label: '포인트 개수',
      min: 50,
      max: 300,
      step: 10,
      default: 120,
      restart: true
    },
    {
      key: 'jitterSpeed',
      label: '정점 애니메이션 속도',
      min: 0,
      max: 0.05,
      step: 0.001,
      default: 0.005,
      restart: false
    }
  ],
  related: ["Voronoi Diagram", "Circle Packing", "Cellular Automata"],
};
