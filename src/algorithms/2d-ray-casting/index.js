import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: "numRays",
      label: "레이 개수",
      min: 20,
      max: 200,
      step: 10,
      default: 100,
    },
    {
      key: "centerSquareSize",
      label: "중앙 사각형 크기",
      min: 0.04,
      max: 0.2,
      step: 0.01,
      default: 0.08,
      unit: "배수",
      restart: true,
    },
    {
      key: "triangleSize",
      label: "삼각형 크기",
      min: 0.03,
      max: 0.15,
      step: 0.01,
      default: 0.07,
      unit: "배수",
      restart: true,
    },
    {
      key: "timeSpeed",
      label: "애니메이션 속도",
      min: 0,
      max: 0.02,
      step: 0.001,
      default: 0.008,
    },
    {
      key: "shadowBlur",
      label: "그림자 부드러움",
      min: 0.01,
      max: 0.15,
      step: 0.01,
      default: 0.06,
      unit: "배수",
    },
    {
      key: "shadowIntensity",
      label: "그림자 강도",
      min: 0,
      max: 1,
      step: 0.05,
      default: 0.9,
    },
    {
      key: "lightIntensity",
      label: "광원 강도",
      min: 20,
      max: 200,
      step: 10,
      default: 90,
    },
  ],
  related: ["Voronoi Diagram", "Delaunay Triangulation", "SDF & Metaballs"],
};
