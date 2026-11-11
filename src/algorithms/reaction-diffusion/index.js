import sketch from "./sketch";
import descriptionMd from "./description.md?raw";
import { parseDescription } from "../parseDescription";

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: "feed",
      label: "공급율(Feed)",
      min: 0.01,
      max: 0.1,
      step: 0.001,
      default: 0.055,
    },
    {
      key: "k",
      label: "소비율(Kill)",
      min: 0.02,
      max: 0.08,
      step: 0.001,
      default: 0.062,
    },
    {
      key: "speed",
      label: "시뮬레이션 속도",
      min: 1,
      max: 10,
      step: 1,
      default: 3,
    },
  ],
  related: ["Cellular Automata", "Space Colonization", "Differential Growth"],
};
