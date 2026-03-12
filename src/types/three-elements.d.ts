import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
        group: ThreeElements['group'];
        points: ThreeElements['points'];
        lineSegments: ThreeElements['lineSegments'];
        bufferGeometry: ThreeElements['bufferGeometry'];
        bufferAttribute: ThreeElements['bufferAttribute'];
        shaderMaterial: ThreeElements['shaderMaterial'];
        fog: ThreeElements['fog'];
      }
    }
  }
}
