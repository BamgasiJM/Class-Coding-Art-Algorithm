// 각 알고리즘 폴더의 index.js를 모아 slug → 상세 정보 맵을 구성한다.
// 새 알고리즘을 완성하려면: src/algorithms/<slug>/ 폴더를 만들고
// (index.js + sketch.js), 아래에 한 줄로 등록하면 된다.
import flowField from './flow-field'
import trigonometricWave from './trigonometric-wave'
import easingInterpolation from './easing--interpolation'
import phyllotaxis from './phyllotaxis'
import perlinSimplexNoise from './perlin--simplex-noise'
import fractalBrownianMotion from './fractal-brownian-motion'
import curlNoise from './curl-noise'
import ifsFractal from './ifs--fractal'
import lSystem from './l-system'
import cellularAutomata from './cellular-automata'
import reactionDiffusion from './reaction-diffusion'
import differentialGrowth from './differential-growth'
import spaceColonization from './space-colonization'
import diffusionLimitedAggregation from './diffusion-limited-aggregation'
import voronoiDiagram from './voronoi-diagram'
import circlePacking from './circle-packing'
import delaunayTriangulation from './delaunay-triangulation'
import truchetTiles from './truchet-tiles'
import metaballs from './sdf--metaballs'
import particleSystem from './particle-system'
import springConstraint from './spring--constraint'
import boids from './boids--flocking'
import attractorSystem from './attractor-system'
import wangTiles from './wang-tiles'
import poissonDiskSampling from './poisson-disk-sampling'
import nBodyGravity from './n-body-gravity'
import doublePendulum from './double-pendulum'
import elasticCollision from './elastic-collision'
import harmonograph from './harmonograph'
import pernoseTiling from './penrose-tiling'
import tspArt from './tsp-art'
import mazeGeneration from './maze-generation'
import escapeTimeFractal from './escape-time-fractal'
import physarumSlimeMold from './physarum-slime-mold'
import quadtree from './quadtree'
import abelianSandpile from './abelian-sandpile'
import marchingSquares from './marching-squares'
import shapeMorphing from './shape-morphing'
import stippling from './stippling'
import raycastingTwoD from './2d-ray-casting'
import strangeAttractor from './strange-attractor'
import waveFunctionCollapse from './wave-function-collapse'
import flowMapVisualization from './flow-map-visualization'
import randomWalk from './random-walk'
import dithering from './dithering'
import agentSystem from './agent-system'
import chladniFigures from './chladni-figures'

export const ALGORITHM_DETAILS = {
  'flow-field': flowField,
  'trigonometric-wave': trigonometricWave,
  'easing--interpolation': easingInterpolation,
  'phyllotaxis': phyllotaxis,
  'perlin--simplex-noise': perlinSimplexNoise,
  'fractal-brownian-motion': fractalBrownianMotion,
  'curl-noise': curlNoise,
  'ifs--fractal': ifsFractal,
  'l-system': lSystem,
  'cellular-automata': cellularAutomata,
  'reaction-diffusion': reactionDiffusion,
  'differential-growth': differentialGrowth,
  'space-colonization': spaceColonization,
  'diffusion-limited-aggregation': diffusionLimitedAggregation,
  'voronoi-diagram': voronoiDiagram,
  'circle-packing': circlePacking,
  'delaunay-triangulation': delaunayTriangulation,
  'attractor-system': attractorSystem,
  'boids--flocking': boids,
  'particle-system': particleSystem,
  'sdf--metaballs': metaballs,
  'spring--constraint': springConstraint,
  'truchet-tiles': truchetTiles,
  'wang-tiles': wangTiles,
  'poisson-disk-sampling': poissonDiskSampling,
  'n-body-gravity': nBodyGravity,
  'double-pendulum': doublePendulum,
  'elastic-collision': elasticCollision,
  'harmonograph': harmonograph,
  'penrose-tiling': pernoseTiling,
  'tsp-art': tspArt,
  'maze-generation': mazeGeneration,
  'escape-time-fractal': escapeTimeFractal,
  'physarum-slime-mold': physarumSlimeMold,
  'quadtree': quadtree,
  'abelian-sandpile': abelianSandpile,
  'marching-squares': marchingSquares,
  'shape-morphing': shapeMorphing,
  'stippling': stippling,
  '2d-ray-casting': raycastingTwoD,
  'strange-attractor': strangeAttractor,
  'wave-function-collapse': waveFunctionCollapse,
  'flow-map-visualization': flowMapVisualization,
  'random-walk': randomWalk,
  'dithering': dithering,
  'agent-system': agentSystem,
  'chladni-figures': chladniFigures,
}

export function getAlgorithmDetail(slug) {
  return ALGORITHM_DETAILS[slug] || null
}
