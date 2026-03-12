import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* =========================
   SHADERS
========================= */

const vertexShader = `
uniform float uTime;
uniform float uSize;
uniform vec2 uMouse;

varying float vOpacity;
varying vec3 vColor;

void main(){

vec3 pos = position;

/* FLOWING WAVE STRUCTURE */

float wave =
  sin(pos.x * 0.25 + uTime * 1.4) +
  cos(pos.z * 0.25 + uTime * 1.2);

pos.y += wave * 3.0;

/* MOUSE RIPPLE */

vec2 m = uMouse * 20.0;

float dist = distance(pos.xz, m);

float ripple = exp(-dist * 0.2) * 4.0;

pos.y += ripple;

/* CAMERA SPACE */

vec4 mvPosition = modelViewMatrix * vec4(pos,1.0);

gl_PointSize = uSize * (150.0 / -mvPosition.z);

gl_Position = projectionMatrix * mvPosition;

/* DEPTH FADE */

float d = length(mvPosition.xyz);

vOpacity = clamp(1.0 - d/120.0,0.0,1.0);

/* BRONZE COLOR */

vec3 bronze = vec3(0.85,0.4,0.02);
vec3 gold = vec3(0.9,0.65,0.1);

vColor = mix(bronze,gold, wave*0.5 + 0.5);

}
`;

const fragmentShader = `

varying float vOpacity;
varying vec3 vColor;

void main(){

float r = distance(gl_PointCoord,vec2(0.5));

if(r>0.5) discard;

float core = smoothstep(0.18,0.0,r);
float glow = exp(-r*10.0);

gl_FragColor = vec4(vColor,(core + glow*0.4)*vOpacity);

}
`;

/* =========================
   PARTICLE GRID
========================= */

function ParticleGrid() {

  const group = useRef<THREE.Group>(null!);
  const { mouse, viewport } = useThree();

  const isMobile = viewport.width < 12;

  const count = isMobile ? 250 : 2000;

  const side = Math.floor(Math.sqrt(count));
  const total = side * side;

  const positions = useMemo(() => {

    const arr = new Float32Array(total * 3);

    const spacing = 2.5;

    let i = 0;

    for (let x = 0; x < side; x++) {
      for (let z = 0; z < side; z++) {

        arr[i++] = (x - side / 2) * spacing;
        arr[i++] = 0;
        arr[i++] = (z - side / 2) * spacing;

      }
    }

    return arr;

  }, [side, total]);

  const uniforms = useMemo(() => ({

    uTime: { value: 0 },
    uSize: { value: isMobile ? 5 : 7 },
    uMouse: { value: new THREE.Vector2() }

  }), [isMobile]);

  useFrame((state) => {

    uniforms.uTime.value = state.clock.elapsedTime;

    uniforms.uMouse.value.set(
      mouse.x * (viewport.width / 2),
      mouse.y * (viewport.height / 2)
    );

  });

  /* TILT GRID */

  return (

    <group ref={group} rotation={[-0.45, 0, 0]}>

      <points>

        <bufferGeometry>

          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />

        </bufferGeometry>

        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />

      </points>

    </group>

  );

}

/* =========================
   HERO BACKGROUND
========================= */

export const ParticleWaveBackground = () => {

  return (

    <div className="absolute inset-0 w-full h-full bg-[#020617] overflow-hidden">

      <Canvas
        camera={{ position: [0, 25, 60], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >

        <ParticleGrid />

        <fog attach="fog" args={["#020617", 40, 140]} />

      </Canvas>

    </div>

  );

};

export default ParticleWaveBackground;